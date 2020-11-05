/*
 * @Author: your name
 * @Date: 2019-11-28 18:50:31
 * @LastEditTime: 2020-09-25 14:58:01
 * @LastEditors: zhangjicheng
 * @Description: In User Settings Edit
 * @FilePath: \blog3.0\config\proxy.config.js
 */

const proxyConfig = {
  "/api": {
    // target: 'http://127.0.0.1:5000', // 本地
    target: "http://118.190.52.53:80", // 生产
    changeOrigin: true
    // router: {
    //   '/api/artical': 'http://127.0.0.1:5001',
    //   '/api/image': 'http://127.0.0.1:5002',
    //   '/api/user': 'http://127.0.0.1:5003',
    // },
  }
};

export default proxyConfig;
