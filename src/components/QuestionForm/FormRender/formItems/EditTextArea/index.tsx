/*
 * @Author: zhangjicheng
 * @Date: 2021-03-09 16:03:05
 * @LastEditTime: 2021-05-21 14:41:00
 * @LastEditors: zhangjicheng
 * @Description: 二次封装单行输入框
 * @FilePath: \wechat-revenue-g\src\components\QuestionForm\FormRender\formItems\EditTextArea\index.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */
// eslint-disable-next-line no-unused-vars
import React, { FC, useEffect } from 'react';
import { Input, Radio, Button, Modal, Form, Icon } from 'antd';
import classnames from 'classnames';

import styles from './index.less';

const { TextArea } = Input;

const { confirm } = Modal;

interface editTextAreaProps {
  value?: any;
  name?: string;
  status: 'edit' | 'write' | 'preview';
  device: 'phone' | 'pc';
  onChange?: (value: any) => void;
  disabled?: boolean;
  schema: propertiesItemProps;
  onSave(schemaItem: propertiesItemProps): void;
  onDelete: (schemaItem: propertiesItemProps) => void;
  [key: string]: any;
}

const EditTextArea: FC<editTextAreaProps> = ({
  value,
  status,
  name,
  device = 'pc',
  onChange,
  disabled = false,
  schema,
  onSave,
  onDelete,
  form,
}): React.ReactElement => {

  const { getFieldDecorator, validateFields } = form;
  const { edit, title, required = 1 , description} = schema;

  // 确定编辑
  function onHandleOk(): void {
    validateFields(err => {
      if(!err) {
        const formValue = form.getFieldsValue();
        onSave({
          ...schema,
          ...formValue,
          edit: false, // 取消编辑状态
        })
      }
    })
  }

  // 取消编辑
  function onHandleCancel() {
    onSave({
      ...schema,
      edit: false, // 取消编辑状态
    })
  }

  // 开始编辑
  function onEdit() {
    onSave({
      ...schema,
      edit: true, // 开启编辑状态
    })
  }

  // 删除当前项
  function onRemove(): void {
    confirm({
      title: '系统提示?',
      content: '确定删除本项？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        // 删除时将schema返回
        onDelete(schema);
      },
    });
  }

  // 填写表单触发
  function onHandleChange(params: any) {
    if (disabled) return;
    if (typeof onChange === 'function') {
      onChange(params);
    }
  }

  /**
   * edit 初始化及值变化时
   */
  useEffect(() => {
    // 当切换到editTab且状态为编辑时才写入值，否则无对应dom写入
    if(status === 'edit' && edit) {
      form.setFieldsValue({
        title,
        required,
        description,
      })
    }
  }, [edit])

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={classnames(styles.view, styles[device])}>
      <Form labelCol={{xs: {span: 24}, sm: {span: 4}}} wrapperCol={{xs: {span: 24}, sm: {span: 20}}}>
        { status === 'edit' && 
          <div className={styles.editView}>
            { edit ?
              // 题目编辑器 
              <div className={styles.editForm}>
                <Form.Item label="题目">
                  {getFieldDecorator('title', {
                    rules: [ {
                      required: true,
                      message: '请输入题目',
                    },],
                  })(<Input placeholder="请输入题目" />)}
                </Form.Item>
                <Form.Item label="题型">
                  <Input disabled value={name} />
                </Form.Item>
                {/* <Form.Item label="说明">
                  {getFieldDecorator('description', {
                    rules: [{
                      validator: (_rule, val, callback) => {
                        if (val.length > 100) {
                          callback('说明长度不能大于100')
                        } else {
                          callback();
                        }
                      }
                    }]
                  })(
                    <Input placeholder="请输入说明文字, 100字以内" />
                  )}
                </Form.Item> */}
                <Form.Item label="是否必填">
                  {getFieldDecorator('required', {
                    rules: [ {
                      required: true,
                      message: '请选择是否必填',
                    },],
                  })(
                    <Radio.Group>
                      <Radio value>是</Radio>
                      <Radio value={false}>否</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
                <div className={styles.formItem}>
                  <span />
                  <div>
                    <Button type="primary" onClick={onHandleOk}>确定</Button>
                    <Button style={{marginLeft: 10}} onClick={onHandleCancel}>取消</Button>
                  </div>
                </div>
              </div> :
              // 输入框
              <div className={styles.showForm}>
                <div className={styles.questionArea}>
                  <span className={styles.label}>
                    {required && <i className={styles.requiredIcon}>*</i>}
                    <span>{title}:</span>
                  </span>
                  {(description && description.length) && <span className={styles.description}><Icon type="info-circle" style={{paddingRight: 5, fontSize: 14}} />{description}</span>}
                  <div className={styles.questionBody}>
                    <TextArea rows={4} />
                  </div>
                </div>
                <div className={styles.toolsBar}>
                  <span onClick={onEdit}>编辑</span>
                  <span onClick={onRemove}>删除</span>
                </div>
              </div>
            }
          </div>
        }
        { status === 'preview' && 
          <div className={styles.preview}>
            <div className={styles.showForm}>
              <div className={styles.questionArea}>
                <span className={styles.label}>
                  {required && <i className={styles.requiredIcon}>*</i>}
                  <span>{title}:</span>
                </span>
                {(description && description.length) && <span className={styles.description}><Icon type="info-circle" style={{paddingRight: 5, fontSize: 14}} />{description}</span>}
                <div className={styles.questionBody}>
                  <TextArea rows={4} value={value} onChange={onHandleChange} disabled={disabled} />
                </div>
              </div>
            </div>
          </div>
        }
      </Form>
    </div>
  )
}

const Component = Form.create()(EditTextArea)

export default Component;