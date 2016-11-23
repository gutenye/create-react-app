Changes: https://github.com/facebookincubator/create-react-app/compare/master...gutenye:master

1. Only change packages/react-scripts and eslint-config-react-app two packages.
2. Change babel-preset config in packages/react-scripts/config/webpack.config.dev.js
3. If react-dev-utils is outdated, wait for it release.

Publish

```
$ cd packages/react-scripts
$ npm publish

cd packages/eslint-config-react-app
$ npm publish
$ npm install -g @gutenye/eslint-config-react-app
```
