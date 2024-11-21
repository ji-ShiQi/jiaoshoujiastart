import path from "path";
import { merge } from "webpack-merge";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import { Configuration as DevServerConfig } from "webpack-dev-server";
import baseConfig from "./webpack.base";

const host = "127.0.0.1";
const port = "8082";

const devServer: DevServerConfig = {
  host,
  port,
  open: true, // 是否自动打开
  compress: false, // gzip压缩，开发环境不开启，提升热更新速度
  hot: true, // 开启热更新
  historyApiFallback: true, // 解决history路由404问题
  // setupExitSignals: true, // 允许在sigint和sigterm 信号时关闭开发服务器和退出进程
  static: {
    directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
  },
  headers: {
    "Access-Control-Allow-Origin": "*", // HTTP响应头设置，允许任何开源进行跨域请求
  },
};

// 合并公共配置，并添加开发环境配置
const devConfig: Configuration = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [new HotModuleReplacementPlugin()],
  devServer: devServer,
});

export default devConfig;
