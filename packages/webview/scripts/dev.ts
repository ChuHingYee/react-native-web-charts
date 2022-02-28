import {join} from 'path';
import {execSync as exec} from 'child_process';
import {copyFileSync, existsSync} from 'fs';
import chalk from 'chalk';
import {echartsRoot, targetRoot} from '../build/paths';
const {log} = console;

const clean = function () {
  log(chalk`{bgCyan Cleaning Files}\n`);
  exec(`rimraf ${targetRoot}`, {stdio: 'inherit'});
};

const copyHtml = function () {
  log(chalk`{bgCyan Copying Files}\n`);
  const chartHtmlPath = join(echartsRoot, 'chart.html');
  const targetName = join(targetRoot, 'chart.html');
  const isExistEchartsHtml = existsSync(chartHtmlPath);
  log(chartHtmlPath);
  if (!isExistEchartsHtml) {
    throw new RangeError('Could not find chart.html file');
  }
  exec('mkdir dist', {stdio: 'inherit'});
  copyFileSync(chartHtmlPath, targetName);
};

const build = function () {
  log(chalk`{bgCyan Building Files}\n`);
  exec('rollup -c -w', {stdio: 'inherit'});
};

(() => {
  try {
    clean();
    copyHtml();
    build();
  } catch (e) {
    log(e);
    process.exit(1);
  }
})();
