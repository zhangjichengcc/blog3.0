/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
// import { message } from 'antd';
import React, { useState } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import styles from './BasicLayout.less';
import RightContent from '@/components/GlobalHeader/RightContent';
// import { isAntDesignPro } from '@/utils/utils';
import logo from '../assets/logo.svg';

/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null);
  });

const footerRender = () => {
  // if (!isAntDesignPro()) {
  //   return defaultDom;
  // }

  // return (
  //   <>
  //     {defaultDom}
  //     <div
  //       style={{
  //         padding: '0px 24px 24px',
  //         textAlign: 'center',
  //       }}
  //     >
  //       <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
  //         <img
  //           src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
  //           width="82px"
  //           alt="netlify logo"
  //         />
  //       </a>
  //     </div>
  //   </>
  // );
  return (
    <div className={styles.footer}>
      <span>Copyright &copy; 2019 Veigar</span>
      <span>坑位招租 坑位招租 坑位招租 赞助提供</span>
    </div>
  );
};

// 获取访问IP及地点
// setTimeout(() => {
//   // eslint-disable-next-line no-undef
//   message.info(returnCitySN.cip + returnCitySN.cname);
// }, 4000);

const BasicLayout = props => {
  const { dispatch, children, settings } = props;
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

  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => (
        <Link to={menuItemProps.path}>{defaultDom}</Link>
      )}
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
      footerRender={footerRender}
      menuDataRender={menuDataRender}
      formatMessage={formatMessage}
      // 暂时移除右侧操作
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
