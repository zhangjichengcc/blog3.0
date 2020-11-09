/*
 * @Author: zhangjicheng
 * @Date: 2020-11-05 21:45:51
 * @LastEditTime: 2020-11-09 11:38:37
 * @LastEditors: zhangjicheng
 * @Description: umi配置文件
 * @FilePath: \blog3.0\config\config.ts
 * @可以输入预定的版权声明、个性签名、空行等
 */
import { defineConfig } from 'umi';
// import plugin from "./plugin.config";
import routers from "./router.config";
import proxy from "./proxy.config";
import path from "path";

export default defineConfig({
  title: "Veigar",
  base: '/',                   // 指定根目录 default '/'
  alias: {                     // 配置别名，对引用路径进行映射。
    '@': path.resolve(__dirname, '../src'),
    pages: path.resolve(__dirname, "../src/pages"),
    components: path.resolve(__dirname, "../src/components"),
    utils: path.resolve(__dirname, "../src/utils"),
    services: path.resolve(__dirname, "../src/services")
  },
  devtool: 'eval',             // 用户配置 sourcemap 类型。 eval最快的类型，但不支持低版本浏览器 | source-map最慢最全的类型
  dynamicImport: {             // 是否启用按需加载
    loading: '@/Loading',
  },
  metas:[                      // 配置额外的 meta 标签。数组中可以配置key:value形式的对象。 <meta key1="value1" key2="value2"/>
    {
      name: 'keywords',
      content: 'javascript, nodejs'
    }
  ],
  nodeModulesTransform: {      // 设置 node_modules 目录下依赖文件的编译方式
    type: 'none',              // ?= 类型， all 所有 | none 默认值编译 es5-imcompatible-versions 里声明的依赖
    exclude: [],               // 忽略的依赖库，包名，暂不支持绝对路径
  },
  analyze: {                   // 包模块结构分析工具，可以看到项目各模块的大小，按需优化。
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed',    //parsed | stat | gzip
  },
  // 开启预渲染
  // ssr: {
  // },
  // exportStatic: {
  //   htmlSuffix: true,
  // },
  routes: routers,
  proxy,
});
