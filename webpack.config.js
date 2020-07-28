const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./examples/index.tsx",
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
  devServer: {
    hot: true,
    port: 8001,
    open: true,
    host: "0.0.0.0",
  },
  plugins: [new HtmlWebpackPlugin({
    template: './examples/index.html'
  })],
};