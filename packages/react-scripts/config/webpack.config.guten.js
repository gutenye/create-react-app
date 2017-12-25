const paths = require('./paths')
const Compression = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function findLoader(rules, name) {
  return rules.find(rule => {
    if (rule.loader && rule.loader.match(name)) {
      return true
    } else if (rule.use) {
      return rule.use.find(use => {
        if (use.loader && use.loader.match(name)) {
          return true
        }
      })
    }
  })
}

module.exports = function override(config, env) {
  const oneOfRules = config.module.rules[1].oneOf
  const eslintLoader = config.module.rules[0]
  const babelLoader = findLoader(oneOfRules, /babel-loader/ )

  // resolve.modules
  config.resolve.modules.unshift(paths.appSrc)

  // Disable eslint
  eslintLoader.test = /DISABLED/

  // SVG
  oneOfRules.unshift(
    { test: /\.svg$/, use: ['babel-loader', {loader: '@gutenye/react-svg-loader', options: {es5: false, svgo: { pretty: true, plugins: [ { removeStyleElement: true } ] } }}] }
  )

  // SCSS
  // appSrc for _variables.scss
  oneOfRules.unshift(
    env === 'development' ?
    { test: /\.scss$/, use: ['style-loader', 'css-loader', {loader: 'sass-loader', options: {includePaths: [paths.appSrc, paths.appNodeModules]}}] } :
    { test: /\.scss$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', {loader: 'sass-loader', options: {includePaths: [paths.appSrc, paths.appNodeModules]}}]})}
  )

  // Babel
  if (env === 'development')
    babelLoader.include = [babelLoader.include, /gureact/]
  babelLoader.options.plugins = [
    require.resolve('babel-plugin-transform-decorators-legacy'),  // before transform-class-properties. needed by mobx
    require.resolve('babel-plugin-styled-components'),
    require.resolve('babel-plugin-lodash'),
    [require.resolve('babel-plugin-transform-imports'), {
      'gureact': { transform: 'gureact/src/core/${member}/${member}'},
      'gureact/antd': { transform: 'gureact/src/antd/${member}/${member}'},
      'gureact/antd-mobile': { transform: 'gureact/src/antd-mobile/${member}/${member}'},
      'gureact/commerce': { transform: 'gureact/src/commerce/${member}/${member}'},
      'gureact/mdc': { transform: 'gureact/src/mdc/${member}/${member}'},
      'react-icons': { transform: 'transform-imports-react-icons/index.js' },
      '@react-mdc': { transform: '@react-mdc/${member}', kebabCase: true },
      'date-fns': { transform: 'date-fns/${member}' },
      'yup': { transform: 'yup/lib/${member}' },
    }],
    [require.resolve('babel-plugin-import'), [
      { libraryName: 'antd', style: 'css' },
      { libraryName: 'antd-mobile', style: 'css' },
    ]],
  ],


  // Alias
  config.resolve.alias = Object.assign(config.resolve.alias, {
    'react-icon-base': '@gutenye/react-icon-base',
    'bcrypt': 'node-mocks/bcrypt',
  })

  // Production
  if (env === 'production') {
    config.resolve.alias = Object.assign(config.resolve.alias, {
      'AppDesign': 'node-mocks/false',
    })

    config.plugins.push(
      new Compression()
    )
  }

  return config
}
