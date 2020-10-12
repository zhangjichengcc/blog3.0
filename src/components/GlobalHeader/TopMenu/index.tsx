/*
 * @Author: zhangjicheng
 * @Date: 2020-10-02 17:34:50
 * @LastEditTime: 2020-10-12 19:08:26
 * @LastEditors: zhangjicheng
 * @Description: 头部导航
 * @FilePath: \blog3.0\src\components\GlobalHeader\TopMenu\index.tsx
 * @可以输入预定的版权声明、个性签名、空行等
 */

import React, { FC, useState } from 'react';
import styles from './index.less';
import { Icon } from 'antd';
import { Link } from 'umi';

// 过滤路由，返回符合条件路由
const filterRoutes = (arr: Array<any>) => {
  const _arr: Array<any> = [];
  for (let i = 0; i < arr.length; i += 1) {
    const item = arr[i];
    if (!item.path || !item.name || item.hideMenu) continue;
    if (item.routes && item.routes.length) {
      _arr.push({...item, routes: filterRoutes(item.routes)});
    } else {
      _arr.push(item)
    }
  }
  return _arr;
}

// 生成Link
type menuLinkProps = {
  to?: string,
  children: string | React.ReactNode,
}
const MenuLink: FC<menuLinkProps> = ({
  to = '',
  children = '',
}): React.ReactElement => {
  const httpReg = new RegExp(/^https?:\/\//);
  if (!to) return <span>{children}</span>
  return httpReg.test(to) ? (
    <a href={to}>{children}</a>
  ) : (
    <Link to={to}>{children}</Link>
  )
}

// 导航item
interface menuItemProps {
  title: string | React.ReactNode;
  prefix?: string | React.ReactNode;
  url?: string;
  children?: string | React.ReactNode;
}
const MenuItem: FC<menuItemProps> = ({
  title,
  prefix = '',
  url = '',
  children = '',
}): React.ReactElement => {
  const prefixDom = (() => {
    if (prefix) {
      return <span className={styles.menu_item_prefix}>{typeof prefix === 'string' ? <Icon type={prefix} /> : prefix}</span>
    }
    return '';
  })();
  return (
    <div className={styles.menu_item}>
      <MenuLink to={url}>
        {prefixDom}
        <span>{title}</span>
        {children}
      </MenuLink>
    </div>
  )
}

// 二级导航
interface childrenMenuProps {
  routes: Array<any>;
}
const ChildrenMenu: FC<childrenMenuProps> = ({
  routes = [],
}): React.ReactElement => {
  return <div>
    {
      routes.map((item, idx) => (
        <MenuItem
          title={item.name}
          prefix={item.icon}
          url={item.path}
        />
      ))
    }
  </div>
}

// 路由导航
interface routeMenuProps {
  routes: Array<any>;
}
const RouteMenu: FC<routeMenuProps> = ({
  routes = [],
}): React.ReactElement => {
  const router = filterRoutes(routes);
  return (
    <>{
      router.map((item, idx) => (
        <MenuItem
          title={item.name}
          prefix={item.icon}
          url={item.path}
          // children={<ChildrenMenu routes={item.routes} />}
        />
      ))
    }</>
  )
}


interface topMenuProps {
  route: any;
  thatRoute: Object;
}
const TopMenu: FC<topMenuProps> = ({
  route,
}) => {
  const { routes = [] } = route;
  return (
    <div className={styles.base_menu}>
      <RouteMenu routes={routes} />
    </div>
  );
};

export default TopMenu;
