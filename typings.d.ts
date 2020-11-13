/*
 * @Author: zhangjicheng
 * @Date: 2020-05-26 10:58:22
 * @LastEditTime: 2020-11-05 17:14:46
 * @LastEditors: zhangjicheng
 * @Description: In User Settings Edit
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
