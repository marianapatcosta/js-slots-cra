const path = require('path');
const webpack = require('webpack');

const src = path.resolve(__dirname, './src');
const build = path.resolve(__dirname, './public'); 
const tsLoader = {
  loader: 'ts-loader',
  options: { compilerOptions: { module: 'esnext', noEmit: false } },
};

module.exports = {
  mode: 'none',
  target: 'webworker',
  entry: './src/workers/shuffle-worker.ts',
  output: {
    filename: 'worker.js',
    path: build,
  },
  resolve: {
    modules: ['node_modules', src],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [tsLoader],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
};
