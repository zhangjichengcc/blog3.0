/*
 * @Author: zhangjicheng
 * @Date: 2021-03-09 16:03:05
 * @LastEditTime: 2021-04-12 15:44:32
 * @LastEditors: zhangjicheng
 * @Description: 二次封装单行输入框
 * @FilePath: \wechat-revenue-g\src\components\QuestionForm\FormRender\formItems\EditUpload\index.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */
import React, { FC, useEffect, useState } from "react";
import { Input, Radio, Upload, Button, Modal, Form, Icon } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import classnames from "classnames";

import styles from "./index.less";

const { TextArea } = Input;
const { Dragger } = Upload;

function deepClone(source) {
  if (typeof source !== "object") return source;
  const target = Array.isArray(source) ? [] : {};
  for (const i in source) {
    target[i] =
      typeof source[i] === "object" ? deepClone(source[i]) : source[i];
  }
  return target;
}

const { confirm } = Modal;

interface validObjProps {
  [key: string]:
    | {
        status: string;
        help: string | null;
        rules: Array<{ match: any; text: string }>;
      }
    | boolean;
}

interface editStringProps {
  value: string;
  name?: string;
  disabled: boolean;
  status: "edit" | "write" | "preview";
  device: "phone" | "pc";
  onChange: (name: string, value: string) => void;
  schema: propertiesItemProps;
  onSave(schemaItem: propertiesItemProps): void;
  onDelete: (name: string) => void;
  [key: string]: any;
}

const EditString: FC<editStringProps> = ({
  value,
  name,
  status,
  device = "pc",
  onChange,
  schema,
  onSave,
  onDelete,
  disabled = false
}): React.ReactElement => {
  const { edit, title: schemaTitle, required: schemaRequired = true } = schema;

  const [editForm, setEdittForm] = useState<any>({
    title: schemaTitle,
    required: schemaRequired
  });
  const [validObj, setValidObj] = useState<validObjProps>({
    key: false, // 控制是否进行form校验
    title: {
      status: "default",
      help: null,
      rules: [
        {
          match: (v = "") => !!v.length,
          text: "题目不能为空！"
        }
      ]
    }
  });

  // 统一校验规则
  function onValidate() {
    const keys = Object.keys(editForm);
    const cloneObj = deepClone(validObj);
    let res = true;
    keys.forEach(itemKey => {
      const testValue = editForm[itemKey];
      const validItem = cloneObj[itemKey];
      const validItemRules = validItem.rules || [];
      // eslint-disable-next-line no-restricted-syntax
      for (const i in validItemRules) {
        if (!validItemRules[i].match(testValue)) {
          validItem.status = "error";
          validItem.help = validItemRules[i].text;
          res = false;
          break;
        } else {
          validItem.status = "default";
          validItem.help = "";
        }
      }
    });
    setValidObj({ ...cloneObj, key: true });
    return res;
  }

  // 确定编辑
  function onHandleOk() {
    setValidObj({ ...validObj, key: true });
    // if (!onValidate()) return;
    onSave({
      ...schema,
      title: editForm.title, // 编辑后的title
      edit: false // 取消编辑状态
    });
  }

  // 取消编辑
  function onHandleCancel() {
    onSave({
      ...schema,
      edit: false // 取消编辑状态
    });
  }

  // 开始编辑
  function onEdit() {
    onSave({
      ...schema,
      edit: true // 开启编辑状态
    });
  }

  // 删除当前项
  function onRemove() {
    confirm({
      title: "系统提示?",
      content: "确定删除本项？",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        onDelete(schema.key);
      }
    });
  }

  // 题目编辑
  function onEditFormChange(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) {
    setEdittForm({
      ...editForm,
      [key]: e.target.value
    });
  }

  // 是否必填
  function onRequiredChange(e: RadioChangeEvent) {
    const { value: requiredValue } = e.target;
    setEdittForm({
      ...editForm,
      required: !!requiredValue
    });
  }

  useEffect(() => {
    if (validObj.key) onValidate();
  }, [editForm]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={classnames(styles.view, styles[device])}>
      {status === "edit" && (
        <div className={styles.editView}>
          {edit ? (
            // 题目编辑器
            <div className={styles.editForm}>
              <Form
                labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
                wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}
              >
                <Form.Item
                  label="题目"
                  hasFeedback
                  validateStatus={validObj.title.status}
                  help={validObj.title.help}
                >
                  <Input
                    placeholder="请输入题目"
                    value={editForm.title}
                    onChange={e => onEditFormChange(e, "title")}
                  />
                </Form.Item>
                <Form.Item label="是否必填">
                  <Radio.Group
                    defaultValue={1}
                    value={editForm.required ? 1 : 0}
                    onChange={onRequiredChange}
                  >
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
              <div className={styles.formItem}>
                <span />
                <div>
                  <Button type="primary" onClick={onHandleOk}>
                    确定
                  </Button>
                  <Button style={{ marginLeft: 10 }} onClick={onHandleCancel}>
                    取消
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // 输入框
            <div className={styles.showForm}>
              <div className={styles.questionArea}>
                <span className={styles.label}>
                  {editForm.required && (
                    <i className={styles.requiredIcon}>*</i>
                  )}
                  <span>{schemaTitle}:</span>
                </span>
                <div className={styles.questionBody}>
                  <Dragger>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">
                      点击添加文件或将文件拖拽到此处
                    </p>
                  </Dragger>
                </div>
              </div>
              <div className={styles.toolsBar}>
                <span onClick={onEdit}>编辑</span>
                <span onClick={onRemove}>删除</span>
              </div>
            </div>
          )}
        </div>
      )}
      {status === "preview" && (
        <div className={styles.preview}>
          <div className={styles.showForm}>
            <div className={styles.questionArea}>
              <span className={styles.label}>
                {editForm.required && <i className={styles.requiredIcon}>*</i>}
                <span>{schemaTitle}:</span>
              </span>
              <div className={styles.questionBody}>
                <Dragger disabled={disabled}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">
                    点击添加文件或将文件拖拽到此处
                  </p>
                </Dragger>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditString;
