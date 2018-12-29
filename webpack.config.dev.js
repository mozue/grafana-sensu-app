/*jshint esversion: 6 */

const baseWebpackConfig = require('./webpack.config');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var conf = baseWebpackConfig;
conf.mode = 'development';
//conf.devtool = 'inline-source-map';
conf.devtool = "inline-source-map";

//conf.watch = false;

conf.plugins.push(new ngAnnotatePlugin());
/*
conf.plugins.push(
  new UglifyJSPlugin({
  sourceMap: true,
  })
);
*/
module.exports = conf;
