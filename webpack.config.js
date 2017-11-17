const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['babel-loader', 'ts-loader'],
        include: __dirname,
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: HtmlWebpackTemplate,
      appMountId: 'root',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      Layouts: path.resolve(__dirname, 'src/layouts/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Features: path.resolve(__dirname, 'src/features/'),
    },
    extensions: ['.js', '.ts.', '.tsx'],
  },
};
