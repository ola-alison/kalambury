const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC = path.resolve(__dirname, 'src');

const HOST = process.env.HOST || 'localhost';
const PORT = +process.env.PORT || 3000;
const PUBLIC_PATH = `http://${HOST}:${PORT}/`;

module.exports = {
  entry: SRC,
  output: {
    publicPath: PUBLIC_PATH,
    filename: '[name].js',
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': SRC
    },
    extensions: [
      '.js', '.json',
      '.css', '.less', '.scss',
      '.eot', '.woff', '.woff2', '.ttf',
      '.svg',
      '.jpg', '.png', '.gif'
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'compact',
              precision: 8,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              outputStyle: 'compact',
              precision: 8,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/',
            name: '[name].[hash].[ext]'
            //     useRelativePath: true
          },
        },
      },
      {
        test: /\.(svg|jpg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images/',
            name: '[name].[hash].[ext]',
            //     useRelativePath: true
          },
        },
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${SRC}/index.html`,
      inject: true
    })
  ],

  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      index: PUBLIC_PATH
    },
    compress: true,
    host: HOST,
    port: PORT,
    open: false,
    publicPath: PUBLIC_PATH
  }
};
