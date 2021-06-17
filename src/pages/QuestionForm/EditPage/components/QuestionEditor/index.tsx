/* eslint-disable import/no-unresolved */
/*
 * @Author: zhangjicheng
 * @Date: 2021-03-08 18:44:07
 * @LastEditTime: 2021-05-07 11:57:20
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \wechat-revenue-g\src\pages\Questionnaire\EditPage\components\QuestionEditor\index.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */
// eslint-disable-next-line no-unused-vars
import React, { FC, forwardRef } from "react";
import FormRender from "@/components/QuestionForm";

import styles from "./index.less";

interface SchemaFormProps {
  ref?: any;
  schema?: any;
  onChange?: () => void;
  disabled?: boolean;
  style?: object;
}

const SchemaForm: FC<any> = ({
  style,
  schema,
  onChange
}): React.ReactElement => {
  return (
    <div className={styles.questionEditorView} style={style}>
      <FormRender schema={schema} onChange={onChange} status="edit" />
    </div>
  );
};
export default forwardRef(SchemaForm);
