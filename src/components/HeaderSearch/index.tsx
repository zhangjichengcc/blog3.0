/*
 * @Author: zhangjicheng
 * @Date: 2020-10-02 17:34:50
 * @LastEditTime: 2020-11-03 20:19:53
 * @LastEditors: zhangjicheng
 * @Description: 头部搜索框
 * @FilePath: \blog3.0\src\components\HeaderSearch\index.tsx
 * @可以输入预定的版权声明、个性签名、空行等
 */

import React, { FC, useState, useRef } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import classnames from "classnames";
import styles from "./index.less";

const { Search } = Input;

interface headerSearchProps {
  onSearch: (value: string, callBack: () => void) => void;
  style?: object;
}

const HeaderSearch: FC<headerSearchProps> = ({ onSearch, style = {} }) => {
  const [searchVisiable, setSearchVisiable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const searchRef = useRef<any>(null);

  // 搜索完成后调用，终止loading状态
  const callBack = () => {
    setLoading(false);
    setSearchVisiable(false);
  };

  // 触发搜索
  const handleSearch = (value: string) => {
    setLoading(true);
    onSearch(value, callBack);
  };

  // 展开搜索输入框
  const openSearchInput = () => {
    const { current } = searchRef;
    setSearchVisiable(true);
    current?.focus();
  };

  return (
    <div
      className={classnames(
        styles.headerSearch,
        searchVisiable ? styles.active : ""
      )}
      style={style}
    >
      <span className={styles.searchText} onClick={openSearchInput}>
        <SearchOutlined style={{ paddingRight: 6, fontSize: 20 }} />
        <span>SEARCH</span>
      </span>
      <Search
        className={styles.searchBar}
        placeholder="input artical title"
        onSearch={handleSearch}
        loading={loading}
        ref={searchRef}
        onBlur={() => setSearchVisiable(false)}
      />
    </div>
  );
};

export default HeaderSearch;
