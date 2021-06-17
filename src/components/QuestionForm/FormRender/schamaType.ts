/* eslint-disable import/no-unresolved */
/*
 * @Author: zhangjicheng
 * @Date: 2021-03-11 15:12:53
 * @LastEditTime: 2021-05-06 14:12:18
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \wechat-revenue-g\src\components\QuestionForm\FormRender\schamaType.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import EditString from "./formItems/EditString";
import EditRadio from "./formItems/EditRadio";
import EditSelect from "./formItems/EditSelect";
import EditTextArea from "./formItems/EditTextArea";
import EditCheckBox from "./formItems/EditCheckBox";
import EditUpload from "./formItems/EditUpload";
import EditGauge from "./formItems/EditGauge";
import EditMatrixRadio from "./formItems/EditMatrixRadio";
import EditMatrixCheckboxes from "./formItems/EditMatrixCheckboxes";
import EditHeckboxesGauge from "./formItems/EditHeckboxesGauge";

const renderDomMap = {
  radio: EditRadio,
  checkboxes: EditCheckBox,
  select: EditSelect,
  input: EditString,
  textarea: EditTextArea,
  file: EditUpload,
  gauge: EditGauge,
  matrixRadio: EditMatrixRadio,
  matrixCheckboxes: EditMatrixCheckboxes,
  heckboxesGauge: EditHeckboxesGauge
};

export default renderDomMap;

export {
  EditRadio,
  EditCheckBox,
  EditSelect,
  EditString,
  EditTextArea,
  EditUpload,
  EditGauge,
  EditMatrixRadio,
  EditMatrixCheckboxes,
  EditHeckboxesGauge
};
