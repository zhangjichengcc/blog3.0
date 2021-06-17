/*
 * @Author: zhangjicheng
 * @Date: 2021-03-23 10:08:22
 * @LastEditTime: 2021-05-06 14:50:45
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \wechat-revenue-g\src\components\QuestionForm\FormRender\formItems\components\StarRadioGroup\index.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */

import React, { FC, useState, useCallback } from "react";
import { Icon } from "antd";

import styles from "./index.less";

type itemProps = string | number;
interface startRadioGroupProps {
  readonly data: Array<itemProps>;
  readonly value?: string | number;
  readonly onChange?: (item: itemProps) => void;
  readonly style?: any;
  readonly label?: Array<string>;
  readonly disabled?: boolean;
}

const StarRadioGroup: FC<startRadioGroupProps> = ({
  data,
  value: coreValue,
  onChange,
  style,
  label,
  disabled = false
}): React.ReactElement => {
  const [value, setValue] = useState<string | number>(null);
  const activeIdx = data
    .map(item => item.toString())
    .indexOf(coreValue || value);

  // const onHandleClick = useCallback((key) => {
  //   if(typeof onChange === 'function') {
  //     onChange(key)
  //   } else {
  //     setValue(key)
  //   }
  // }, [value])

  const onHandleClick = key => {
    if (disabled) return;
    if (typeof onChange === "function") {
      onChange(key);
    } else {
      setValue(key);
    }
  };

  return (
    <div className={styles.view} style={style}>
      {label && <span>{label[0]}</span>}
      {data.map((item, idx) => {
        const key = item.toString();
        const active = idx <= activeIdx;
        return (
          <div className={styles.item} onClick={() => onHandleClick(key)}>
            {active ? (
              <Icon
                className={disabled ? styles.fillGrayStar : styles.fillStar}
                type="star"
                theme="filled"
              />
            ) : (
              <Icon
                className={disabled ? styles.disableStar : styles.star}
                type="star"
              />
            )}
          </div>
        );
      })}
      {label && <span>{label[1]}</span>}
    </div>
  );
};

export default StarRadioGroup;
