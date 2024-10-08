import { defineConfig } from 'tsup';

export default defineConfig(options => {
  return {
    clean: !options.watch,
    dts: true,
    entry: ['app/index.ts'],
    format: 'esm',
    minify: !options.watch,
    target: 'node20',
  };
});
