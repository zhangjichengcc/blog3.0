/*
 * @Author: zhangjicheng
 * @Date: 2020-10-02 17:34:50
 * @LastEditTime: 2020-11-05 18:02:39
 * @LastEditors: zhangjicheng
 * @Description: 头部导航
 * @FilePath: \blog3.0\src\components\GlobalHeader\TopMenu\index.tsx
 * @可以输入预定的版权声明、个性签名、空行等
 */

import React, { FC } from "react";
import classname from "classnames";
import styles from "./index.less";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Link } from "umi";

// 过滤路由，返回符合条件路由
const filterRoutes = (arr: Array<any>) => {
  const _arr: Array<any> = [];
  for (let i = 0; i < arr.length; i += 1) {
    const item = arr[i];
    if (!item.path || !item.name || item.hideMenu) continue;
    if (item.routes && item.routes.length) {
      _arr.push({ ...item, routes: filterRoutes(item.routes) });
    } else {
      _arr.push(item);
    }
  }
  return _arr;
};

// 生成Link
type menuLinkProps = {
  to?: string;
  children: string | React.ReactNode;
};
const MenuLink: FC<menuLinkProps> = ({
  to = "",
  children = ""
}): React.ReactElement => {
  const httpReg = new RegExp(/^https?:\/\//);
  if (!to) return <span>{children}</span>;
  return httpReg.test(to) ? (
    <a href={to}>{children}</a>
  ) : (
    <Link to={to}>{children}</Link>
  );
};

// 导航item
interface menuItemProps {
  title: string | React.ReactNode;
  prefix?: string | React.ReactNode;
  url?: string;
  children?: string | React.ReactNode;
  active?: boolean;
}
const MenuItem: FC<menuItemProps> = ({
  title,
  prefix = "",
  url = "",
  children = "",
  active
}): React.ReactElement => {
  const prefixDom = (() => {
    if (prefix) {
      return (
        <span className={styles.menu_item_prefix}>
          {typeof prefix === "string" ? <LegacyIcon type={prefix} /> : prefix}
        </span>
      );
    }
    return "";
  })();
  return (
    <div className={classname(styles.menu_item, active ? styles.active : "")}>
      <MenuLink to={url}>
        {prefixDom}
        <span>{title}</span>
      </MenuLink>
      {children}
    </div>
  );
};

// 导航item direction
const MenuColItem: FC<menuItemProps> = ({
  title,
  prefix = "",
  url = "",
  children = ""
}): React.ReactElement => {
  const prefixDom = (() => {
    if (prefix) {
      return (
        <span className={styles.menu_item_prefix}>
          {typeof prefix === "string" ? <LegacyIcon type={prefix} /> : prefix}
        </span>
      );
    }
    return "";
  })();
  return (
    <div className={styles.menu_item}>
      <MenuLink to={url}>
        {prefixDom}
        <span>{title}</span>
      </MenuLink>
      {children}
    </div>
  );
};

// 二级导航
interface childrenMenuProps {
  routes: Array<any>;
}

const ChildrenMenu: FC<childrenMenuProps> = ({
  routes = []
}): React.ReactElement => {
  return (
    <div>
      {routes.map((item, idx) => (
        <MenuItem
          key={`menuItem_key_${idx + 1}`}
          title={item.name}
          prefix={item.icon}
          url={item.path}
        />
      ))}
    </div>
  );
};

// 路由导航
interface routeMenuProps {
  routes: Array<any>;
}
const RouteMenu: FC<routeMenuProps> = ({ routes = [] }): React.ReactElement => {
  const { pathname } = globalThis.location;
  const router = filterRoutes(routes);
  return (
    <>
      {router.map((item: any, idx: number) => {
        const { name, icon, path } = item;
        const pathReg = new RegExp(`^${path.replace(/\//g, "\\/")}\\/?`);
        const active =
          path === "/" ? path === pathname : pathReg.test(pathname);
        console.log(active);
        return (
          <MenuItem
            key={`menu_key_${idx + 1}`}
            active={active}
            title={name}
            prefix={icon}
            url={path}
            // children={<ChildrenMenu routes={item.routes} />}
          />
        );
      })}
    </>
  );
};

interface topMenuProps {
  route: any;
  thatRoute: Record<string, unknown>;
}
const TopMenu: FC<topMenuProps> = ({ route }) => {
  const { routes = [] } = route;
  return (
    <div className={styles.base_menu}>
      <RouteMenu routes={routes} />
    </div>
  );
};

export default TopMenu;
