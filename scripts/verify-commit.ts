// Invoked on the commit-msg git hook by yorkie.
import fs from 'fs'
import chalk from 'chalk'
const msgPath = process.argv.slice(2)[0]
const msg = fs.readFileSync(msgPath as string, 'utf-8').trim()
const commitRE
  = /^(((\uD83C[\uDF00-\uDFFF])|(\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF])|[\u2600-\u2B55]) )?(revert: )?(feat|fix|docs|refactor|⚡perf|workflow|build|CI|typos|chore|tests|types|wip|release|dep)(\(.+\))?: .{1,50}/
if (!(commitRE.test(msg) || msg.indexOf('Merge') === 0)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      '\u63D0\u4EA4\u65E5\u5FD7\u4E0D\u7B26\u5408\u89C4\u8303',
    )}\n\n${chalk.red(
      '  \u5408\u6CD5\u7684\u63D0\u4EA4\u65E5\u5FD7\u683C\u5F0F\u5982\u4E0B(emoji \u548C \u6A21\u5757\u53EF\u9009\u586B)\uFF1A\n\n',
    )}    \n    ${chalk.green(
      '\uD83D\uDCA5 feat: \u6DFB\u52A0\u4E86\u4E2A\u5F88\u68D2\u7684\u529F\u80FD',
    )}\n    ${chalk.green(
      '\uD83D\uDC1B fix: \u4FEE\u590D\u4E86\u4E00\u4E9B bug',
    )}\n    ${chalk.green(
      '\uD83D\uDCDD docs: \u66F4\u65B0\u4E86\u4E00\u4E0B\u6587\u6863',
    )}\n    ${chalk.green(
      '\uD83C\uDFF0 chore: \u5BF9\u811A\u624B\u67B6\u505A\u4E86\u4E9B\u66F4\u6539',
    )}\n    `,
  )
  process.exit(1)
}
