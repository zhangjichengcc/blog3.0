// import { Layout } from "antd";
import React, { FC } from "react";
// import { connect } from "dva";
import GlobalHeader from "@/components/GlobalHeader";
// import { formatMessage } from 'umi-plugin-react/locale';
import classnames from "classnames";
import styles from "./BasicLayout.less";
// import RightContent from '@/components/GlobalHeader/RightContent';

/**
 * use Authorized check all menu item
 */

// const { Content } = Layout;

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

  const footerRender = () => {
    return (
      <div className={classnames(styles.footer)}>
        <span>Copyright &copy; 2019 Veigar</span>
        <span>坑位招租 坑位招租 坑位招租 赞助提供</span>
      </div>
    );
  };

  return (
    <div>
      <GlobalHeader {...props} thatRoute={thatRoute} onSearch={globaSearch} />
      {/* <Content>{children}</Content> */}
      {children}
      {footerRender()}
    </div>
  );
};

export default BasicLayout;
