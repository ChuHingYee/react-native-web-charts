import {execSync as exec} from 'child_process';
import chalk from 'chalk';
import {targetRoot} from '../build/paths';
const {log} = console;

const clean = function () {
  log(chalk`{bgCyan Cleaning Files}\n`);
  exec(`rimraf ${targetRoot}`, {stdio: 'inherit'});
};

const build = function () {
  log(chalk`{bgCyan Building Files}\n`);
  exec('rollup -c -w', {stdio: 'inherit'});
};

(() => {
  try {
    clean();
    build();
  } catch (e) {
    log(e);
    process.exit(1);
  }
})();
