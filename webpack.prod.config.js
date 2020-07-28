const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ProgressBar = require('progress-bar-webpack-plugin');
const pkg = require('./package.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'react_infinite_auto_scroller-v' + pkg.version +'.js'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx' ]
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: require.resolve('file-loader'),
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressBar({
      width: 100,
      format: `webpack build [:bar] :percent (:elapsed seconds)`,
      clear: false,
    }),
    new UglifyJsPlugin()
  ],
};