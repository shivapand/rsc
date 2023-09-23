import dotenv from 'dotenv';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default {
  entry: {
    bundle: [path.join(process.cwd(), 'source/client')]
  },
  output: {
    path: path.join(process.cwd(), 'source/client'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                    importSource: '@emotion/react'
                  }
                ]
              ],
              plugins: ['@emotion/babel-plugin']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    hot: true,
    liveReload: true,
    proxy: { '*': `http://localhost:${process.env.PORT}` }
  },
  resolve: {
    alias: {
      client: path.join(process.cwd(), 'source/client')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor.bundle'
        }
      }
    }
  }
};
