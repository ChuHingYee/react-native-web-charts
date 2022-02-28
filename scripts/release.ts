import { execSync as exec } from 'child_process'
import chalk from 'chalk'
const { log } = console

const build = function() {
  log(chalk`{bgCyan Building Files}\n`)
  exec('pnpm build:all', { stdio: 'inherit' })
}

const publish = function() {
  log(chalk`{bgCyan Publishing}\n`)
  exec('pnpm changeset publish', { stdio: 'inherit' })
};

(() => {
  try {
    build()
    publish()
  }
  catch (e) {
    log(e)
    process.exit(1)
  }
})()
