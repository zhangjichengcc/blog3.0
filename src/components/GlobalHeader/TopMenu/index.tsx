/*
 * @Author: zhangjicheng
 * @Date: 2020-10-02 17:34:50
 * @LastEditTime: 2020-10-10 22:09:53
 * @LastEditors: zhangjicheng
 * @Description: 头部导航
 * @FilePath: \blog3.0\src\components\GlobalHeader\TopMenu\index.tsx
 * @可以输入预定的版权声明、个性签名、空行等
 */

import React, { FC, useState } from 'react';
import styles from './index.less';


interface topMenuProps {
  routes: Array<T>;
}

const TopMenu: FC<topMenuProps> = (props) => {
  window.TopMenuProps = props;
  // const [searchVisiable, setSearchVisiable] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);

  // const callBack = () => {
  //   setLoading(false);
  //   setSearchVisiable(false);
  // };

  // const onSearch = (value: string, callBack) => {
    
  // };

  return (
    <div className={styles.base_menu}>
      
    </div>
  );
};

export default TopMenu;
