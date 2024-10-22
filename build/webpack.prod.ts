import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.base";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";

const prodConfig: Configuration = merge(baseConfig, {
  mode: "production", // 生产模式，会开启tree-shaking和压缩代码，以及其他优化
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"), // 复制public下文件
          to: path.resolve(__dirname, "../dist"), //复制到dist目录中
          filter: (soucre) => !soucre.includes("index.html"), // 忽略index.html
        },
      ],
    }),
    new CompressionPlugin({
      test: /.(js|css)$/, // 只生成css,js压缩文件
      filename: "[path][base].gz", // 文件命名
      algorithm: "gzip", // 压缩格式,默认是gzip
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8, // 压缩率,默认值是 0.8
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            comparisons: false,
          },
        },
      }),
    ],
    // 提取第三方包和公共模块
    splitChunks: {
      chunks: "all",
      minSize: 1,
      minChunks: 1,
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)/,
          name: "react",
          reuseExistingChunk: true,
        },
        antd: {
          name: "antd",
          test: /[\\/]node_modules[\\/](antd)/,
          reuseExistingChunk: true,
        },
      },
    },
  },
});

export default prodConfig;
