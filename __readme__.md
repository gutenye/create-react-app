Publish

```
cd packages/react-scripts
$ npm publish --access public

cd packages/eslint-config-react-app
$ npm publish --access public
$ npm install -g @gutenye/eslint-config-react-app
```

### packages/create-react-app

config/webpack.config.dev.js

```
devtool: 'cheap-module-eval-source-map',
resolve: {
  root: [paths.appSrc]
  extensions: ['.web.js', '.js', ...]       // antd-mobile support
}
module: {
  // preLoaders: [{loader: 'eslint'}}   // disbale it for speed, use editor's lint feature
  loaders: [
    { test: /\.css$/, loader: 'style!css?importLoaders=1!postcss?pack=default', exclude: /antd-mobile/},
    { test: /\.css$/, include: /antd-mobile/, loader: 'style!css?importLoaders=1!postcss?pack=antd'},
    { test: /^((?!\.m).)*scss$/, loader: "style!css!sass" },
    { test: /\.m\.scss$/, loader: "style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass" },

postcss: function() {
  return {
    default: [
      autoprefixer({...}),
    ],
    antd: [
      pxtorem({rootValue: 32, propWhiteList: []}),
    ]
  }
},

```

config/webpack.config.prod.js

```
resolve: {
  root: [paths.appSrc]
  extensions: ['.web.js', '.js', ...]       // antd-mobile support
}
module: {
  loaders: [
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1&-autoprefixer!postcss?pack=default'), exclude: /antd-mobile/ },
    { test: /\.css$/, include: /antd-mobile/, loader: ExtractTextPlugin.extract('style', 'css!postcss?pack=antd') },
    { test: /^((?!\.m).)*scss$/, loader: ExtractTextPlugin.extract("style", "css!sass") },
    { test: /\.m\.scss$/, loader: ExtractTextPlugin.extract("style", "css?modules", "sass") },
```
scripts/start.js

```
var appProxy = httpProxyMiddleware(pathname => mayProxy.test(pathname), {
    target: proxy,
    logLevel: 'silent',
    onError: onProxyError(proxy),
    secure: false,
    changeOrigin: true,
    ws: true,
  });
devServer.use(mayProxy, appProxy);
devServer.listeningApp.on('upgrade', appProxy.upgrade);

var proxy2 = require(paths.appPackageJson).proxy2 || {path: '/non-exists-123', target: 'http://localhost:65535'};
var devServer = new WebpackDevServer(compiler, {
  ...
  proxy: {
    [proxy2.path]: Object.assign({
      ws: true,
    }, proxy2)
  }
})
```

### Testing

```
cd test
yarn
npm start
```

### packages/eslint-config-react-app

index.js

```
globals: {pd: true, $: true, $$: true, __DEV__: true},
rules: {
  'operator-assignment': ['off', 'always'],
  'no-redeclare': 'off'
  'no-return-assign': 'off'
  'no-throw-literal': 'off',
  'react/no-direct-mutation-state': 'off',
}
```
