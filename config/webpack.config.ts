import * as path from "path";
import CleanWebpackPlugin from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CheckerPlugin } from "awesome-typescript-loader";
import { Configuration, HotModuleReplacementPlugin } from "webpack";

const isProduction = process.env.NODE_ENV === "production";
const mode = isProduction ? "production" : "development";

console.log(process.env.NODE_ENV);
console.log(isProduction);

const config: Configuration = {
  mode,
  entry: "./src/index.tsx",
  output: {
    path: path.resolve("dist"),
    filename: "main.[hash:6].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["awesome-typescript-loader"]
        // options: {
        //   useBabel: true,
        //   babelCore: "@babel/core"
        // }
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
    // !isProduction && new HotModuleReplacementPlugin()
  ]
};

export default config;
