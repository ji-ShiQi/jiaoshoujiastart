import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackBar from "webpackbar";
const Dotenv = require("dotenv-webpack");

// const isDev = process.env.NODE_ENV === "development"; // 是否是开发模式
// console.log("env:", process.env.NODE_ENV);
const path = require("path");
const baseConfig: Configuration = {
  entry: path.resolve(__dirname, "../src/index.tsx"), // 入口文件
  // 打包出口文件
  output: {
    path: path.resolve(__dirname, "../dist"), // 打包结果输出路径
    filename: "js/[name].[chunkhash:8].js", // 每个输出js的名称
    clean: true, // webpack4需要配置clean-webpack-pluin来删除dist文件，webpack5内置了
    publicPath: "/", //打包后文件的公共前缀路径
  },
  // loader配置
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i, // 匹配.ts,.tsx文件
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader", // 多线程
            options: {
              wokers: 4,
            },
          },
          "babel-loader",
        ],
      },
      {
        test: /.css$/, // 匹配css文件
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"], // 解析模块时，可以省略的扩展名
    // 别名需要配置两个地方，这里和 tsconfig.json
    alias: {
      "@": path.join(__dirname, "../src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 复制 'index.html' 文件，并自动映入打包输出的所有资源（js/css）
      template: path.join(__dirname, "../public/index.html"),
      favicon: path.join(__dirname, "../public/favicon.ico"),
      inject: true, // 自动注入静态资源
      hash: true,
      cache: false,
      // 压缩html资源
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true, // 去空格
        removeComments: true, // 去注释
        minifyJS: true,
        minifyCSS: true,
      },
    }),
    new WebpackBar({
      color: "#85d", // 默认green，进度条颜色支持HEX
    }),
    // new DefinePlugin({
    //   "process.env.node_env": JSON.stringify(process.env.NODE_ENV),
    //   "process.env.RUNTIME_ENV": JSON.stringify(process.env.NODE_ENV),
    // }),
    new Dotenv({
      path: path.resolve(__dirname, "..", `env/.${process.env.NODE_ENV}`),
    }),
  ],
  cache: {
    type: "filesystem", // 使用文件缓存
  },
};

export default baseConfig;
