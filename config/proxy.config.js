const proxyConfig = {
  '/api': {
    target: 'http://127.0.0.1:5000', // 本地
    // target: 'http://118.190.52.53:8020', // 生产
    changeOrigin: true,
    router: {
      '/api/artical': 'http://127.0.0.1:5001',
      '/api/image': 'http://127.0.0.1:5002',
      '/api/user': 'http://127.0.0.1:5003',
    },
  },
};

export default proxyConfig;
