import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self'",
  // Motion libraries update inline styles; scripts remain restricted to this origin.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join('; ');

const commonSecurityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
const securityHeaders = {
  ...commonSecurityHeaders,
  'Content-Security-Policy': contentSecurityPolicy,
};

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_APPWRITE_');
  const projectUrl = env.VITE_APPWRITE_ENDPOINT;
  if (Object.keys(env).some(key => /KEY|SECRET|TOKEN|PASSWORD/.test(key))) throw new Error('Appwrite API keys and secrets must never be included in a VITE_ variable. The website only needs public project settings.');
  let policy = contentSecurityPolicy;
  if (projectUrl) {
    const url = new URL(projectUrl);
    if (url.protocol !== 'https:' || url.username || url.password || !/^\/v1\/?$/.test(url.pathname) || url.search || url.hash) throw new Error('VITE_APPWRITE_ENDPOINT must be an HTTPS API endpoint ending in /v1.');
    policy = policy.replace("connect-src 'self'", `connect-src 'self' ${url.origin}`);
  }
  const configuredSecurityHeaders = { ...securityHeaders, 'Content-Security-Policy': policy };
  return ({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'production-security',
      // Meta CSP travels with the build; frame protection requires HTTP headers.
      transformIndexHtml() {
        if (command !== 'build') return;
        return [{
          tag: 'meta',
          attrs: {
            'http-equiv': 'Content-Security-Policy',
            content: policy.replace("; frame-ancestors 'none'", ''),
          },
          injectTo: 'head-prepend',
        }];
      },
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: '_headers',
          source: '/*\n' + Object.entries(configuredSecurityHeaders)
            .map(([name, value]) => `  ${name}: ${value}`).join('\n') + '\n',
        });
      },
    },
  ],
  server: {
    host: '127.0.0.1',
    port: 5173,
    // Vite's development HMR preamble requires inline scripts.
    headers: commonSecurityHeaders,
    fs: { strict: true, deny: ['.env', '.env.*', '*.{crt,pem,key}', '**/.git/**'] },
    watch: {
      ignored: ['**/.DS_Store', '**/Anti-Slop*/**', '**/node_modules/**', '**/dist/**'],
    },
  },
  preview: {
    host: '127.0.0.1',
    headers: configuredSecurityHeaders,
  },
  });
});
