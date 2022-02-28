import {resolve} from 'path';

export const projRoot = resolve(__dirname, '..');
export const targetRoot = resolve(projRoot, 'dist');
export const echartsRoot = resolve(
  projRoot,
  'node_modules/@react-native-web-charts/echarts/dist',
);
