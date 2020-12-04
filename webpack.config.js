const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    app: "./index.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
};
