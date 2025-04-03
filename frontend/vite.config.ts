import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default ({ mode }: any) => {
  console.log({ mode });
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const env = loadEnv(mode, process.cwd());

  console.log({ env });
  return defineConfig({
    plugins: [react()],
    server: {
      port: 5174,
    },
    define: {
      'import.meta.env.VITE_BACKEND_URL': JSON.stringify(env.VITE_BACKEND_URL),
    },
  });
};
