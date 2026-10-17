import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const COUNT = 15;
const lerp = THREE.MathUtils.lerp;
const smooth = (start: number, end: number, value: number) => THREE.MathUtils.smoothstep(value, start, end);

/** One sculpted object opens into one photograph. All pose changes are reversible. */
export async function createHeroSculpture(canvas: HTMLCanvasElement, signal: AbortSignal) {
  // Load before allocating a context: cancelled responsive mounts never share a renderer.
  const texture = await new Promise<THREE.Texture>((resolve, reject) => {
    if (signal.aborted) { reject(new DOMException('Aborted', 'AbortError')); return; }
    const image = new Image();
    const cancel = () => { image.src = ''; reject(new DOMException('Aborted', 'AbortError')); };
    signal.addEventListener('abort', cancel, { once: true });
    image.onload = () => {
      signal.removeEventListener('abort', cancel);
      const loaded = new THREE.Texture(image);
      loaded.needsUpdate = true;
      resolve(loaded);
    };
    image.onerror = () => {
      signal.removeEventListener('abort', cancel);
      reject(new Error('Hero photograph could not load'));
    };
    image.src = '/pharmacy.png';
  });
  if (signal.aborted) { texture.dispose(); throw new DOMException('Aborted', 'AbortError'); }
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); }
  catch (error) { texture.dispose(); throw error; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0xf4efe6, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  camera.position.z = 12;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 1.1;
  room.dispose();
  pmrem.dispose();
  const key = new THREE.DirectionalLight(0xfff4e2, 2.2);
  key.position.set(-3, 6, 8);
  scene.add(key, new THREE.HemisphereLight(0xe8f2f6, 0x5e655f, 1.3));
  const assembly = new THREE.Group();
  scene.add(assembly);
  const blue = new THREE.MeshPhysicalMaterial({
    color: 0x541e24, metalness: 0.25, roughness: 0.36, clearcoat: 0.25, clearcoatRoughness: 0.3,
  });
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [blue];
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);

  // Slice UVs sample one shared photograph and meet exactly in the final plane.
  const ribs = Array.from({ length: COUNT }, (_, index) => {
    const initialHeight = Math.abs(index - 7) <= 2 ? 4.5 : 1.5;
    const geometry = new RoundedBoxGeometry(0.265, initialHeight, 0.64, 3, 0.1);
    geometries.push(geometry);
    const body = new THREE.Mesh(geometry, blue);
    const photoGeometry = new THREE.PlaneGeometry(1, 1);
    const uv = photoGeometry.getAttribute('uv');
    for (let vertex = 0; vertex < uv.count; vertex++) uv.setX(vertex, (index + uv.getX(vertex)) / COUNT);
    geometries.push(photoGeometry);
    const reveal = { value: 0 };
    const photoMaterial = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
    photoMaterial.onBeforeCompile = shader => {
      shader.uniforms.uReveal = reveal;
      shader.vertexShader = `varying vec2 vRibbonUv;\n${shader.vertexShader}`.replace('#include <uv_vertex>', '#include <uv_vertex>\nvRibbonUv = uv;');
      shader.fragmentShader = `uniform float uReveal;\nvarying vec2 vRibbonUv;\n${shader.fragmentShader}`.replace('#include <clipping_planes_fragment>', '#include <clipping_planes_fragment>\nif (vRibbonUv.y > uReveal) discard;');
    };
    materials.push(photoMaterial);
    const photo = new THREE.Mesh(photoGeometry, photoMaterial);
    const rib = new THREE.Group();
    rib.add(body, photo);
    assembly.add(rib);
    return { rib, body, photo, photoGeometry, reveal, initialHeight };
  });

  // A baked floor shadow anchors the object without a real-time shadow pass.
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = shadowCanvas.height = 128;
  const ctx = shadowCanvas.getContext('2d')!;
  const shadowGradient = ctx.createRadialGradient(64, 64, 6, 64, 64, 64);
  shadowGradient.addColorStop(0, 'rgba(35,63,77,0.22)');
  shadowGradient.addColorStop(1, 'rgba(35,63,77,0)');
  ctx.fillStyle = shadowGradient;
  ctx.fillRect(0, 0, 128, 128);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false, toneMapped: false });
  const shadowGeometry = new THREE.PlaneGeometry(1, 1);
  geometries.push(shadowGeometry);
  materials.push(shadowMaterial);
  const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
  scene.add(shadow);

  let aspect = 1;
  let worldWidth = 1;
  const worldHeight = 2 * Math.tan(THREE.MathUtils.degToRad(17)) * 12;
  function resize(width: number, height: number) {
    aspect = width / height;
    worldWidth = worldHeight * aspect;
    renderer.setSize(width, height, false);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    const finalWidth = worldWidth * 0.88;
    const finalHeight = Math.min(worldHeight * 0.68, finalWidth / 1.65);
    const image = texture.image as HTMLImageElement;
    const imageAspect = image.width / image.height;
    const cropHeight = Math.min(1, imageAspect / (finalWidth / finalHeight));
    ribs.forEach(({ photoGeometry }) => {
      const uv = photoGeometry.getAttribute('uv');
      for (let vertex = 0; vertex < uv.count; vertex++) uv.setY(vertex, vertex < 2 ? (1 + cropHeight) / 2 : (1 - cropHeight) / 2);
      uv.needsUpdate = true;
    });
  }
  function render(progress: number, pointerX: number, pointerY: number) {
    const move = smooth(0, 0.42, progress);
    const open = smooth(0.14, 0.82, progress);
    const settle = smooth(0.67, 0.94, progress);
    const fan = Math.sin(open * Math.PI);
    const finalWidth = worldWidth * 0.88;
    const finalHeight = Math.min(worldHeight * 0.68, finalWidth / 1.65);
    const initialScale = Math.min(1, aspect / 1.8);
    assembly.position.set(lerp(worldWidth * 0.265, 0, move), lerp(0.05, -0.25, move), 0);
    assembly.scale.setScalar(lerp(initialScale, 1, move));
    assembly.rotation.set(
      lerp(-0.12, 0, open) + pointerY * 0.055 * (1 - open),
      lerp(-0.48, 0, open) + fan * 0.32 + pointerX * 0.09 * (1 - open),
      lerp(-0.16, 0, open),
    );
    camera.position.x = fan * 0.2;
    camera.position.y = fan * 0.16;
    camera.lookAt(0, 0, 0);
    ribs.forEach(({ rib, body, photo, reveal, initialHeight }, index) => {
      const n = (index - 7) / 7;
      const localOpen = smooth(0.13 + index * 0.009, 0.77 + index * 0.009, progress);
      const localFan = Math.sin(localOpen * Math.PI);
      const width = lerp(0.265, finalWidth / COUNT + 0.003, open);
      const height = lerp(initialHeight, finalHeight, open);
      rib.position.set(
        lerp((index - 7) * 0.295, (index - 7) * finalWidth / COUNT, open),
        Math.sin(n * Math.PI) * localFan * 0.42,
        Math.cos(n * Math.PI * 0.7) * localFan * 0.95,
      );
      rib.rotation.set(localFan * n * 0.16, localFan * (0.65 + n * 0.95), localFan * n * 0.1);
      body.scale.set(width / 0.265, height / initialHeight, lerp(1, 0.05, settle));
      body.visible = settle < 0.999;
      photo.position.z = lerp(0.325, 0.02, settle);
      photo.scale.set(width, height, 1);
      reveal.value = smooth(0.27 + index * 0.01, 0.56 + index * 0.01, progress);
      photo.visible = reveal.value > 0;

    });
    shadow.position.set(assembly.position.x, -2.7, -0.5);
    shadow.scale.set(5.2 * initialScale, 0.65, 1);
    shadowMaterial.opacity = 1 - smooth(0.1, 0.5, progress);
    renderer.render(scene, camera);
  }
  let disposed = false;
  function dispose() {
    if (disposed) return;
    disposed = true;
    signal.removeEventListener('abort', dispose);
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
    texture.dispose(); shadowTexture.dispose(); environment.dispose(); renderer.dispose();
  }
  signal.addEventListener('abort', dispose, { once: true });
  try {
    // Compile while the static hero is still showing, before the scroll sequence mounts.
    renderer.compile(scene, camera);
    if (signal.aborted || renderer.getContext().isContextLost()) throw new Error('Hero context unavailable');
  }
  catch (error) { dispose(); throw error; }
  return { render, resize, dispose };
}
