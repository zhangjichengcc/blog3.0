import { Avatar, Icon, Menu, Spin } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';
import HeaderDropdown from '@/components/HeaderDropdown';
import imgVisitor from '@/assets/visitor.jpg';

class AvatarDropdown extends React.Component {
  onMenuClick = (event: { key: any; }) => {
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
    }
  };

  render() {
    const { currentUser = {}, menu } = this.props;
    const {
      name = '游客',
      avatar = imgVisitor,
    } = currentUser;

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    return name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <Avatar size="small" className={styles.avatar} src={avatar} alt="avatar" />
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
