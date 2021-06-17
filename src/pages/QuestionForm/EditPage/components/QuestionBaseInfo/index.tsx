/* eslint-disable no-unused-vars */
/*
 * @Author: zhangjicheng
 * @Date: 2021-03-08 14:39:00
 * @LastEditTime: 2021-05-26 16:37:42
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \wechat-revenue-g\src\pages\Questionnaire\EditPage\components\QuestionBaseInfo\index.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */

import React, { FC, useState, useEffect, useImperativeHandle } from 'react';
import { Form, Input, Checkbox, Select, Radio, DatePicker, message, Drawer } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { FormComponentProps } from 'antd/lib/form/Form';
import { getApproverList } from '@/services/announcement';
import TaxPayerSelect from '@/pages/Announcement/components/TaxPayerSelect';
import ConnectBar from '@/pages/Announcement/ConnectBar';
import { judgeAuthority } from '@/utils/authority';
import moment, { Moment } from 'moment';

import styles from './index.less';

const jsrsflxOptions = [
  { label: '法定代表人', value: '2' },
  { label: '财务负责人', value: '3' },
  { label: '办税员', value: '1' },
  { label: '购票员', value: '6' },
];

const isDisApprovalCol = judgeAuthority(['grade1', 'grade3']);

type wjyxqProps = {
  value?: { status: 'Y' | 'N', date: Moment };
  onChange?: (value: { status: 'Y' | 'N', date: Moment }) => void;
  disabled?: boolean;
}

const Wjyxq: FC<wjyxqProps> = ({
  value = { status: 'N', date: null },
  onChange,
  disabled = false,
}) => {
  const { status = 'N', date } = value;
  // 结束时间类型改变
  const onWjyxqLxChange = (e: RadioChangeEvent) => {
    const { target: { value: eValue } } = e;
    const resDate = eValue === 'N' ? null : date;
    onChange({ date: resDate, status: eValue })
  }

  // 结束时间值改变
  const onWjyxqDateChange = (d) => {
    // @ts-ignore
    onChange({ ...value, date: d.format('YYYY-MM-DD HH:mm:ss')})
  }

  const dataValue = date ? moment(date) : null;

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <div>
        <span>开始时间：</span>
        <span>审批通过后，立即生效</span>
      </div>
      <div>
        <span>结束时间：</span>
        <Radio.Group disabled={disabled} onChange={onWjyxqLxChange} value={status}>
          <Radio value="N">永久有效</Radio>
          <Radio value="Y">
            自定义
            <DatePicker style={{ marginLeft: 10 }} format="YYYY-MM-DD HH:mm" showTime value={dataValue} disabled={status === 'N'} onChange={onWjyxqDateChange} />
          </Radio>
        </Radio.Group>
      </div>
    </div>
  )
}

type jsrComProps = {
  onChange?: (e) => void,
  onHandleClick?: (key: boolean) => void,
  showBar?: boolean,
  value?: any,
  disabled?: boolean,
  type?: string,
}
const JsrCom: FC<jsrComProps> = ((props = {}) => {
  const {
    onChange,
    onHandleClick,
    showBar = false,
    value,
    disabled = false,
    type,
  } = props;
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <TaxPayerSelect
      // kqBtn={kqBtn()}
        value={value}
        onChange={onChange}
        type={type}
        disabled={disabled}
      // onKqChange={this.setKqKey}
      />
      <span style={{ width: 100, fontSize: 13, paddingLeft: 36, cursor: 'pointer' }} onClick={() => onHandleClick(!showBar)}>{showBar ? '收起群组' : '展开群组'}</span>
    </div>
  )
})

type ApprovalProps = {
  onChange?: (e) => void,
  value?: 'Y' | 'N',
  disabled?: boolean,
}
const Approval: FC<ApprovalProps> = ((props) => {
  const { onChange, value, disabled = false } = props;

  function onHandleChange(e) {
    const { checked } = e.target;
    onChange(checked ? 'N' : 'Y');
  }

  const checked = {Y: false, N: true}[value];

  return (
    <Checkbox
      style={{ paddingLeft: 12 }}
      disabled={disabled}
      onChange={onHandleChange}
      checked={checked}
    >
      无需审批
    </Checkbox>
  )
})

