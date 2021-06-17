/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
// /* eslint-disable import/no-unresolved */
/*
 * @Author: zhangjicheng
 * @Date: 2021-03-05 10:48:51
 * @LastEditTime: 2021-05-20 11:12:19
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \wechat-revenue-g\src\pages\Questionnaire\EditPage\index.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */

// eslint-disable-next-line no-unused-vars
import React, { FC, useState, useRef, useEffect } from 'react';
import { Affix, Icon, Tabs, Button, Spin, message, Modal, DatePicker } from 'antd';
import FormRender from '@/components/QuestionForm';
import moment from 'moment';
import router from "umi/router";
import Nav from '../components/Nav';
import QuestionTabs from './components/QuestionTabs';
import QuestionBaseInfo from './components/QuestionBaseInfo';
import QuestionEditor from './components/QuestionEditor';
// import { deepClone } from './utils/utils';

import { detailForEdit, addDraft, send } from '@/services/questionnaire'


import styles from './index.less';

const { TabPane } = Tabs;

// 深拷贝方法
function deepClone<T>(source: T): T {
  if (typeof source !== 'object') return source;
  const target: any = Array.isArray(source) ? [] : {};
  // eslint-disable-next-line no-restricted-syntax
  for (const i in source) {
    if (typeof source[i] === 'object') {
      target[i] = deepClone(source[i]);
    } else {
      target[i] = source[i];
    }
  }
  return target;
}

// 格式化schema
function data2Schema(source: any): SchemaProps {
  const properties = {}
  for(const key in source){
    const item = source[key];
    const {controlType, ...others} = item;
    properties[`${controlType}_${key}`] = {
      ...others,
    }
    if (controlType === 'gauge') { // 量表题
      properties[`${controlType}_${key}`].degree = [others.enumNames[0], others.enumNames[others.enumNames.length -1]]
    }
    if (controlType === 'heckboxesGauge') { // 矩阵量表题
      const childrenProperties = others.properties;
      const keys = Object.keys(childrenProperties);
      const firstItem = childrenProperties[keys[0]];
      properties[`${controlType}_${key}`].properties = {
        questions: {
          enum: keys.map(i => i.replace(/.*_(\d+)$/, '$1')),
          enumNames: keys.map((i) => childrenProperties[i].title),
          title: "问题",
        },
        answers: {
          enum: firstItem.enum,
          degree: [firstItem.enumNames[0], firstItem.enumNames[firstItem.enumNames.length - 1]],
          title: "选项",
        }
      }
    }
    if (['matrixCheckboxes', 'matrixRadio'].includes(controlType)) {
      const childrenProperties = others.properties;
      const keys = Object.keys(childrenProperties);
      const firstItem = childrenProperties[keys[0]];
      properties[`${controlType}_${key}`].properties = {
        questions: {
          enum: keys.map(i => i.replace(/.*_(\d+)$/, '$1')),
          enumNames: keys.map((i) => childrenProperties[i].title),
          "title": "问题",
        },
        answers: {
          "enum": firstItem.enum,
          "enumNames": firstItem.enumNames,
          "title": "选项",
        }
      }
    }
  }
  return {
    type: 'object',
    properties,
  }
}

function schema2Data(schema: any, edit: boolean): any {
  const {properties: source} = schema;
  const properties = {}
  for(const key in source){
    const item = source[key];
    const {
      title,
      degree,
      // description,
      enum: enums,
      enumNames,
      required,
      type,
      properties: childrenProperties,
    } = item;
    const questionType = key.replace(/(\s*)_+.*/, '$1');

    const id = edit ? key.replace(/.*_+(\d*)/, '$1') : key;
    const uiWidget = item['ui:widget'];
    properties[id] = {
      title,
      required: !!required,
      type,
    };
    if (uiWidget) properties[id]['ui:widget'] = uiWidget;
    if (enumNames) properties[id].enumNames = enumNames;
    if (enums) properties[id].enum = enums.map(item => item.toString()); // 统计将键值存为字符串，避免类型不统一，@深税量表题型已填却选中

    if (questionType === 'gauge') { // 量表题
      properties[id].enumNames = [degree[0], ...new Array(enums.length - 2).fill(''), degree[1]];
    }
    if (questionType === 'heckboxesGauge') { // 矩阵量表题
      properties[id].properties = {};
      const { questions, answers } = childrenProperties;
      const questionEnum = questions.enum;
      for (let idx = 0; idx < questionEnum.length; idx += 1) {
        const questionKey = `gauge_${questionEnum[idx]}`;
        properties[id].properties[questionKey] = {
          controlType: "gauge",
          enum: answers.enum,
          enumNames: [answers.degree[0], ...new Array(answers.enum.length - 2).fill(''), answers.degree[1]],
          required: false,
          title: questions.enumNames[idx],
          type: "string",
          "ui:widget": "radio"
        }
      }
    }
    if (['matrixCheckboxes', 'matrixRadio'].includes(questionType)) {
      const keyprev = {matrixCheckboxes: 'checkboxes', matrixRadio: 'radio'};
      properties[id].properties = {};
      const { questions, answers } = childrenProperties;
      const questionEnum = questions.enum;
      for (let idx = 0; idx < questionEnum.length; idx += 1) {
        const questionKey = `${keyprev[questionType]}_${questionEnum[idx]}`;
        properties[id].properties[questionKey] = {
          controlType: "gauge",
          enum: answers.enum,
          enumNames: answers.enumNames,
          required: false,
          title: questions.enumNames[idx],
          type: "array",
          "ui:widget": "checkboxes"
        }
      }
    }
  }
  return {
    type: 'object',
    properties,
  }
}

