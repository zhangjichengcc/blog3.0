import ProLayout from '@ant-design/pro-layout';
import React, { useState } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import classnames from 'classnames';
import Authorized from '@/utils/Authorized';
import styles from './BasicLayout.less';
import RightContent from '@/components/GlobalHeader/RightContent';
// import logo from '../assets/logo.svg';
import logo from '../assets/logo.png';

/**
 * use Authorized check all menu item
 */
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
  const thatRoute = routes.filter(v => v.path === pathname)[0] || {};
  // 获取当前页面风格 dark || lignt
  const style = thatRoute.style || 'light';
  /**
   * constructor
   */

  useState(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  });
  /**
   * init variables
   */

  const handleMenuCollapse = payload =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });

  const footerRender = () => {
    return (
      <div className={classnames(styles.footer, style === 'dark' ? styles.dark : {})}>
        <span>Copyright &copy; 2019 Veigar</span>
        <span>坑位招租 坑位招租 坑位招租 赞助提供</span>
      </div>
    );
  };

  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      className={classnames(styles.ProLayout, style === 'dark' ? styles.dark : {})}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
            defaultMessage: 'Home',
          }),
        },
        ...routers,
      ]}
      footerRender={style === 'light' && footerRender}
      menuDataRender={menuDataRender}
      formatMessage={formatMessage}
      rightContentRender={rightProps => <RightContent {...rightProps} />}
      {...props}
      {...settings}
    >
      <div>{children}</div>
    </ProLayout>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
