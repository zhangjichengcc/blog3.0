import { Avatar, Icon, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';
import HeaderDropdown from '../HeaderDropdown';
import imgVisitor from '@/assets/visitor.jpg';

class AvatarDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;
    if (key === 'logout') {
      const { location } = window;
      const { pathname, search } = location;
      router.push({
        pathname: '/user/login',
        query: {
          redirect: pathname + search,
        },
      });
      // const { dispatch } = this.props;

      // if (dispatch) {
      //   dispatch({
      //     type: 'login/logout',
      //   });
      // }

      // return;
    }
  };

  render() {
    const { currentUser = {}, menu } = this.props;
    const {
      name = '游客',
      avatar = imgVisitor,
      comment = '莫得感情的杀手',
      authority = 'visitor',
    } = currentUser;

    if (!menu) {
      return (
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={avatar} alt="avatar" />
          <span className={styles.name}>{name}</span>
        </span>
      );
    }

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {/* <Menu.Item key="center">
          <Icon type="user" />
          <FormattedMessage id="menu.account.center" defaultMessage="account center" />
        </Menu.Item>
        <Menu.Item key="settings">
          <Icon type="setting" />
          <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
        </Menu.Item>
        <Menu.Divider /> */}
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    return name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={avatar} alt="avatar" />
          <span className={styles.name}>{name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
