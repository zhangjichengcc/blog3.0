/*
 * @Author: zhangjicheng
 * @Date: 2020-10-02 17:34:50
 * @LastEditTime: 2020-10-04 16:49:32
 * @LastEditors: zhangjicheng
 * @Description: 头部搜索框
 * @FilePath: \blog3.0\src\components\HeaderSearch\index.tsx
 * @可以输入预定的版权声明、个性签名、空行等
 */

import React, { FC, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import styles from './index.less';

const { Search } = Input;

interface headerSearchProps {
  onSearch: (value: string, callBack: () => void) => void;
  style?: object;
}

const HeaderSearch: FC<headerSearchProps> = ({ 
  onSearch,
  style = {}
}) => {
  const [searchVisiable, setSearchVisiable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const callBack = () => {
    setLoading(false);
    setSearchVisiable(false);
  };

  const search = (value: string) => {
    setLoading(true);
    onSearch(value, callBack);
  };

  return (
    <div className={classnames(styles.headerSearch, searchVisiable ? styles.active : '')} style={style}>
      <span className={styles.searchText} onClick={() => setSearchVisiable(true)}>
        <SearchOutlined style={{ paddingRight: 6, fontSize: 20 }} />
        <span>搜索</span>
      </span>
      <Search
        className={styles.searchBar}
        placeholder="请输入文章标题"
        onSearch={search}
        loading={loading}
      />
    </div>
  );
};

export default HeaderSearch;
