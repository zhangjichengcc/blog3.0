/* 处理for in循环 */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

/* eslint-disable import/no-unresolved */
/*
 * @Author: zhangjicheng
 * @Date: 2021-03-09 16:03:05
 * @LastEditTime: 2021-05-21 14:43:55
 * @LastEditors: zhangjicheng
 * @Description: 二次封装单行输入框
 * @FilePath: \wechat-revenue-g\src\components\QuestionForm\FormRender\formItems\EditHeckboxesGauge\index.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */
// eslint-disable-next-line no-unused-vars
import React, { FC, useEffect } from 'react';
import { Input, Radio, Button, Modal, Form, Icon } from 'antd';
import classnames from 'classnames';
import DegreeArea from '../components/DegreeArea';
import InputNumber from '../components/InputNumber';
import InputSortArea from '../components/InputSortArea';
import StarRadioGroup from '../components/StarRadioGroup';

import styles from './index.less';

const { confirm } = Modal;

const mergeEnum = (ids: any = [], values: any = []): any => ids.map((id, idx) => ({
  id,
  value: values[idx] || '',
}))

interface editHeckboxesGaugeProps {
  value: object;
  name?: string;
  status: 'edit' | 'preview';
  device: 'phone' | 'pc';
  onChange: (value: any) => void;
  disabled?: boolean;
  schema: propertiesItemProps;
  onSave(schemaItem: propertiesItemProps): void;
  onDelete: (schemaItem: propertiesItemProps) => void;
  [key: string]: any;
}

const EditHeckboxesGauge: FC<editHeckboxesGaugeProps> = (props): React.ReactElement => {


  const {
    value = {},
    name,
    status,
    device = 'pc',
    onChange,
    disabled = false,
    schema,
    onSave,
    onDelete,
    form,
  } = props;

  const { getFieldDecorator, validateFields } = form;

  const { edit, title, properties = {}, required = 1, description = '' } = schema;
  const { questions = {}, answers = {} } = properties;

  const questionsRenderEnumList = mergeEnum(questions.enum, questions.enumNames);

  // 确定编辑
  function onHandleOk(): void {
    validateFields(err => {
      if(!err) {
        const formValue = form.getFieldsValue();
        const { questions: _questions = [], answers: _answers = {}, title: newTitle, required: newRequired, description: newDescription } = formValue;
        const newQuestions = {
          enum: _questions.map(item => item.id),
          enumNames: _questions.map(item => item.value)
        };
        onSave({
          ...schema,
          properties: {
            questions: newQuestions,
            answers: _answers
          },
          title: newTitle,
          required: newRequired,
          description: newDescription,
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
  function onHandleChange(v: any, item: any) {
    if(disabled) return;
    const { id } = item;
    if(typeof onChange === 'function') {
      onChange({...value, [id]: v });
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
        questions: questionsRenderEnumList,
        answers,
        required,
        description,
      })
    }
  }, [edit])

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={classnames(styles.view, styles[device])}>
      <Form
        labelCol={{xs: {span: 24}, sm: {span: 4}}}
        wrapperCol={{xs: {span: 24}, sm: {span: 20}}}
      >
        { status === 'edit' &&
          <div className={styles.editRadioView}>
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
                <Form.Item label="问题管理">
                  {getFieldDecorator('questions', {
                    rules: [{
                      required: true,
                      message: '请选择是否必填',
                    }, {
                      validator: (_rule, val, callback) => {
                        if (!val) {
                          callback('选项不能为空！');
                        } else if (val.filter(item => !item.value).length) {
                          callback('选项名称不能为空！');
                        } else {
                          callback();
                        }
                      }
                    }],
                  })(<InputSortArea className={styles.questionBox} />)}
                </Form.Item>
                <Form.Item label="程度">
                  {getFieldDecorator('answers.degree', {
                    rules: [{
                      required: true,
                      message: '请选择程度 1-10',
                    },{
                      validator: (_rule, val, callback) => {
                        if (!val || !val[0]) {
                          callback('请输入起始值！');
                        } else if (!val[1]) {
                          callback('请输入结束值！');
                        } else {
                          callback();
                        }
                      }
                    }],
                  })(
                    <DegreeArea />
                  )}
                </Form.Item>
                <Form.Item label="量表范围">
                  {getFieldDecorator('answers.enum', {
                    rules: [
                      {
                        required: true,
                        message: '请输入量表范围',
                      },
                    ],
                  })(
                    <InputNumber max={10} min={1} />
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
                    <div className={styles.questionGroup}>
                      {/* 补位，勿删 */}
                      <span />
                      <div>
                        {
                          answers.degree.map(item => (
                            <span>{item}</span>
                          ))
                        }
                      </div>
                    </div>
                    {
                      questionsRenderEnumList.map(qusItem => (
                        <div className={styles.questionGroup}>
                          <span>{qusItem.value}</span>
                          <StarRadioGroup style={{padding: '0 12px'}} data={answers.enum} />
                        </div>
                      ))
                    }
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
        {
          status === 'preview' &&
          <div className={styles.preview}>
            <div className={styles.showForm}>
              <div className={styles.questionArea}>
                <span className={styles.label}>
                  {required && <i className={styles.requiredIcon}>*</i>}
                  <span>{title}:</span>
                </span>
                {(description && description.length) && <span className={styles.description}><Icon type="info-circle" style={{paddingRight: 5, fontSize: 14}} />{description}</span>}
                <div className={styles.questionBody}>
                  <div className={styles.questionGroup}>
                    {/* 补位，勿删 */}
                    <span />
                    <div>
                      {
                        answers.degree.map(item => (
                          <span>{item}</span>
                        ))
                      }
                    </div>
                  </div>
                  {
                    questionsRenderEnumList.map(qusItem => (
                      <div className={styles.questionGroup}>
                        <span>{qusItem.value}</span>
                        <StarRadioGroup style={{padding: '0 12px'}} disabled={disabled} data={answers.enum} value={value[qusItem.id]} onChange={key => onHandleChange(key, qusItem)} />
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </Form>
    </div>
  )
}

const Component = Form.create()(EditHeckboxesGauge);

export default Component;