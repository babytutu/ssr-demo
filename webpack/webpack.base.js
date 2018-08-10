const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack =  require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    app: './src/entry-client.js',
    vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync']
  },
  output: {
    filename: 'client-bundle.[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].bundle.js',
    path: path.join(process.cwd(), 'dist'),
    publicPath: '/dist/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ssr-demo',
      template: path.join(process.cwd(), 'index.html'),
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 20000 // Minimum number of characters
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name]_[chunkhash:8].css',
      chunkFilename: '[id]_[chunkhash:8].css',
    }),
    new OptimizeCssAssetsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'assets/',
              limit: 8192
            }
          }
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'assets/',
              limit: 8192
            }
          }
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  resolve: {
    alias: {
      'src': path.join(process.cwd(), 'src'),
      'assets': path.join(process.cwd(), 'src/assets')
    },
  },
  stats: {
    // Add built modules information
    modules: false,
    chunks: false,
  }
}
