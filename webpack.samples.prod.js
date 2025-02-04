const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "production",

  entry: "./samples/js/index.js",

  devtool: "source-map",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "samples.js"
  },

  resolve: {
    alias: {
      "rc-notifications": path.resolve(__dirname, "src"),
      src: path.resolve(__dirname, "src"),
      helpers: path.resolve(__dirname, "samples/js/helpers"),
      components: path.resolve(__dirname, "samples/js/components"),
      images: path.resolve(__dirname, "samples/images"),
      styles: path.resolve(__dirname, "samples/styles")
    },
    extensions: [".js", ".css", ".scss"]
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ["babel-loader"],
      exclude: /node_modules/
    }, {
      test: /\.(js|jsx)$/,
      use: ["eslint-loader"],
      include: /samples/
    }, {
      test: /\.(css|scss)$/,
      use: [
        { loader: MiniCssExtractPlugin.loader },
        { loader: "css-loader" },
        { loader: "sass-loader" }
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: ["file-loader"]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ["file-loader"]
    }]
  },

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      watch: true,
      beforeEmit: true
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./samples/html/index.html"
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};