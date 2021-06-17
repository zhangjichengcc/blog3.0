/*
 * @Author: zhangjicheng
 * @Date: 2021-03-09 11:32:49
 * @LastEditTime: 2021-05-21 15:01:58
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \wechat-revenue-g\src\components\QuestionForm\QuestionList\index.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */
// eslint-disable-next-line no-unused-vars
import React, { FC } from 'react';
import { Select } from 'antd';

import styles from './index.less';

const { Option } = Select;

interface questionListProps {
  list?: Array<questionSchamaProps>;
  onSelect?: (item: questionSchamaProps) => void;
}

const QuestionList: FC<questionListProps> = ({
  list = [],
  onSelect,
}): React.ReactElement => {

  // eslint-disable-next-line no-unused-vars
  function onHandleFocus() {
    document.body.setAttribute('style', 'overflow: hidden;');
  }

  function onHandleBlur() {
    document.body.removeAttribute('style');
  }

  const handleChange = (item: questionSchamaProps) => {
    if (typeof onSelect === 'function') onSelect(item);
  }

  const handleMoreQsChange = (key: string) => {
    const [item] = list.filter(v => v.key === key);
    handleChange(item);
    onHandleBlur();
  }

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={styles.view}>
      <ul>
        {
          list.slice(0, 7).map(item => (
            <li key={item.key} onClick={() => handleChange(item)}>
              {item.icon && <img alt={item.label} style={{paddingRight: 4}} src={item.icon} />}
              <span>{item.label}</span>
            </li>
          ))
        }
      </ul>
      <div className={styles.allList} id="moreQestions">
        <span>更多</span>
        {/* <Select placeholder="更多题型" style={{ width: 120 }} onDropdownVisibleChange={onHandleFocus} onBlur={onHandleBlur} onChange={handleMoreQsChange}> */}
        <Select placeholder="更多题型" style={{ width: 120 }} onChange={handleMoreQsChange} getPopupContainer={() =>document.getElementById('moreQestions')}>
          {
            list.map(item => (
              <Option key={item.key} value={item.key} style={{paddingLeft: '10px'}}>{item.label}</Option>
            ))
          }
        </Select>
      </div>
    </div>
  )
}

export default QuestionList;