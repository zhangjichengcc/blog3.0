/* eslint-disable no-undef */
/*
 * @Author: zhangjicheng
 * @Date: 2021-03-10 19:46:25
 * @LastEditTime: 2021-05-18 10:58:05
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \wechat-revenue-g\src\components\QuestionForm\QuestionForm.d.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

interface propertiesItemProps {
  key?: string; // 主键
  title?: string; // 表单名称
  type?: string;
  required?: boolean;
  enum?: Array<string | number>;
  enumNames?: Array<string>;
  degree?: Array<string>;
  format?: string;
  items?: { [key: string]: any };
  edit?: boolean; // 是否在编辑状态
  [key: string]: any;
}

interface questionSchamaProps {
  icon?: any;
  label: string;
  key: string;
  schema?: propertiesItemProps;
}

interface SchemaProps {
  key?: string;
  title?: string;
  required?: boolean;
  type: "object"; // object
  properties?: { [key: string]: propertiesItemProps };
  formData?: { [key: string]: any };
}
