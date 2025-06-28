// rollup.config.js
import { defineConfig } from 'rollup';
import path from 'path';

export default defineConfig([
  // CommonJS builder (Node.js or older module systems)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/multi-select-pure-js.cjs.js',
      format: 'cjs'
    }
  },

  // ESM Build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/multi-select-pure-js.esm.js',
      format: 'esm'
    }
  },

  // UMD Build (for CDN <script> usage)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/multi-select-pure-js.umd.js',
      format: 'umd',
      name: 'MultiSelectPureJs'
    }
  }
]);
