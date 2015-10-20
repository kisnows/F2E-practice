/**
 * Created by yq123 on 2015/10/9.
 */
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[name].js'
  },
  resolve: {
    modulesDirectories: ['', 'node_modules']
  },
  module: {
    loaders: [
      {test: /\.js$|\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: "style-loader!css-loader"}
    ]
  }
}