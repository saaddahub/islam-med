import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const COUNT = 15;
const lerp = THREE.MathUtils.lerp;
const smooth = (start: number, end: number, value: number) => THREE.MathUtils.smoothstep(value, start, end);

/** One sculpted object opens into one photograph. All pose changes are reversible. */
export async function createFacilitySculpture(canvas: HTMLCanvasElement, signal: AbortSignal, imageSrc: string) {
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
    image.crossOrigin = 'anonymous';
    image.src = imageSrc;
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
    color: 0x233f4d, metalness: 0.25, roughness: 0.36, clearcoat: 0.25, clearcoatRoughness: 0.3,
  });
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [blue];
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);

  // Slice UVs sample one shared photograph and meet exactly in the final plane.
  const ribs = Array.from({ length: COUNT }, (_, index) => {
    const initialHeight = 3;
    const geometry = new RoundedBoxGeometry(0.265, initialHeight, 0.64, 3, 0.1);
    geometries.push(geometry);
    const body = new THREE.Mesh(geometry, blue);
    const photoGeometry = new THREE.PlaneGeometry(1, 1);
    const uv = photoGeometry.getAttribute('uv');
    for (let vertex = 0; vertex < uv.count; vertex++) uv.setX(vertex, (index + uv.getX(vertex)) / COUNT);
    geometries.push(photoGeometry);
    const photoMaterial = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
    materials.push(photoMaterial);
    const photo = new THREE.Mesh(photoGeometry, photoMaterial);
    const rib = new THREE.Group();
    rib.add(body, photo);
    assembly.add(rib);
    return { rib, body, photo, photoGeometry, initialHeight };
  });

  let aspect = 1;
  let worldWidth = 1;
  const worldHeight = 2 * Math.tan(THREE.MathUtils.degToRad(17)) * 12;
  function resize(width: number, height: number) {
    aspect = width / height;
    worldWidth = worldHeight * aspect;
    renderer.setSize(width, height, false);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    const finalWidth = worldWidth;
    const finalHeight = worldHeight;
    const image = texture.image as HTMLImageElement;
    const imageAspect = image.width / image.height;
    const cropHeight = Math.min(1, imageAspect / (finalWidth / finalHeight));
    const cropWidth = Math.min(1, (finalWidth / finalHeight) / imageAspect);
    ribs.forEach(({ photoGeometry }, index) => {
      const uv = photoGeometry.getAttribute('uv');
      for (let vertex = 0; vertex < uv.count; vertex++) {
        uv.setY(vertex, vertex < 2 ? (1 + cropHeight) / 2 : (1 - cropHeight) / 2);
        uv.setX(vertex, (((index + vertex % 2) / COUNT) - 0.5) * cropWidth + 0.5);
      }
      uv.needsUpdate = true;
    });
  }
  function render(progress: number, pointerX: number, pointerY: number) {
    const move = smooth(0.15, 0.9, progress);
    const open = smooth(0.12, 0.92, progress);
    const settle = smooth(0.67, 0.94, progress);
    const fan = Math.sin(open * Math.PI);
    const finalWidth = worldWidth;
    const finalHeight = worldHeight;
    const initialScale = 1;
    assembly.position.set(0, lerp(-1.65, 0, move), 0);
    assembly.scale.setScalar(lerp(initialScale, 1, move));
    assembly.rotation.set(
      lerp(-0.12, 0, open) + pointerY * 0.055 * (1 - open),
      lerp(-0.18, 0, open) + fan * 0.32 + pointerX * 0.09 * (1 - open),
      lerp(-0.035, 0, open),
    );
    camera.position.x = fan * 0.2;
    camera.position.y = fan * 0.16;
    camera.lookAt(0, 0, 0);
    ribs.forEach(({ rib, body, photo, initialHeight }, index) => {
      const n = (index - 7) / 7;
      const localOpen = smooth(0.13 + index * 0.009, 0.77 + index * 0.009, progress);
      const localFan = Math.sin(localOpen * Math.PI);
      const width = lerp(worldWidth * 0.54 / COUNT, finalWidth / COUNT + 0.003, open);
      const height = lerp(initialHeight, finalHeight, open);
      rib.position.set(
        lerp((index - 7) * worldWidth * 0.58 / COUNT, (index - 7) * finalWidth / COUNT, open),
        Math.sin(n * Math.PI) * localFan * 0.42,
        Math.cos(n * Math.PI * 0.7) * localFan * 0.95,
      );
      rib.rotation.set(localFan * n * 0.16, localFan * (0.65 + n * 0.95), localFan * n * 0.1);
      body.scale.set(width / 0.265, height / initialHeight, lerp(1, 0.05, settle));
      body.visible = settle < 0.999;
      photo.position.z = lerp(0.325, 0.02, settle);
      photo.scale.set(width, height, 1);

    });
    renderer.render(scene, camera);
  }
  let disposed = false;
  function dispose() {
    if (disposed) return;
    disposed = true;
    signal.removeEventListener('abort', dispose);
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
    texture.dispose(); environment.dispose(); renderer.dispose();
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
