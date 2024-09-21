const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    'theme-dark': './src/theme-dark.css',
    'theme-light': './src/theme-light.css',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: '[name].js', // This won't be used, but is required
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  }, 
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
  ],
  optimization: {
    // This will remove empty chunks
    removeEmptyChunks: true,
  },
  stats: {
    // emitOnErrors: false, //By removing the filename property, we're no longer explicitly telling Webpack to create JS files for our CSS entries. We wanted to use it to prevents Webpack from emitting assets (in this case, the JS files) when there are errors in the compilation process.  However  we got this error [webpack-cli] Invalid configuration object. Webpack has been initialized using a configuration object that does not match the API schema - configuration.stats has an unknown property 'emitOnErrors'
  },
};
