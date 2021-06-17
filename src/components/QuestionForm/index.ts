/* eslint-disable import/no-unresolved */
/*
 * @Author: zhangjicheng
 * @Date: 2021-04-06 16:48:26
 * @LastEditTime: 2021-05-19 11:27:26
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \wechat-revenue-g\src\components\QuestionForm\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

import FormRender from "./FormRender";
import QuestionList from "./QuestionList";
import questionSchema from "./questionSchema";

const activeStyle = "border: #1890ff solid 3px;";

let prevId: string | null = null;
let timer: NodeJS.Timeout | null = null;

function scrollTo(id: string): void {
  const targetDom = document.getElementById(id);
  const { parentElement } = targetDom;
  const prevParentElement =
    prevId && prevId !== id
      ? document.getElementById(prevId).parentElement
      : null;
  parentElement.setAttribute("style", activeStyle);
  clearTimeout(timer);
  targetDom.blur();
  // eslint-disable-next-line no-unused-expressions
  prevParentElement && prevParentElement.removeAttribute("style");
  setTimeout(() => {
    targetDom.focus();
    prevId = id;
  }, 0);
  timer = setTimeout(() => {
    parentElement.removeAttribute("style");
    clearTimeout(timer);
  }, 2500);
}

export default FormRender;

export { QuestionList, questionSchema, scrollTo };
