import { type Config } from 'tailwindcss';
import {
  isolateInsideOfContainer,
  scopedPreflightStyles,
} from 'tailwindcss-scoped-preflight';
import config from './tailwind.config';

export default {
  ...config,
  plugins: [
    ...config.plugins,
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer('.ul-scope'),
      modifyPreflightStyles: {
        body: {
          'line-height': null,
        },
      },
    }),
  ],
} satisfies Config;
