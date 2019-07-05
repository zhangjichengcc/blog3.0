const proxyConfig = {
  '/api': {
    target: 'http://127.0.0.1:5000', // 本地
    // target: 'http://118.190.52.53:8020', // 生产
    changeOrigin: true,
    router: {
      // '/api/v1/declare/manage': 'http://192.168.11.39:8020',
    },
  },
};

export default proxyConfig;
