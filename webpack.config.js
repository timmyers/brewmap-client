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
// headSnippet += '<script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="caa611e4-6986-46a7-ac45-4d9230705a0f";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>';
// Google analytics
headSnippet += '<!-- Global site tag (gtag.js) - Google Analytics --><script async src="https://www.googletagmanager.com/gtag/js?id=UA-112000570-1"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "UA-112000570-1");</script>';
// Drift chat
headSnippet += `<!-- Start of Async Drift Code -->
<script>
!function() {
  var t;
  if (t = window.driftt = window.drift = window.driftt || [], !t.init) return t.invoked ? void (window.console && console.error && console.error("Drift snippet included twice.")) : (t.invoked = !0,
  t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ],
  t.factory = function(e) {
    return function() {
      var n;
      return n = Array.prototype.slice.call(arguments), n.unshift(e), t.push(n), t;
    };
  }, t.methods.forEach(function(e) {
    t[e] = t.factory(e);
  }), t.load = function(t) {
    var e, n, o, i;
    e = 3e5, i = Math.ceil(new Date() / e) * e, o = document.createElement("script"),
    o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + i + "/" + t + ".js",
    n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
  });
}();
drift.SNIPPET_VERSION = "0.3.1";
drift.load("74628t7nfckm");
</script>
<!-- End of Async Drift Code -->`;

headSnippet += `<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '529920027385445');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=529920027385445&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->
`;

headSnippet += '<meta name="application-name" content="Brewed Here">';
headSnippet += '<meta name="description" content="Find, discover, and track your visits to Colorado breweries.">';

headSnippet += '<link rel="apple-touch-icon" sizes="57x57" href="apple-icon-57x57.png" />';
headSnippet += '<link rel="apple-touch-icon" sizes="72x72" href="apple-icon-72x72.png" />';
headSnippet += '<link rel="apple-touch-icon" sizes="76x76" href="apple-icon-76x76.png" />';
headSnippet += '<link rel="apple-touch-icon" sizes="114x114" href="apple-icon-114x114.png" />';
headSnippet += '<link rel="apple-touch-icon" sizes="120x120" href="apple-icon-120x120.png" />';
headSnippet += '<link rel="apple-touch-icon" sizes="144x144" href="apple-icon-144x144.png" />';
headSnippet += '<link rel="apple-touch-icon" sizes="152x152" href="apple-icon-152x152.png" />';
headSnippet += '<link rel="apple-touch-icon" sizes="180x180" href="apple-icon-180x180.png" />';

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
      title: 'Brewed Here - Visit Colorado Breweries',
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
      { from: 'src/apple-icons/apple-touch-icon-57x57.png', to: 'apple-icon-57x57.png' },
      { from: 'src/apple-icons/apple-touch-icon-72x72.png', to: 'apple-icon-72x72.png' },
      { from: 'src/apple-icons/apple-touch-icon-76x76.png', to: 'apple-icon-76x76.png' },
      { from: 'src/apple-icons/apple-touch-icon-114x114.png', to: 'apple-icon-114x114.png' },
      { from: 'src/apple-icons/apple-touch-icon-120x120.png', to: 'apple-icon-120x120.png' },
      { from: 'src/apple-icons/apple-touch-icon-144x144.png', to: 'apple-icon-144x144.png' },
      { from: 'src/apple-icons/apple-touch-icon-152x152.png', to: 'apple-icon-152x152.png' },
      { from: 'src/apple-icons/apple-touch-icon-180x180.png', to: 'apple-icon-180x180.png' },
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
