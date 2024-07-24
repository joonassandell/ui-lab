import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['app/index.ts'],
  format: 'esm',
  minify: true,
});
