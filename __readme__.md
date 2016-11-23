Changes: https://github.com/facebookincubator/create-react-app/compare/master...gutenye:master


1. Only change packages/react-scripts and eslint-config-react-app two packages.
2. Change babel-preset config in packages/react-scripts/config/webpack.config.dev.js

Update

```
$ check release tag https://github.com/facebookincubator/create-react-app/releases
$ git fetch --tags origin
$ git merge v0.7.0
> For react-dev-utils maybe not released, manually fix has ton of bugs.
```

Publish

```
$ cd packages/react-scripts
$ npm publish

cd packages/eslint-config-react-app
$ npm publish
$ npm install -g @gutenye/eslint-config-react-app
```
