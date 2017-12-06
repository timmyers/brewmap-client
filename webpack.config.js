const path = require('path');
const webpack = require('webpack');
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
      {
        test: /\.(svg)$/,
        use: 'file-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: HtmlWebpackTemplate,
      appMountId: 'root',
      title: 'CO BrewMap',
      favicon: './src/images/favicon.ico'
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.AUTH0_DOMAIN': JSON.stringify('brewmap-dev.auth0.com'),
      'process.env.AUTH0_REDIRECT_URI': JSON.stringify('http://localhost:9000/login'),
      'process.env.AUTH0_CLIENT_ID': JSON.stringify('ChJgeELQMf3c2eoJ2Gx1ZE7Igjf8nocA'),
      'process.env.AUTH0_AUDIENCE': JSON.stringify('https://brewmap-dev.auth0.com/userinfo'),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    host: '0.0.0.0',
    open: true,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      Layouts: path.resolve(__dirname, 'src/layouts/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Features: path.resolve(__dirname, 'src/features/'),
      Images: path.resolve(__dirname, 'src/images/'),
    },
    extensions: ['.js', '.ts.', '.tsx', '.svg', '.css'],
  },
};
