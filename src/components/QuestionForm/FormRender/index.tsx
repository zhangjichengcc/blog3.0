/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
/*
 * @Author: zhangjicheng
 * @Date: 2021-03-15 11:34:09
 * @LastEditTime: 2021-05-21 14:35:37
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \wechat-revenue-g\src\components\QuestionForm\FormRender\index.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */

import React, { FC, useEffect } from "react";
import { Form } from "antd";
import { ReactSortable } from "react-sortablejs";
import classnames from "classnames";
import { questionSchema } from "@/components/QuestionForm";
// eslint-disable-next-line import/no-unresolved
import renderDomMap from "./schamaType";

import styles from "./index.less";

// 深拷贝
function deepClone(target) {
  if (typeof target !== "object") return target;
  const cloneTarget: any = Array.isArray(target) ? [] : {};
  for (const i in target) {
    cloneTarget[i] =
      typeof target[i] === "object" ? deepClone(target[i]) : target[i];
  }
  return cloneTarget;
}

// schema树结构转标准数组
const schemaToList = obj => {
  if (!obj) return [];
  const keys = Object.keys(obj);
  return keys.map(key => ({
    key, // 注意此处需要将key加入对象中
    label: questionSchema.filter(item => key.includes(item.key))[0].label,
    ...obj[key]
  }));
};

// 数组转scheam标准树结构
const listToSchema = list => {
  const res = {};
  list.forEach(item => {
    const { key, ...other } = item;
    res[key] = other;
  });
  return res;
};

interface formItemProps {
  type: string; // 题目类型
  key: string | number;
  name: string; // 题目主键
  value?: any; // 值
  onChange?: (value: any) => void; // 值变化触发方法
  device: "pc" | "phone"; // 设备类型
  status: "edit" | "preview"; // 表单状态
  disabled?: boolean; // 是否可编辑
  schema: SchemaProps;
  onSave: (item: propertiesItemProps) => void;
  onDelete: (item: propertiesItemProps) => void;
  answerContent?: object;
}
// 根据类型加载相应dom进行渲染
const FormItem: FC<formItemProps> = props => {
  const { type, ...otherProps } = props;
  const Com = renderDomMap[type] || renderDomMap.input;
  const { schema, device, status } = otherProps;
  return (
    <div
      className={classnames(
        status === "edit" && styles.formItem,
        device === "pc" ? styles.pcItem : ""
      )}
    >
      <input
        type="text"
        id={schema.key}
        style={{
          opacity: 0,
          width: 0,
          height: 0,
          position: "absolute",
          top: "50%",
          left: -10
        }}
      />
      <Com {...otherProps} />
    </div>
  );
};

interface formRenderProps {
  schema: SchemaProps;
  onChange?: (schema: SchemaProps) => void;
  // value,
  status: "edit" | "preview";
  device: "phone" | "pc";
  style?: any;
  form: any;
  answerContent?: any;
}

const FormRender: FC<formRenderProps> = ({
  schema = {},
  onChange,
  // value,
  status = "preview",
  device = "pc",
  style,
  form,
  answerContent = {}
}): React.ReactElement => {
  const { getFieldDecorator } = form;

  // 题目列表
  const propertiesList = schemaToList(schema.properties);

  // 保存题目编辑内容触发
  const onSave = newSchema => {
    if (typeof onChange !== "function") return;
    const { key } = newSchema;
    onChange({
      ...schema,
      properties: {
        ...schema.properties,
        [key]: newSchema
      }
    } as SchemaProps);
  };

  const onDel = newSchema => {
    if (typeof onChange === "function") {
      const { key } = newSchema;
      const { properties } = schema;
      const copyProperties = deepClone(properties);
      delete copyProperties[key];
      onChange({
        ...schema,
        properties: copyProperties
      } as SchemaProps);
    }
  };

  // 排序变化返回新的list，转为标准schema格式回调
  function setList(list) {
    if (typeof onChange !== "function") return;
    const properties = listToSchema(list);
    onChange({
      ...schema,
      properties
    } as SchemaProps);
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    // globalThis.Form = form;
  }, []);

  console.log(propertiesList);

  return (
    <>
      {propertiesList.length > 0 ? (
        <div className={styles.formRender} style={style}>
          <Form>
            <ReactSortable
              list={propertiesList}
              setList={setList}
              animation={150}
              disabled={status !== "edit"}
            >
              {propertiesList.map(item => {
                const { key, label } = item;
                const type = key.replace(/^([a-zA-Z0-9]+)_.*/, "$1");
                const qeustionId = key.split("_")[1];
                // 问卷已填
                const isAnswered = answerContent
                  ? Object.keys(answerContent).length
                  : 0;
                return getFieldDecorator(key, {
                  initialValue: answerContent[qeustionId]
                })(
                  <FormItem
                    type={type}
                    name={label}
                    disabled={!!isAnswered}
                    device={device}
                    status={status}
                    key={key}
                    schema={item}
                    onSave={onSave}
                    onDelete={onDel}
                  />
                );
              })}
            </ReactSortable>
          </Form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const Component = Form.create<formRenderProps>()(FormRender);

export default Component;
