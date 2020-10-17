// import ProLayout from '@ant-design/pro-layout';
import { Layout } from 'antd';
import React, { useState } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import GlobalHeader from '@/components/GlobalHeader';
// import { formatMessage } from 'umi-plugin-react/locale';
import classnames from 'classnames';
import Authorized from '@/utils/Authorized';
import styles from './BasicLayout.less';
// import RightContent from '@/components/GlobalHeader/RightContent';

/**
 * use Authorized check all menu item
 */

const { Content } = Layout;

const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });

// 获取访问IP及地点
// setTimeout(() => {
//   // eslint-disable-next-line no-undef
//   message.info(returnCitySN.cip + returnCitySN.cname);
// }, 4000);

const BasicLayout = props => {
  const { dispatch, children, settings, route = {}, location } = props;
  const { routes = [] } = route;
  const { pathname } = location;
  // 当前路由
  const thatRoute = routes.filter(v => v.path === pathname)[0] || {};
  window.layoutProps = props;
  // useState(() => {
  //   if (dispatch) {
  //     dispatch({
  //       type: 'user/fetchCurrent',
  //     });
  //     dispatch({
  //       type: 'settings/getSetting',
  //     });
  //   }
  // });

  // const handleMenuCollapse = payload =>
  //   dispatch &&
  //   dispatch({
  //     type: 'global/changeLayoutCollapsed',
  //     payload,
  //   });

  const footerRender = () => {
    return (
      <div className={classnames(styles.footer)}>
        <span>Copyright &copy; 2019 Veigar</span>
        <span>坑位招租 坑位招租 坑位招租 赞助提供</span>
      </div>
    );
  };

  return (
    // <ProLayout
    //   logo={logo}
    //   onCollapse={handleMenuCollapse}
    //   menuItemRender={(menuItemProps, defaultDom) => {
    //     if (menuItemProps.isUrl || menuItemProps.children) {
    //       return defaultDom;
    //     }
    //     return <Link to={menuItemProps.path}>{defaultDom}</Link>;
    //   }}
    //   className={classnames(styles.ProLayout, style === 'dark' ? styles.dark : {})}
    //   breadcrumbRender={(routers = []) => [
    //     {
    //       path: '/',
    //       breadcrumbName: formatMessage({
    //         id: 'menu.home',
    //         defaultMessage: 'Home',
    //       }),
    //     },
    //     ...routers,
    //   ]}
    //   footerRender={style === 'light' && footerRender}
    //   menuDataRender={menuDataRender}
    //   formatMessage={formatMessage}
    //   rightContentRender={rightProps => <RightContent {...rightProps} />}
    //   {...props}
    //   {...settings}
    // >
    //   <div>{children}</div>
    // </ProLayout>
    <Layout>
      <GlobalHeader
        {...props}
        thatRoute={thatRoute}
      />
      <Content>{children}</Content>
      <footerRender />
    </Layout>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
