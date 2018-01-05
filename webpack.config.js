const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Heap analytics
let headSnippet = '<script type="text/javascript">window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","removeEventProperty","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])}; heap.load("3578566086");</script>';
// Google maps API
headSnippet += '<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDk64oknr1zOjz-loIogxns15U1ZWV5luc&libraries=places"></script>';
// Crisp chat
headSnippet += '<script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="caa611e4-6986-46a7-ac45-4d9230705a0f";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>';
// Google analytics
headSnippet += '<!-- Global site tag (gtag.js) - Google Analytics --><script async src="https://www.googletagmanager.com/gtag/js?id=UA-112000570-1"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "UA-112000570-1");</script>';

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    noParse: /(mapbox-gl)\.js$/,
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
    new HtmlWebpackPlugin({
      inject: false,
      template: HtmlWebpackTemplate,
      appMountId: 'root',
      title: 'Brewed Here',
      favicon: './src/images/favicon.ico',
      headHtmlSnippet: headSnippet,
      mobile: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN),
      'process.env.AUTH0_REDIRECT_URI': JSON.stringify(process.env.AUTH0_REDIRECT_URI),
      'process.env.AUTH0_CLIENT_ID': JSON.stringify(process.env.AUTH0_CLIENT_ID),
      'process.env.AUTH0_AUDIENCE': JSON.stringify(process.env.AUTH0_AUDIENCE),
    }),
    new CopyWebpackPlugin([
      { from: 'src/silent.html', to: 'silent.html' },
      { from: 'src/images/beer_map_marker.svg', to: 'auth0_logo.svg' },
    ])
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    host: 'localhost',
    historyApiFallback: true,
    historyApiFallback: {
      rewrites: [
        { from: /silent/, to: '/silent.html' },
      ]
    }
  } ,
  resolve: {
    alias: {
      Layouts: path.resolve(__dirname, 'src/layouts/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Features: path.resolve(__dirname, 'src/features/'),
      State: path.resolve(__dirname, 'src/state/'),
      Images: path.resolve(__dirname, 'src/images/'),
    },
    extensions: ['.js', '.ts.', '.tsx', '.svg', '.css'],
  },
};

if (process.env.NODE_ENV !== 'local') {
  config.devtool = 'source-map';
  config.plugins.push(new UglifyJsPlugin({
    sourceMap: true,
  }));
} else {
  // config.devtool = 'source-map';
  config.devtool = 'cheap-eval-source-map';
}

module.exports = config;
