/*
 * @Author: zhangjicheng
 * @Date: 2020-10-02 17:34:50
 * @LastEditTime: 2020-10-04 18:05:07
 * @LastEditors: zhangjicheng
 * @Description: 头部导航
 * @FilePath: \blog3.0\src\components\GlobalHeader\index.tsx
 * @可以输入预定的版权声明、个性签名、空行等
 */

import React, { FC, useState } from 'react';
import Link from 'umi/link';
import RightTools from './RightTools';
import TopMenu from './TopMenu';
import logo from '@/assets/logo.png';
import styles from './index.less';


type logoProps = {
  src: string;
  pathname?: string;
  style?: object;
}
const Logo: FC<logoProps> = ({
  src,
  pathname = '/',
  style = {},
}) => {
  return (
    <Link to={pathname} className={styles.logo} key="logo">
      <img src={src} alt="logo" style={style} />
    </Link>
  )
}


interface headerSearchProps {
  onSearch: (value: string, callBack: () => void) => void;
}

const GlobalHeader: FC<headerSearchProps> = ({ onSearch }) => {
  // const [searchVisiable, setSearchVisiable] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);

  // const callBack = () => {
  //   setLoading(false);
  //   setSearchVisiable(false);
  // };

  // const search = (value: string) => {
  //   setLoading(true);
  //   onSearch(value, callBack);
  // };

  return (
    <div className={styles.global_header}>
      <Logo src={logo} style={{height: '80%'}} />
      <TopMenu />
      <RightTools />
    </div>
  );
};

export default GlobalHeader;
