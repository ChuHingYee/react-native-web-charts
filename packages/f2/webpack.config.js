const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const extensions = ['.js', '.jsx', '.ts', '.tsx']
module.exports = {
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: ['chart.html'],
  },
  entry: './src/index.ts',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
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
