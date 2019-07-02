const proxyConfig = {
  // 企业微信的代理地址
  // '/cgi-bin': {
  //   target: 'https://qyapi.weixin.qq.com/cgi-bin',
  //   changeOrigin: true,
  //   pathRewrite: { '^/cgi-bin': '' },
  // },
  // '/connect': {
  //   target: 'https://open.weixin.qq.com',
  //   changeOrigin: true,
  // },
  '/api': {
    target: 'http://127.0.0.1:5000', // 预生产
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
  // // 百度云应用
  // '/oauth': {
  //   target: 'https://aip.baidubce.com',
  //   changeOrigin: true,
  // },
  // // 获取百度云应用的token
  // '/rest': {
  //   target: 'https://aip.baidubce.com',
  //   changeOrigin: true,
  // },
  // // 获取企业微信的鉴权相关的接口
  // '/qywechat': {
  //   target: 'http://134.175.48.152:9000',
  //   //  11/22 zhengwb 推送Ticket, provider_access_token, 预授权码
  //   // 'target': 'http://134.175.86.11:9003',
  //   changeOrigin: true,
  // },
  // // 获取腾讯云人脸识别相关接口
  // '/face': {
  //   target: 'https://recognition.image.myqcloud.com/',
  //   changeOrigin: true,
  // },
  // '/ocr': {
  //   target: 'https://recognition.image.myqcloud.com',
  //   changeOrigin: true,
  // },
};

export default proxyConfig;
