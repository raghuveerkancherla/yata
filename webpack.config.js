var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');


var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var GITHUB_PAGES_DIR = path.resolve(__dirname, 'docs')
var APP_DIR = path.resolve(__dirname, 'src/client/app');
var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

var config = {
  entry: [
    APP_DIR + '/index.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loaders : ['babel-loader']
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin,
    new CopyWebpackPlugin([
      { from: path.resolve(BUILD_DIR, 'bundle.js'),
        to: path.resolve(GITHUB_PAGES_DIR, 'public') },
      { from: path.resolve(APP_DIR, 'index.html', GITHUB_PAGES_DIR)}
    ])
  ]
};

module.exports = config;
