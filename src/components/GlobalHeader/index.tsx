/*
 * @Author: zhangjicheng
 * @Date: 2020-10-02 17:34:50
 * @LastEditTime: 2020-10-31 02:53:01
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
      <img className={styles.logo_img} src={src} alt="logo" style={style} />
    </Link>
  )
}


interface globalHeaderProps {
  onSearch: (value: string, callBack: () => void) => void;
  route: Object;
  thatRoute: Object;
}

const GlobalHeader: FC<globalHeaderProps> = (props) => {
  const {
    route,
    thatRoute,
  } = props;
  return (
    <div className={styles.global_header}>
      <Logo src={logo} style={{height: '80%'}} />
      <TopMenu
        route={route}
        thatRoute={thatRoute}
      />
      <RightTools />
    </div>
  );
};

export default GlobalHeader;
