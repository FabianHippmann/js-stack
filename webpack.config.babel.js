import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { WDS_PORT } from './src/shared/config';
import { isProd } from './src/shared/util';

const cssModules = isProd ? {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: {
      loader: 'css-loader',
      query: {
        modules: true,
        importLoaders: true,
        localIdentName: '[name]__[local]___[hash:base64:5]',
      },
    },
  }),
} : {
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      query: {
        modules: true,
        importLoaders: true,
        localIdentName: '[name]__[local]___[hash:base64:5]',
      },
    },
  ],
};

export default {
  entry: ['react-hot-loader/patch', './src/client'],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
          babelrc: false,
        },
        exclude: /node_modules/,
      },
      cssModules,
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: isProd ? [
    // Production plugins
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('css/styles.css'),
  ] : [
    // Development plugins
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
