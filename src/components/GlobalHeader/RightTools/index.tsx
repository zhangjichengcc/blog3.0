/*
 * @Author: zhangjicheng
 * @Date: 2020-10-02 17:34:50
 * @LastEditTime: 2020-11-06 20:36:55
 * @LastEditors: zhangjicheng
 * @Description: 头部导航
 * @FilePath: \blog3.0\src\components\GlobalHeader\RightTools\index.tsx
 * @可以输入预定的版权声明、个性签名、空行等
 */

import React, { FC, useState } from 'react';
import HeaderSearch from '@/components/HeaderSearch';
// import SelectLang from '@/components/SelectLang';
import AvatarDropdown from '../AvatarDropdown';
import styles from './index.less';

interface headerSearchProps {
  onSearch: (value: string, callBack: () => void) => void;
}

const GlobalHeader: FC<headerSearchProps> = () => {
  // const [searchVisiable, setSearchVisiable] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);

  // const callBack = () => {
  //   setLoading(false);
  //   setSearchVisiable(false);
  // };

  const onSearch = (value: string, callBack) => {};

  return (
    <div className={styles.right_tools}>
      <HeaderSearch onSearch={onSearch} />
      <AvatarDropdown />
      {/* <SelectLang /> */}
    </div>
  );
};

export default GlobalHeader;
