import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

import PackageJson from './package.json'
import ConfigJson from './config.json'

const isDev = process.env['mode'].trim() === 'development';

const time = new Date()

export default {
  entry: ['babel-polyfill', path.join(__dirname, 'src', 'app.js')],
  output: {
    path: path.join(__dirname, 'build'),
    filename: `assets/js/bundle.min.js?version=${PackageJson.version}&time=${time.toString()}`
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          uglifyOptions: {
            mangle: true,
          },
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        favicon: path.join(__dirname, 'public', 'favicon.png'),
        minify: {
          removeAttributeQoutes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  mode: process.env.NODE_ENV,
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@intelIn': path.resolve(__dirname, '')
    }
  },
  devServer: {
    contentBase: "./src/",
    publicPath: "/",
    compress: true,
    port: ConfigJson.port,
    host: "localhost",
    stats: 'minimal',
    historyApiFallback: true,
    open: true,
    inline: true,
    watchContentBase: true,
    hot: true
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.(sass|scss)$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
            importLoaders: 1,
            localIdentName: isDev ? '[local]_[hash:base64:5]' : 'Meiji_[hash:base64:10]_',
          }
        },
        'sass-loader'
      ]
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|jp(e*)g|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'assets/images/'
        }
      }]
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'assets/fonts'
        }
      }]
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name]__[hash].min.css`,
      chunkFilename: `[name]__[hash].min.css`
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      favicon: path.join(__dirname, 'public', 'favicon.png'),
      minify: {
        removeAttributeQoutes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new CleanWebpackPlugin()
  ]
};
