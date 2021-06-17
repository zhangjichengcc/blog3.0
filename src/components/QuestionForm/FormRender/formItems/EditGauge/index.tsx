/* 处理for in循环 */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

/* eslint-disable import/no-unresolved */
/*
 * @Author: zhangjicheng
 * @Date: 2021-03-09 16:03:05
 * @LastEditTime: 2021-05-21 14:44:21
 * @LastEditors: zhangjicheng
 * @Description: 二次封装单行输入框
 * @FilePath: \wechat-revenue-g\src\components\QuestionForm\FormRender\formItems\EditGauge\index.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */
// eslint-disable-next-line no-unused-vars
import React, { FC, useState, useEffect } from 'react';
import { Input, Radio, Button, Modal, Form, Icon, Select } from 'antd';
import classnames from 'classnames';
import DegreeArea from '../components/DegreeArea';
import InputNumber from '../components/InputNumber';
import StarRadioGroup from '../components/StarRadioGroup';


import styles from './index.less';

const { confirm } = Modal;
const { Option } = Select;

interface editGaugeProps {
  value: any;
  name?: string;
  status: 'edit' | 'write' | 'preview';
  device: 'phone' | 'pc';
  onChange: (value: any) => void;
  disabled?: boolean;
  schema: propertiesItemProps;
  onSave(schemaItem: propertiesItemProps): void;
  onDelete: (schemaItem: propertiesItemProps) => void;
  [key: string]: any;
}

const EditGauge: FC<editGaugeProps> = ({
  value,
  name,
  status,
  device = 'pc',
  onChange,
  disabled = false,
  schema,
  onSave,
  onDelete,
  form,
}): React.ReactElement => {

  type OptionsProps = {
    value: string,
    label: string,
    degree: string[],
    enum: (string | number)[],
  }

  const [gaugeType, setGaugeType] = useState('custom');
  const [options, setOptions] = useState<Array<OptionsProps>>([{value: 'custom', label: '自定义', degree: ['起始值', '结束值'], enum: ['1', '2', '3', '4', '5']}]);

  const { getFieldDecorator, validateFields } = form;
  const { edit, title, enum: enums = ['1', '2', '3', '4', '5'], degree, required = 1, description = '' } = schema;

  // const defautOption = [
  //   {value: 'myd', label: '满意度', degree: ['非常不满意', '非常满意']},
  //   {value: 'rtd', label: '认同度', degree: ['非常不认同', '非常认同']},
  //   {value: 'zyd', label: '重要度', degree: ['非常不重要', '非常重要']},
  //   {value: 'custom', label: '自定义', degree: degree || ['起始值', '结束值']},
  // ]

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
    if(typeof onChange === 'function') {
      onChange(params);
    }
  }

  // 量表类型改变触发
  // useEffect(() => {
  //   if(gaugeType === 'custom') return;
  //   const current = defautOption.filter(i => i.value === gaugeType)[0];
  //   debugger
  //   form.setFieldsValue({
  //     title,
  //     degree: current.degree,
  //     enum: 5,
  //     required: {false: 0, true: 1}[`${required}`] || 1,
  //     description,
  //   })
  // }, [gaugeType])

  /**
   * edit 初始化及值变化, 量表类型改变触发
   */
  useEffect(() => {
    // 当切换到editTab且状态为编辑时才写入值，否则无对应dom写入
    if(status === 'edit' && edit) {
      const current = options.filter(i => i.value === gaugeType)[0];
      form.setFieldsValue({
        title,
        // degree: gaugeType === 'custom' ? degree : current.degree,
        // enum: gaugeType === 'custom' ? enums : ["1", "2", "3", "4", "5"],
        degree: current.degree,
        enum: current.enum,
        required,
        description,
      })
    }
  }, [edit, gaugeType, options])

  useEffect(() => {
    const defaultOptions = [
      {value: 'myd', label: '满意度', degree: ['非常不满意', '非常满意'], enum: enums || ['1', '2', '3', '4', '5']},
      {value: 'rtd', label: '认同度', degree: ['非常不认同', '非常认同'], enum: enums || ['1', '2', '3', '4', '5']},
      {value: 'zyd', label: '重要度', degree: ['非常不重要', '非常重要'], enum: enums || ['1', '2', '3', '4', '5']},
      {value: 'custom', label: '自定义', degree: degree || ['起始值', '结束值'], enum: enums || ['1', '2', '3', '4', '5']},
    ]
    setOptions(defaultOptions);
    // 判断当前类型，默认custom
    const item = defaultOptions.filter(i => i.degree[0] === degree[0] && i.degree[1] === degree[1])[0] || {value: 'custom'};
    setGaugeType(item.value);
  }, [])

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={classnames(styles.view, styles[device])}>
      <Form
        labelCol={{xs: {span: 24}, sm: {span: 4}}}
        wrapperCol={{xs: {span: 24}, sm: {span: 20}}}
        // onChange={onFormChange}
      >
        { status === 'edit' &&
          <div className={styles.editRadioView}>
            { edit ?
              // 题目编辑器 
              <div className={styles.editForm}>
                <Form.Item label="题目">
                  {getFieldDecorator('title', {
                    rules: [
                      {
                        required: true,
                        message: '请输入题目',
                      },
                    ],
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
                    rules: [
                      {
                        required: true,
                        message: '请输入题目',
                      },
                    ],
                  })(
                    <Radio.Group>
                      <Radio value>是</Radio>
                      <Radio value={false}>否</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
                <Form.Item label="量表类型" required>
                  <Select onChange={setGaugeType} value={gaugeType}>
                    {
                      options.map(item => (
                        <Option value={item.value}>{item.label}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
                <div className={classnames(styles.customBar, gaugeType === 'custom' ? styles.active : '')}>
                  <Form.Item label="程度">
                    {getFieldDecorator('degree', {
                      rules: [
                        {
                          validator: (_rule, val, callback) => {
                            if (!val || !val[0]) {
                              callback('请输入起始值！');
                            } else if (!val[1]) {
                              callback('请输入结束值！');
                            } else {
                              callback();
                            }
                          }
                        },
                      ],
                    })(
                      <DegreeArea />
                    )}
                  </Form.Item>
                  <Form.Item label="量表范围">
                    {getFieldDecorator('enum', {
                      rules: [{
                        required: true,
                        message: '请输入量表范围',
                      }],
                    })(
                      <InputNumber max={10} min={1} />
                    )}
                  </Form.Item>
                </div>
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
                    {schema.required && <i className={styles.requiredIcon}>*</i>}
                    <span>{title}:</span>
                  </span>
                  {(description && description.length) && <span className={styles.description}><Icon type="info-circle" style={{paddingRight: 5, fontSize: 14}} />{description}</span>}
                  <div className={styles.questionBody}>
                    <StarRadioGroup data={enums} label={degree} />
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
                  {schema.required && <i className={styles.requiredIcon}>*</i>}
                  <span>{title}:</span>
                </span>
                {(description && description.length) && <span className={styles.description}><Icon type="info-circle" style={{paddingRight: 5, fontSize: 14}} />{description}</span>}
                <div className={styles.questionBody}>
                  <StarRadioGroup data={enums} label={degree} value={value} disabled={disabled} onChange={onHandleChange} />
                </div>
              </div>
            </div>
          </div>
        }
      </Form>
    </div>
  )
}

const Component = Form.create()(EditGauge);

export default Component;