import chalk from 'chalk'
const agent = process.env.npm_config_user_agent
const { log } = console
if (!(agent as string).startsWith('pnpm')) {
  log(
    chalk`{red \nPlease use pnpm to manage dependencies in this repository.\n  $ npm i pnpm -g\n}`,
  )
  process.exit(1)
}
