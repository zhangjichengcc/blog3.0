/* eslint-disable import/no-unresolved */
/*
 * @Author: zhangjicheng
 * @Date: 2021-03-10 18:13:39
 * @LastEditTime: 2021-05-21 11:20:28
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \wechat-revenue-g\src\components\QuestionForm\questionSchema.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

import danxuanSvg from "./images/danxuan.svg";
import duoxuanSvg from "./images/duoxuan.svg";
import danhangSvg from "./images/danhang.svg";
import duohangSvg from "./images/duohang.svg";
// import fujianSvg from './images/fujian.svg';
import liangbiaoSvg from "./images/liangbiao.svg";
// import tiankongSvg from './images/tiankong.svg';
import xialaSvg from "./images/xiala.svg";
import jzdxSvg from "./images/jzdx.svg";
import jzdxsSvg from "./images/jzdxs.svg";
import jzlbSvg from "./images/jzlb.svg";

// interface questionSchamaProps {
//   icon?: any;
//   label: string;
//   key: string;
//   schema?: Object;
// }

const questionSchama: questionSchamaProps[] = [
  // key: radio_*
  {
    icon: danxuanSvg,
    label: "单选题",
    key: "radio_",
    schema: {
      title: "单选题",
      type: "string",
      required: true,
      enum: ["1", "2"],
      enumNames: ["选项1", "选项2"],
      "ui:widget": "radio"
    }
  },
  {
    icon: duoxuanSvg,
    label: "多选题",
    key: "checkboxes_",
    schema: {
      title: "多选题",
      // "description": "点击多选",
      required: true,
      type: "array",
      items: {
        type: "string"
      },
      enum: ["1", "2"],
      enumNames: ["选项1", "选项2"]
    }
  },
  {
    icon: xialaSvg,
    label: "下拉题",
    key: "select_",
    schema: {
      title: "下拉题",
      required: true,
      type: "string",
      enum: ["1", "2"],
      enumNames: ["选项1", "选项2"]
    }
  },
  {
    icon: danhangSvg,
    label: "单行文本",
    key: "input_",
    schema: {
      title: "单行文本",
      required: true,
      type: "string",
      "ui:widget": "edit-string"
    }
  },
  {
    icon: duohangSvg,
    label: "多行文本",
    key: "textarea_",
    schema: {
      title: "多行文本",
      required: true,
      type: "string",
      format: "textarea"
    }
  },
  // {icon: fujianSvg, label: '附件题', key: 'file_', schema: {
  //   "title": "附件题",
  // }},
  {
    icon: liangbiaoSvg,
    label: "量表题",
    key: "gauge_",
    schema: {
      title: "量表题",
      required: true,
      enum: ["1", "2", "3", "4", "5"],
      degree: ["起始值", "结束值"],
      type: "string",
      "ui:widget": "radio"
    }
  },
  // {icon: tiankongSvg, label: '填空题', key: 'tiankong'},
  {
    icon: jzdxSvg,
    label: "矩阵单选题",
    key: "matrixRadio_",
    schema: {
      properties: {
        questions: {
          enum: ["1", "2", "3"],
          enumNames: ["问题1", "问题2", "问题3"],
          title: "问题"
        },
        answers: {
          enum: ["1", "2", "3"],
          enumNames: ["选项1", "选项2", "选项3"],
          title: "选项"
        }
      },
      title: "矩阵单选题",
      type: "object",
      required: true
    }
  },
  {
    icon: jzdxsSvg,
    label: "矩阵多选题",
    key: "matrixCheckboxes_",
    schema: {
      properties: {
        questions: {
          enum: ["1", "2", "3"],
          enumNames: ["问题1", "问题2", "问题3"],
          title: "问题"
        },
        answers: {
          enum: ["1", "2", "3"],
          enumNames: ["选项1", "选项2", "选项3"],
          title: "选项"
        }
      },
      title: "矩阵多选题",
      type: "object",
      required: true
    }
  },
  {
    icon: jzlbSvg,
    label: "矩阵量表题",
    key: "heckboxesGauge_",
    schema: {
      properties: {
        questions: {
          enum: ["1", "2", "3"],
          enumNames: ["问题1", "问题2", "问题3"],
          title: "问题"
        },
        answers: {
          enum: ["1", "2", "3", "4", "5"],
          degree: ["起始值", "结束值"],
          title: "选项"
        }
      },
      title: "矩阵量表题",
      type: "object",
      required: true
    }
  }
];

export default questionSchama;
