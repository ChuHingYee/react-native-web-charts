import 'rollup';
import path from 'path';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import {projRoot} from './paths';
const resolve = p => path.resolve(projRoot, p);

const pkg = require(path.resolve(projRoot, 'package.json'));
const {name, version} = pkg;
const isDev = process.env.NODE_ENV !== 'production';

const banner = `/*! ${name}-v${version} */\n`;

const configs = {
  input: resolve('./src/index.ts'),
  output: {
    format: 'esm',
    file: 'dist/index.js',
    sourcemap: true,
    banner,
  },
  plugins: [
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts'],
    }),
    commonjs(),
    typescript({
      cwd: resolve(projRoot),
      tsconfig: 'tsconfig.json',
    }),
    !isDev && terser({toplevel: true}),
  ],
  external: ['react', 'react-native', 'react-native-webview'],
};
export default configs;
