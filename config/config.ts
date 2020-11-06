import defaultSettings from "./defaultSettings"; // https://umijs.org/config/

// import slash from 'slash2';
import webpackPlugin from "./plugin.config";
import routers from "./router.config";
import proxy from "./proxy.config";
import path from "path";

const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview =
  ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === "site";
// const plugins = [
//   [
//     "umi-plugin-react",
//     {
//       antd: true,
//       dva: {
//         hmr: true
//       },
//       locale: {
//         enable: true,
//         default: "zh-CN",
//         baseNavigator: true
//       },
//       dynamicImport: {
//         loadingComponent: "./components/PageLoading/index",
//         webpackChunkName: true,
//         level: 3
//       },
//       pwa: pwa
//         ? {
//             workboxPluginMode: "InjectManifest",
//             workboxOptions: {
//               importWorkboxFrom: "local"
//             }
//           }
//         : false,
//       dll: {
//         include: ["dva", "dva/router", "dva/saga", "dva/fetch"],
//         exclude: ["@babel/runtime", "netlify-lambda"]
//       }
//     }
//   ],
//   [
//     "umi-plugin-pro-block",
//     {
//       moveMock: false,
//       moveService: false,
//       modifyRequest: true,
//       autoAddMenu: true
//     }
//   ]
// ];

const plugins = {
  // antd: true,
  dva: {
    skipModelValidate: false, // boolean 是否跳过model验证 default：false
    extraModels: [], // string[] 配置额外到dva model default: []
    immer: false, // boolean 是否启用immer，以方便修改reducer default: false
    hmr: true // boolean 是否启用dva model 热更新 default false
  },
  locale: {
    default: "zh-CN"
  }
};

export default {
  ...plugins,
  hash: true,
  targets: {
    ie: 11
  },
  devtool: isAntDesignProPreview ? "source-map" : false,
  routes: routers,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    "primary-color": primaryColor
  },
  ignoreMomentLocale: true,
  alias: {
    // '@': path.resolve(__dirname, '../src'),
    "@": path.resolve("../src"),
    pages: path.resolve(__dirname, "../src/pages"),
    components: path.resolve(__dirname, "../src/components"),
    utils: path.resolve(__dirname, "../src/utils"),
    services: path.resolve(__dirname, "../src/services")
  },
  // lessLoaderOptions: {
  //   javascriptEnabled: true
  // },
  // disableRedirectHoist: true,
  // cssLoaderOptions: {
  //   modules: true,
  //   getLocalIdent: (context: {[key: string]: any}, _: unknown, localName: {[key: string]: any}): any => {
  //     if (
  //       context.resourcePath.includes('node_modules') ||
  //       context.resourcePath.includes('ant.design.pro.less') ||
  //       context.resourcePath.includes('global.less')
  //     ) {
  //       return localName;
  //     }

  //     const match = context.resourcePath.match(/src(.*)/);

  //     if (match && match[1]) {
  //       const antdProPath = match[1].replace('.less', '');
  //       const arr = slash(antdProPath)
  //         .split('/')
  //         .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
  //         .map((a: string) => a.toLowerCase());
  //       return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
  //     }
  //     return localName;
  //   },
  // },
  manifest: {
    basePath: "/"
  },
  chainWebpack: webpackPlugin,
  proxy
};
