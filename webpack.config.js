const path = require('path');
var webpack = require('webpack');
var config = require('./config')();

const PATHS = {
  app: path.join(__dirname, '/app/app'),
  build: path.join(__dirname, 'public/build/')
};

var isProd = (process.env.NODE_ENV === 'production');
var isStaging = (process.env.NODE_ENV === 'staging');

var myFilename = 'build.js';

function getPlugins(){
  var plugins = [];

  // Require React in every module where referenced
  plugins.push(new webpack.ProvidePlugin({
    'React': 'react',
  }));

  // Set Environment Variable
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }));

  plugins.push(new webpack.DefinePlugin({
    __API_URL__: config.apiUrl
  }));

  // Check Environment Variable to set Production Build
  if (isProd) {
   myFilename = 'build.js';
   plugins.push(new webpack.optimize.UglifyJsPlugin({
     compress: { warnings: false },
   }));
   console.log('building for production')
 }

 return plugins
}


module.exports = {
  entry: {
    app: PATHS.app
  },
  plugins : getPlugins(),
  output: {
    path: PATHS.build,
    filename: myFilename,
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?modules',
      },
      {
        test: /\.less$/,
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?modules!less-loader',
      },
      {
        test: /\.(jpg|png|svg|mp4|gif)$/,
        include: path.join(__dirname, 'app'),
        loader: 'url-loader',
        query: {
          name: '[path][name].[ext]',
          limit: 15000
        }
      },
      {
          test: /\.(ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          include: path.join(__dirname, 'app'),
          exclude: /node_modules/,
          loader: 'file-loader',
          query: {
            name:'[path][name].[ext]',
            publicPath: '/'
          }
      },
    ],
  },
  resolve: {
    extensions: ['','.webpack.js', '.web.js', '.js', '.css', '.less']
  }

};
