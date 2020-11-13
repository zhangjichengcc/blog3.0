/*
 * @Author: zhangjicheng
 * @Date: 2020-05-26 10:58:22
 * @LastEditTime: 2020-11-13 16:09:35
 * @LastEditors: zhangjicheng
 * @Description: 配置引入module
 * @FilePath: \blog3.0\typings.d.ts
 */

declare module "slash2";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "omit.js";
declare module "*.svg" {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>
  ): React.ReactElement;
  const url: string;
  export default url;
}
declare module "classnames";
declare module "react-dom";
declare module "qs";
declare module "highlight.js";
declare module "js-moment";
