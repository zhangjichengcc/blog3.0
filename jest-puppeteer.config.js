/*
 * @Author: zhangjicheng
 * @Date: 2020-11-04 10:48:35
 * @LastEditTime: 2020-11-05 10:41:36
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \blog3.0\jest-puppeteer.config.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
// ps https://github.com/GoogleChrome/puppeteer/issues/3120
// module.exports = {
//   launch: {
//     args: [
//       '--disable-gpu',
//       '--disable-dev-shm-usage',
//       '--no-first-run',
//       '--no-zygote',
//       '--no-sandbox',
//     ],
//   },
// };

export default {
  launch: {
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--no-first-run",
      "--no-zygote",
      "--no-sandbox"
    ]
  }
};
