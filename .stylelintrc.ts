/*
 * @Author: zhangjicheng
 * @Date: 2019-11-28 18:50:31
 * @LastEditTime: 2020-11-03 19:02:02
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \blog3.0\.stylelintrc.ts
 * @可以输入预定的版权声明、个性签名、空行等
 */
module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  rules: {
    "declaration-empty-line-before": null,
    "no-descending-specificity": null,
    "selector-pseudo-class-no-unknown": null,
    "selector-pseudo-element-colon-notation": null
  }
};
