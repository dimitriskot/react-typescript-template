const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");

const isProduction = process.env.NODE_ENV === "production";
const mode = isProduction ? "production" : "development";

console.log(process.env.NODE_ENV);
console.log(isProduction);

const config = {
  mode,
  entry: "./src/index.tsx",
  output: {
    path: path.resolve("dist"),
    filename: "main.[chunkhash:6].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          useBabel: true,
          babelCore: "@babel/core"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("dist", {}),
    new CheckerPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash:6].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ]
};

module.exports = config;
