/*
 * @Author: zhangjicheng
 * @Date: 2021-03-22 16:42:29
 * @LastEditTime: 2021-04-15 16:25:22
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \wechat-revenue-g\src\components\QuestionForm\FormRender\formItems\components\DegreeArea\index.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */

import React, { FC, useCallback } from "react";
import { Input } from "antd";

import styles from "./index.less";

interface degreeAreaProps {
  value?: Array<string>;
  onChange?: (array: Array<string>) => void;
}

const DegreeArea: FC<degreeAreaProps> = ({
  value: initValue = ["", ""],
  onChange
}): React.ReactElement => {
  // const onBeginChange = useCallback((e) => {
  //   const { value } = e.target;
  //   if(typeof onChange === 'function') onChange([value, initValue[1]]);
  // }, [])

  function onBeginChange(e) {
    const { value } = e.target;
    if (typeof onChange === "function") onChange([value, initValue[1]]);
  }

  function onEndChange(e) {
    const { value } = e.target;
    if (typeof onChange === "function") onChange([initValue[0], value]);
  }

  return (
    <div className={styles.view}>
      <Input
        placeholder="起始值"
        onChange={onBeginChange}
        value={initValue[0]}
      />
      <i />
      <Input placeholder="结束值" onChange={onEndChange} value={initValue[1]} />
    </div>
  );
};

export default DegreeArea;
