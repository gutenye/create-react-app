1.0.14

CHANGES: https://github.com/facebookincubator/create-react-app/compare/v1.0.10...v1.0.10

MODIFICATIONS: https://github.com/facebookincubator/create-react-app/compare/v1.0.10...gutenye:master


```
1. check release tag https://github.com/facebookincubator/create-react-app/releases
2. git fetch origin --tags
3. squash into one commit: git reset --soft <guten-commit> 
4. git rebase v1.0.7
```

- Don't use yarn publish, changes package.json file
- Must use tag, for react-dev-utils maybe not released, manually fix has ton of bugs.
- Only change packages/react-scripts this package.
- Change babel config in packages/react-scripts/config/webpack.config.guten.js

Publish

```
$ cd packages/react-scripts
$ npm publish
```

Debug

```
# packages/react-scripts/scripts/start.js
//clearConsole();
```
