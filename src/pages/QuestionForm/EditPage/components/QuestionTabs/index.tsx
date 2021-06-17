/* eslint-disable import/no-unresolved */
/*
 * @Author: zhangjicheng
 * @Date: 2021-03-08 14:39:00
 * @LastEditTime: 2021-05-21 11:36:40
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \wechat-revenue-g\src\pages\Questionnaire\EditPage\components\QuestionTabs\index.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */

// eslint-disable-next-line no-unused-vars
import React, { FC, useState, useEffect } from 'react';
import { Tabs } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import classnames from 'classnames';
import { QuestionList, questionSchema, scrollTo } from '@/components/QuestionForm';
// import QuestionList from './components/QuestionList';
// import questionList from '../../questionSchama';

import styles from './index.less';

const { TabPane } = Tabs;

const QuestionTabs: FC<any> = ({
  onSelect,
  schema = {},
}): React.ReactElement => {

  const [key, setKey] = useState<string>('1');

  const questionArr = (() => {
    const { properties = {} } = schema;
    const arr = Object.keys(properties).map(i => ({
      key: i,
      icon: questionSchema.filter(item => i.includes(item.key))?.[0]?.icon,
      ...properties[i],
    }));
    return arr;
  })()

  function onQuestionSelect(item) {
    if(typeof onSelect === 'function') onSelect(item);
  }

  function onHandleClick(item) {
    const { key: id } = item;
    scrollTo(id);
  }

  useEffect(() => {
  }, [])

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={styles.view}>
      <div className={styles.tabs}>
        <span className={classnames(key === '1' ? styles.active : '')} onClick={() => setKey('1')}>题型选择</span>
        <span className={classnames(key === '2' ? styles.active : '')} onClick={() => setKey('2')}>问卷大纲</span>
      </div>
      <Tabs tabBarStyle={{display: 'none'}} activeKey={key}>
        <TabPane tab="题型选择" key="1">
          <QuestionList list={questionSchema} onSelect={onQuestionSelect} />
        </TabPane>
        <TabPane tab="问卷大纲" key="2">
          <div className={styles.wjdg}>
            <ul>
              {
                questionArr.map(i => (
                  <li onClick={() => onHandleClick(i)}>
                    <span>
                      <img alt={i.title} style={{paddingRight: 4}} src={i.icon} />
                      <Ellipsis lines={1} tooltip={i.title}>{i.title}</Ellipsis>
                    </span>
                  </li>
                ))
              }
            </ul>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default QuestionTabs;