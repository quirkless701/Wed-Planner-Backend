const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Wedding Wishpers',
      }),
      new WebpackPwaManifest({
        name: 'Wedding Wishpers',
        short_name: 'WW',
        includeDirectory: false,
        include: [/\.html$/, /\.js$/, /\.css$/, /\.png$/, /\.json$/],
        filename: 'manifest.json',
        icons: [
            {
                src: 'icon_96x96.png',
                type: 'image/png',
                sizes: '96x96',
                purpose: 'any maskable',
              },
              {
                src: 'icon_128x128.png',
                type: 'image/png',
                sizes: '128x128',
                purpose: 'any maskable',
              },
              {
                src: 'icon_144x144.png',
                type: 'image/png',
                sizes: '144x144',
                purpose: 'any maskable',
              },
              {
                src: 'icon_192x192.png',
                type: 'image/png',
                sizes: '192x192',
                purpose: 'any maskable',
              },
              {
                src: 'icon_512x512.png',
                type: 'image/png',
                sizes: '512x512',
                purpose: 'any maskable',
              },
        ],
      }),
      new GenerateSW({
        include: [/\.html$/, /\.js$/, /\.css$/, /\.png$/, /\.json$/, 'manifest.json'],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
