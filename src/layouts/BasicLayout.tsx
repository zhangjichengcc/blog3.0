import React, { FC } from "react";
import GlobalHeader from "@/components/GlobalHeader";
// import { formatMessage } from 'umi-plugin-react/locale';
import styles from "./BasicLayout.less";

interface basicLayoutProps {
  route: { [key: string]: any };
  location: any;
  children: React.ReactElement[];
}
const BasicLayout: FC<basicLayoutProps> = props => {
  const { route, location, children } = props;
  const { routes = [] } = route;
  const { pathname } = location;
  // 当前路由
  const thatRoute =
    routes.filter((v: { path: string }) => v.path === pathname)[0] || {};

  const globaSearch = (value: string, callback: () => void) => {
    setTimeout(() => {
      callback();
    }, 1000);
  };

  return (
    <div className={styles.basic_layout}>
      <GlobalHeader {...props} thatRoute={thatRoute} onSearch={globaSearch} />
      {children}
    </div>
  );
};

export default BasicLayout;
