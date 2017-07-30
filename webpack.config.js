const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Inexor HUD',
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/@inexorgame/tree")
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            },
          }, {
            loader: 'eslint-loader'
          }
        ],
      }, {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
              convertToAbsoluteUrls: true,
            },
          },
          'css-loader'
        ],
      },
    ],
  },
  devServer: {
    port: 31429
  }
};
