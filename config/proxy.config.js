const proxyConfig = {
  '/api': {
    // target: 'http://127.0.0.1:5000', // 本地
    target: 'http://118.190.52.53:8020', // 生产
    changeOrigin: true,
    router: {
      // '/api/v1/declare/declareCalendar': "http://192.168.0.129:8888",
      // 缴款接口 张吉成 | 陈伟杰
      // '/api/v1/pay': "http://192.168.11.23:8020",
      // 申报缴款 张吉成 | 张保
      // '/api/v1/declare': "http://192.168.11.32:8020",
      // 申报表操作
      // '/api/v1/declare/manage': 'http://192.168.11.39:8020',
    },
  },
};

export default proxyConfig;
