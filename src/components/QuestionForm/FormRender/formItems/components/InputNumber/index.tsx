/*
 * @Author: zhangjicheng
 * @Date: 2021-03-22 17:18:06
 * @LastEditTime: 2021-03-24 14:47:57
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \wechat-revenue-g\src\pages\Questionnaire\EditPage\components\QuestionEditor\components\FormRender\components\EditGauge\components\InputNumber\index.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */
// eslint-disable-next-line no-unused-vars
import React, { FC, useCallback } from "react";
import { InputNumber } from "antd";

import styles from "./index.less";

interface inputNumProps {
  value?: Array<number>;
  onChange?: (array: Array<number>) => void;
  max?: number;
  min?: number;
}

const InputNum: FC<inputNumProps> = ({
  value: initValue = [],
  onChange,
  max,
  min
}): React.ReactElement => {
  const displayNum = initValue.length;

  const onHandleChange = useCallback((value: number) => {
    const newValue = new Array(value).fill(null).map((_i, idx) => idx + 1);
    if (typeof onChange === "function") onChange(newValue);
  }, []);

  // const onHandleChange = useCallback((value: number) => {
  //   const newValue = new Array(value).fill(null).map((_i, idx) => idx + 1)
  //   if(typeof onChange === 'function') onChange(newValue);
  // }, [])

  return (
    <div className={styles.view}>
      <InputNumber
        max={max}
        min={min}
        value={displayNum}
        onChange={onHandleChange}
      />
    </div>
  );
};

export default InputNum;