type QuestionBaseInfoProps = {
  form: any,
  value: any,
  style: object,
  disabled?: boolean;
  onChange(values: object): void,
  cRef?: React.RefObject<any>,
  shouldDisable?: boolean;
}
const QuestionBaseInfo: FC<QuestionBaseInfoProps & FormComponentProps> = ({
  form,
  value,
  style,
  disabled = false,
  onChange,
  cRef,
  shouldDisable = false,
}): React.ReactElement => {

  const [approverList, setApproverList] = useState([]);
  const [drawerVisiable, setDrawerVisiable] = useState(false);
  const { getFieldDecorator, getFieldsValue } = form;

  const isApproval = form.getFieldValue('isApproval');
  
  function initPage(): void {
    form.setFieldsValue({
      ...value,
    })
    if(!shouldDisable && judgeAuthority(['grade3'])) {
      form.setFieldsValue({isApproval: 'N'})
    }
    if(!shouldDisable && judgeAuthority(['grade1'])) {
      form.setFieldsValue({isApproval: 'Y'})
    }
  }

  function onFormChange(): void {
    const values = getFieldsValue();
    onChange(values);
  }

  // 获取审批人员列表
  function obtainApproverList() {
    getApproverList()
      .then((res = {}) => {
        const { code, data = [] } = res;
        if (code === 0) {
          setApproverList(data);
        } else {
          message.error('获取审批人列表失败');
        }
      })
      .catch(() => {
        message.error('获取审批人列表失败');
      });
  };

  // 从侧边栏选择纳税人/群组
  function selectNsr(obj) {
    const yxNsrList = form.getFieldValue('receiver') || [];
    const checked = !yxNsrList.map(item => item.key).includes(obj.key);
    const newList = checked ? [...yxNsrList, obj] : yxNsrList.filter(item => item.key !== obj.key);
    form.setFieldsValue({ receiver: newList });
    onFormChange();
  };

  // 选择审批人
  function selectSpr(e) {
    form.setFieldsValue({ handlerId: e });
    onFormChange();
  }

  // 监听是否需要审批
  function setApproval(e) {
    form.setFieldsValue({ isApproval: e, handlerId: undefined });
  }

  // 选择接收人
  function inputNsr(e) {
    form.setFieldsValue({ receiver: e });
    onFormChange();
  }

  // 选择审批时间
  function selectSpsj(e) {
    form.setFieldsValue({ wjyxq: e });
    onFormChange();
  }

  useEffect(() => {
    initPage();
  }, [value])
  
  useEffect(() => {
    obtainApproverList();
    // global.base = form;
  }, [])

  useImperativeHandle(cRef, () => ({
    formSubmit: () => new Promise((resolve, reject) => {
      form.validateFields((err, values) => {
        if (!err) {
          resolve(values);
        } else {
          console.error(err);
          reject('请完善表单基本信息！');
        }
      });
    }) 
  }))


  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={styles.view} style={style}>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={() => setDrawerVisiable(false)}
        visible={drawerVisiable}
        getContainer={false}
        style={{ position: 'absolute'}}
        drawerStyle={{backgroundColor: '#f0f4f9'}}
        bodyStyle={{padding: 0}}
        headerStyle={{display: 'none'}}
      >
        <ConnectBar
          selected={form.getFieldValue('receiver')}
          onSelect={selectNsr}
        />
      </Drawer>
      <Form onChange={onFormChange} labelCol={{ xs: { span: 24 }, sm: { span: 4 } }} wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}>
        <Form.Item label="接收人">
          {getFieldDecorator('receiver', {
            rules: [{ required: true, message: '请输入接收人' }],
          })(
            <JsrCom
              onChange={inputNsr}
              showBar={drawerVisiable}
              onHandleClick={(key) => setDrawerVisiable(key)}
            />
          )}
        </Form.Item>
        <Form.Item label="接收人身份类型">
          {getFieldDecorator('acceptType', {
            rules: [{ required: true, message: '请选择接收人身份类型' }],
          })(<Checkbox.Group disabled={disabled} options={jsrsflxOptions} />)}
        </Form.Item>
        {/* <Form.Item label="选择审批人">
          {getFieldDecorator('handlerId', {
            rules: [{ required: true, message: '请选择审批人' }],
          })(
            <Select
              showSearch
              placeholder="请选择"
              disabled={disabled}
              onChange={selectSpr}
            >
              {approverList.map(item => (
                <Select.Option value={item.userId} key={item.userId}>
                  {item.userName} / {item.userId}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item> */}
        <Form.Item label="选择审批人" required={isApproval === 'Y'}>
          {getFieldDecorator('handlerId', {
            rules: [{ required: isApproval === 'Y', message: '请选择审批人' }],
          })(
            <Select
              style={{ width: 200 }}
              showSearch
              placeholder="请选择"
              disabled={isApproval === 'N' || shouldDisable}
              onChange={selectSpr}
            >
              {approverList.map(item => (
                <Select.Option value={item.userId} key={item.userId}>
                  {item.userName} / {item.userId}
                </Select.Option>
              ))}
            </Select>
          )}
          {getFieldDecorator('isApproval', {
            initialValue: 'Y',
          })(
            <Approval
              disabled={isDisApprovalCol || shouldDisable}
              onChange={setApproval}
            />
          )}
        </Form.Item>
        <i className={styles.line} />
        <Form.Item label="问卷标题">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入问卷标题', whitespace: true }],
          })(<Input disabled={disabled} placeholder="请输入问卷标题" />)}
        </Form.Item>
        <Form.Item label="问卷描述">
          {getFieldDecorator('description', {
            rules: [{ required: true, message: '请输入问卷调查描述', whitespace: true }],
          })(<Input.TextArea disabled={disabled} rows={4} placeholder="请输入问卷调查描述" />)}
        </Form.Item>
        <Form.Item label="问卷有效期">
          {getFieldDecorator('wjyxq', {
            initialValue: {status: 'N', date: null},
            rules: [{ required: true }, {
              validator: (_rule, val, callback) => {
                if (val.status === 'Y' && !val.date) {
                  callback('请选择自定义时间!');
                } else if (val.status === 'Y' && moment(value.data).isBefore(moment(new Date()))) {
                  callback('日期不能早于当前时间！');
                } else {
                  callback();
                }
              }
            }],
          })(<Wjyxq disabled={disabled} onChange={selectSpsj} />)}
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create<QuestionBaseInfoProps>()(QuestionBaseInfo);
