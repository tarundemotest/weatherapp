'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  output: {comments: false},
  uglifyOptions: { ecma: 8 },
  compress: {
    warnings: false,
    drop_console: true,
    unsafe: true
  }
})

module.exports = {
  context: path.join(__dirname, '/src/js'),
  entry: {
    'app': './app',
  },
  output: {
    path: path.join(__dirname, '/public/dist/js'),
    filename: '[name].js',
    publicPath: "/dist/js/"
  },
  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, '/lib'),
    ],
    alias: {}
  },
  plugins: [
    new webpack.ProvidePlugin({
      axios: 'axios',
      queryString: 'query-string',
      store: 'store2',
      moment: 'moment',
      Vue: 'vue/dist/vue.js',
      VueRouter: ['vue-router', 'default']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  },
  externals: {},
  watch: NODE_ENV === 'development',
  devtool: 'source-map'
};

//uglify js for production environment
if (NODE_ENV === 'production') {
  //todo: issue dont uglify vue components scripts
  // module.exports.plugins.push(uglifyPlugin);
}