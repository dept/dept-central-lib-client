// webpack.config.js
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (_env, argv) => {
  const isProduction = argv.mode === 'production'

  return {
    entry: './src/index.ts',
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'index.min.js' : 'index.js',
      library: 'DeptUI',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: 'typeof self !== "undefined" ? self : this',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.module\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isProduction ? '[hash:base64]' : '[name]__[local]__[hash:base64:5]',
                  exportLocalsConvention: 'camelCase',
                },
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    mode: isProduction ? 'production' : 'development',
    optimization: {
      usedExports: isProduction,
      minimize: isProduction,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }),
      ],
    },
    devtool: isProduction ? undefined : 'inline-source-map',
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
    ],
  }
}
