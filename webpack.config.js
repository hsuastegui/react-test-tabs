var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: APP_DIR + '/main',
  target:'web',
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    modulesDirectories: ['node_modules']
  },
  module : {
    loaders : [
      {test: /\.jsx$|\.js$/, include: APP_DIR, loaders: ['babel-loader']},
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
};