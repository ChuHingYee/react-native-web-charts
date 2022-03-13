const fs = require('fs')
class TransformPlugin {
  constructor(options) {
    this.sourcePath = options.sourcePath
    this.targetPath = options.targetPath
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('TransformPlugin', () => {
      const isExistEcharts = fs.existsSync(this.sourcePath)
      if (!isExistEcharts) return
      const bundle = fs.readFileSync(this.sourcePath, 'utf8')
      const escaped = JSON.stringify(bundle)
      const js = `
        const html = ${escaped}
        export {
          html
        }
      `
      fs.writeFileSync(this.targetPath, js)
    })
  }
}

module.exports = TransformPlugin
