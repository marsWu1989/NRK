// regeneratorRuntime
require('@babel/polyfill')

// import for node
require('@babel/register')({
  ignore: [ /(node_modules)/ ],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    // 'syntax-dynamic-import',
    // 'dynamic-import-node',
  //   'react-loadable/babel'
  ]
})

// server scss
require('css-modules-require-hook')({
    extensions: ['.scss'],
    preprocessCss: (data, filename) =>
        require('node-sass').renderSync({
            data,
            file: filename
        }).css,
    camelCase: true,
    generateScopedName: '[name]_[local]_[hash:base64:5]'
})

require('./app')