const Form: FC<any> = (props): React.ReactElement => {

  const {
    location = {},
  } = props;

  const { query = {} } = location;
  const { status, jumpSource = '', shouldDisable = '' } = query;

  const statusObj = (() => {
    return {
      2: {
        label: '待审批',
        disabled: false,
      },
      5: {
        label: '已发布',
        disabled: true,
      },
    }[status] || {
      label: '',
      disabled: true,
    }
  })();

  const QuestionEditorRef = useRef(null);
  const BaseInfoRef = useRef(null);
  const [baseData, setBaseData] = useState<any>({});
  const [schema, setSchema] = useState<SchemaProps>({type: 'object', properties: {}})
  const [viewTab, setViewTab] = useState<'edit' | 'preview'>('edit');
  const [previewTab, setPreviewTab] = useState<'computer' | 'phone'>('computer');
  const [spinning, setSpinning] = useState(false);
  const [modalVisiable, setModalVisiable] = useState(false);
  const [sendTime, setSendTime] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState({dsLoading: false, draftLoading: false, sendLoading: false})

  // 防止多次点击按钮
  function btnHasBeenClicked () {
    message.destroy()
    if(loadingStatus.dsLoading) {
      message.warn('定时发送中, 请稍后')
      return true;
    } 
    if (loadingStatus.sendLoading){
      message.warn('发送中，请稍后')
      return true
    } 
    if (loadingStatus.draftLoading){
      message.warn('存入草稿中, 请稍后')
      return true
    }
    return false
  }

  // 接收选中的题型，并调用表单编辑器添加方法传入schama数据
  function onAddQuestion(item: questionSchamaProps) {
    // 新建问题
    const { schema: itemSchema, key } = item;
    const { properties } = schema;
    const copyProperties = deepClone(properties);
    setSchema({
      ...schema,
      properties: {
        ...copyProperties,
        [`${key}_${new Date().getTime()}`]: {
          ...itemSchema,
          edit: true, // 新建为编辑状态
        }
      },
    })
    setTimeout(() => {
      document.getElementById('root').scrollIntoView(false);
    }, 300);
  }

  const onBaseInfoChange = values => {
    setBaseData({...values, surveyId: baseData.surveyId || ''});
  }

  function onFormChange(values) {
    setSchema(values);
  }

  // 保存
  function saveForm(): Promise<any> {
    const jsonContent = schema2Data(schema, false);
    const {
      acceptType = '',
      description,
      handlerId,
      title,
      isApproval = 'Y', // 默认必须有审批人
      receiver = [],
      wjyxq,
      surveyId = '',
    } = baseData;
    // eslint-disable-next-line no-underscore-dangle
    const _receiver = receiver.map((item: { key: string; }) => JSON.parse(item.key));
    const qzVOList = _receiver
      .filter(item => item.isqz)
      .map(item => ({ qzid: item.key, qzmc: item.label, qztype: item.qztype || 'pt' }));
    const nsrVOList = _receiver
      .filter(item => !item.isqz)
      .map(item => ({ djxh: item.key, nsrmc: item.label, isdqy: item.isdqy || 'N' }));
    // const zrrVOList = _receiver
    //   .filter(item => !item.isqz)
    //   .map(item => ({ sfzjhm: item.key, mc: item.label, isdqy: item.isdqy || 'N' }));
    const isCustom = wjyxq.status || 'Y';
    const endTime = wjyxq.date;
    const params: any = {
      isEditContent: 'Y',
      acceptType: acceptType.join(','),
      description,
      handlerId,
      title,
      isApproval,
      qzVOList,
      nsrVOList,
      isCustom,
      endTime,
      jsonContent: jsonContent.properties,
      surveyId,
    }
    return addDraft(params)
  }

  // 保存草稿
  function saveDraft() {
    const { formSubmit: baseFormSubmit } = BaseInfoRef.current;
    if(btnHasBeenClicked()) return;
    let hide = () => {};
    setLoadingStatus({
      ...loadingStatus,
      draftLoading: true,
    })
    baseFormSubmit().then(() => {
      hide = message.loading('草稿保存中...', 0);
      return saveForm();
    }).then(res => {
      const { code, msg } = res;
      hide();
      setLoadingStatus({
        dsLoading: false, draftLoading: false, sendLoading: false
      })
      if (code !== 0) {
        message.error(msg);
      } else {
        router.goBack();
      }
    }).catch(e => {
      hide();
      // eslint-disable-next-line no-console
      console.error(e);
      if (typeof e === 'string') message.error(e);
      setLoadingStatus({
        dsLoading: false, draftLoading: false, sendLoading: false
      })
    })
  }

  // 立即发送
  function sendForm() {
    const { formSubmit: baseFormSubmit } = BaseInfoRef.current;
    if(btnHasBeenClicked()) return;
    let hide = () => {};
    setLoadingStatus({
      ...loadingStatus,
      sendLoading: true
    })
    baseFormSubmit().then(() => {
      hide = message.loading('正在发送...', 0);
      return saveForm();
    }).then(res => {
      const { code, data, msg } = res;
      if (code !== 0) {
        message.error(msg);
        return Promise.reject(msg);
      }
      return send({
        isTiming: 'N',
        surveyId: data,
      })
    }).then(res => {
      hide();
      setLoadingStatus({
        dsLoading: false, draftLoading: false, sendLoading: false
      })
      const { code, msg } = res;
      if (code !== 0) {
        message.error(msg);
      } else {
        router.goBack();
      }
    }).catch(e => {
      hide();
      // eslint-disable-next-line no-console
      console.error(e);
      if (typeof e === 'string') message.error(e);
      setLoadingStatus({
        dsLoading: false, draftLoading: false, sendLoading: false
      })
    })
  }

  // 定时发送
  function dsSend() {
    const { formSubmit: baseFormSubmit } = BaseInfoRef.current;
    if(btnHasBeenClicked()) return;
    baseFormSubmit().then(() => {
      setModalVisiable(true);
    }).catch(e => {
      // eslint-disable-next-line no-console
      console.error(e);
    })
  }

  // 发送
  function onSendTimeSubmit() {
    const hide = message.loading('正在保存表单及配置...', 0);
    setModalVisiable(false);
    if(btnHasBeenClicked()) return;
    setLoadingStatus({
      ...loadingStatus,
      dsLoading: true
    })
    saveForm().then(res => {
      const { code, msg, data } = res;
      if (code !== 0) {
        hide();
        message.error(msg);
      }
      return send({
        isTiming: 'Y',
        sendTime,
        surveyId: data,
      })
    }).then(res => {
      const { code, msg } = res;
      setLoadingStatus({
        dsLoading: false, draftLoading: false, sendLoading: false
      })
      if (code !== 0) {
        message.error(msg);
      } else {
        router.goBack();
      }
    }).catch(e => {
      // eslint-disable-next-line no-console
      console.error(e);
      if (typeof e === 'string') message.error(e);
      setLoadingStatus({
        dsLoading: false, draftLoading: false, sendLoading: false
      })
    })
  }

  function onSendTimeChange(t) {
    setSendTime(t.format('YYYY-MM-DD HH:mm'));
  }

  const toolsBtns = shouldDisable ? [
    {label: '取消', key: 'crcg', loadingName: '', onClick: () => router.goBack()},
    {label: '保存', key: 'fs', loadingName: 'draftLoading', type: "primary", onClick: saveDraft}
  ] : [
    {label: '存入草稿', key: 'crcg', loadingName: 'draftLoading', onClick: saveDraft},
    {label: '预览', key: 'yl', loadingName: '', onClick: () => setViewTab('preview')},
    {label: '定时发送', key: 'dsfs', loadingName: 'dsLoading', onClick: dsSend},
    {label: '发送', key: 'fs', loadingName: 'sendLoading', type: "primary", onClick: sendForm},
  ]
  
  // 初始化
  function initPage(): void {
    const { id } = query;
    // 若存在id则代表编辑
    if (id) {
      setSpinning(true);
      const params = {
        surveyId: id,
        isMsg: jumpSource ? 1 : '', // 代办 已办列表进入
      }
      detailForEdit(params).then((res = {}) => {
        const { code, data } = res;
        setSpinning(false);
        if (code === 0) {
          const {
            acceptType = '',
            description,
            handlerId,
            title,
            jsonContent,
            isApproval = 'Y',
            qzVOList = [],
            nsrVOList = [],
            isCustom,
            endTime,
            surveyId = '',
          } = data;
          const qzlist = qzVOList.map((item = {}) => {
            // @ts-ignore
            const { qzmc, qzid, label } = item;
            // eslint-disable-next-line no-underscore-dangle
            const _key = { key: qzid, label: qzmc, isqz: true, type: label || 'pt' };
            const key = JSON.stringify(_key);
            return { key, label: qzmc };
          });
          const nsrlist = nsrVOList.map((item = {}) => {
            // @ts-ignore
            const { djxh, nsrmc, isdqy = 'N' } = item;
            // eslint-disable-next-line no-underscore-dangle
            const _key = { key: djxh, label: nsrmc, isqz: false, isdqy: isdqy || 'N' };
            const key = JSON.stringify(_key);
            return { key, label: nsrmc };
          });
          const list = qzlist.concat(nsrlist);
          setBaseData({
            acceptType: acceptType.split(','),
            description,
            handlerId,
            isApproval,
            title,
            receiver: list,
            surveyId,
            wjyxq: {date: endTime, status: isCustom || 'N'}
          })
          setSchema(data2Schema(jsonContent))
        }
      }).catch(e => {
        // eslint-disable-next-line no-console
        console.warn(e);
      })
    } else {
      const { state = {} } = location;
      const { data } = state;
      if (data) {
        setSchema(data2Schema(data));
      }
    }
  }

  useEffect(() => {
    initPage();
  }, [])

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={styles.view}>
      <Tabs activeKey={viewTab} tabBarStyle={{display: 'none'}}>
        <TabPane tab="Tab 1" key="edit">
          <div className={styles.editPage}>
            <Nav
              toolsBtns={toolsBtns}
              tabBars={[{label: '编辑问卷', key: 'bjwj'}]}
              activeTab='bjwj'
              loadingStatus={loadingStatus}
            />
            <div className={styles.pageBody}>
              <Affix offsetTop={18}>
                <div className={styles.pageLeft}>
                  <QuestionTabs onSelect={onAddQuestion} schema={schema} />
                </div>
              </Affix>
              <div className={styles.pageRight}>
                <Spin spinning={spinning} className={styles.spin} />
                <QuestionBaseInfo
                  cRef={BaseInfoRef}
                  value={baseData}
                  shouldDisable={shouldDisable}
                  style={{ backgroundColor: '#fff', padding: 50}}
                  onChange={onBaseInfoChange}
                />
                {
                  Object.keys(schema.properties).length > 0 &&
                  <QuestionEditor 
                    cRef={QuestionEditorRef}
                    schema={schema}
                    onChange={onFormChange}
                    disabled={statusObj.disabled}
                    style={{marginTop: 18, backgroundColor: '#fff', padding: 30}}
                  />
                }
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Tab 1" key="preview">
          <div className={styles.previewPage}>
            <div className={styles.headerBar}>
              <span className={previewTab === 'computer' ? styles.active : ''} onClick={() => setPreviewTab('computer')}>
                <Icon type="desktop" style={{marginRight: 6}} />
                电脑版
              </span>
              <i className={styles.line} />
              <span className={previewTab === 'phone' ? styles.active : ''} onClick={() => setPreviewTab('phone')}>
                <Icon type="mobile" style={{marginRight: 6}} />
                手机版
              </span>
              <Button className={styles.closeBtn} type="primary" onClick={() => setViewTab('edit')}>关闭</Button>
            </div>
            <div className={styles.previewBody}>
              <Tabs activeKey={previewTab} tabBarStyle={{display: 'none'}}>
                <TabPane tab="Tab 1" key="computer">
                  <div className={styles.computerView}>
                    <p className={styles.title}>{baseData?.title}</p>
                    <p className={styles.description}>{baseData?.description}</p>
                    <FormRender schema={schema} status="preview" device="pc" style={{width: 680, margin: '0 auto'}} />
                  </div>
                </TabPane>
                <TabPane tab="Tab 1" key="phone">
                  <div className={styles.phoneView}>
                    <div className={styles.phoneScreen}>
                      <div className={styles.formHeader}>
                        <p className={styles.title}>{baseData?.title}</p>
                        <p className={styles.description}>{baseData?.description}</p>
                      </div>
                      <div className={styles.formBody}>
                        <FormRender schema={schema} status="preview" device="phone" />
                      </div>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </TabPane>
      </Tabs>
      <Modal
        title="发送时间"
        visible={modalVisiable}
        onOk={onSendTimeSubmit}
        onCancel={() => setModalVisiable(false)}
      >
        <DatePicker
          format="YYYY-MM-DD HH:mm"
          showTime
          value={sendTime ? moment(sendTime) : null}
          onChange={onSendTimeChange}
        />
      </Modal>
    </div>
  )
}

export default Form;