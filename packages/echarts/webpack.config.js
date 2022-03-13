const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const TransformPlugin = require('../../shared/html2JsPlugin')
const distPath = path.resolve(__dirname, 'dist')
const htmlPath = path.join(distPath, 'chart.html')
const htmlJsPath = path.join(distPath, 'index.js')

const extensions = ['.js', '.jsx', '.ts', '.tsx']
module.exports = {
  devServer: {
    static: distPath,
    open: ['chart.html'],
  },
  entry: './src/index.ts',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: distPath,
    clean: true,
    publicPath: path.resolve(__dirname, '/'),
  },
  resolve: { extensions },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      { test: /\.pug$/, loader: 'pug-loader' },
    ],
  },
  plugins: [
    new TransformPlugin({
      sourcePath: htmlPath,
      targetPath: htmlJsPath,
    }),
    new ESLintPlugin({ files: 'src/', extensions, emitWarning: true }),
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new HtmlWebpackPlugin({
      title: 'charts',
      cache: false,
      inject: false,
      template: './src/html.pug',
      filename: 'chart.html',
    }),
  ],
}
