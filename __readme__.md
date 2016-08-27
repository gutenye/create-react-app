config/env.js

```
__DEV__
```

config/eslint.js

```
globals: {pd: true, $: true, $$: true, __DEV__: true},
rules: {
  'operator-assignment': ['off', 'always']
  'no-redeclare': 'off'
  'no-return-assign': 'off'
  'no-throw-literal': 'off',
  'react/no-direct-mutation-state': 'off',
}
```

config/webpack.config.dev.js

```
devtool: 'cheap-module-source-map'
module: {
  // preLoaders: [{loader: 'eslint'}}   // disbale it for speed, use editor's lint feature
  loaders: [
   { test: /\.scss$/, loader: "style!css!sass" }
  ]
}
resolve: {
  root: [paths.appSrc]
}
```

config/babel.dev.js

```
plugins: [
  require.resolve("babel-plugin-transform-decorators-legacy"),
  require.resolve("babel-plugin-transform-export-extensions"),
]
```
