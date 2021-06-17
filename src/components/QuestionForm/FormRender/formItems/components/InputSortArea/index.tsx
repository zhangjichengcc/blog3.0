/* eslint-disable no-unused-vars */
/*
 * @Author: zhangjicheng
 * @Date: 2021-03-15 18:50:12
 * @LastEditTime: 2021-04-12 11:39:18
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \wechat-revenue-g\src\components\QuestionForm\FormRender\formItems\components\InputSortArea\index.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */

import React, { FC } from 'react';
import { Input, Icon, Button } from 'antd';
import classnames from 'classnames';
import { ReactSortable } from "react-sortablejs";

import styles from './index.less';

interface itemListItemProp {
  id: number | string;
  value: string;
}

interface InputSortAreaProp {
  value?: itemListItemProp[];
  onChange?: (value: itemListItemProp[]) => void;
  style?: any;
  className?: any;
}

const InputSortArea: FC<InputSortAreaProp> = ({
  value: itemList = [],
  onChange: setItemList,
  style,
  className,
}) => {

  // 编辑选项
  function onItemChange(e: React.ChangeEvent<HTMLInputElement>, item: any) {
    const { value: targetValue } = e.target;
    const newItem = {...item, value: targetValue};
    setItemList(itemList.map(it => it.id === item.id ? newItem : it));
  }

  // 添加选项
  function onAddItem() {
    const keys = itemList.map(it => +it.id);
    const maxid = keys.length ? Math.max(...keys) : 0;
    setItemList([...itemList, {id: 1 + maxid, value: ''}]);
  }

  // 删除选项
  function onDeleteItem(item: itemListItemProp) {
    const newList = itemList.filter(it => it.id !== item.id);
    setItemList(newList);
  }

  return (
    <div className={classnames(styles.inputSortArea, className)} style={style}>
      <ReactSortable
        animation={150}
        handle=".sort-handle"
        list={itemList}
        setList={setItemList}
      >
        {
          itemList.map(item => (
            <div className={styles.inputSortItem} key={item.id}>
              <span className="sort-handle"><Icon className={styles.handleListIcon} type="unordered-list" /></span>
              <Input placeholder="请输入选项名称" value={item.value} onChange={e => onItemChange(e, item)} style={{width: 400}} />
              {itemList.length > 1 && <Icon className={styles.closeIcon} onClick={() => onDeleteItem(item)} type="close" />}
            </div>
          ))
        }
      </ReactSortable>
      <Button type="dashed" style={{width: 400, marginLeft: 32, marginTop: 12}} onClick={onAddItem}>新建选项</Button>
    </div>
  )
}

export default InputSortArea;