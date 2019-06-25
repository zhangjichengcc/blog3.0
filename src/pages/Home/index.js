import React, { Component, Suspense } from 'react';
// import moment from 'js-moment';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown, Popover } from 'antd';

import { getTimeDistance } from '@/utils/utils';
import config from '@/config';

import styles from './index.less';
import PageLoading from '@/components/PageLoading';


class Home extends Component {
  state = {
    wechatContentVisible: false,
  };

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  openView = (type = '') => {
    switch (type) {
      case 'book':
        window.open('https://zhangjichengcc.github.io/blog/');
        break;
      case 'github':
        window.open('https://github.com/zhangjichengcc');
        break;
      default:
        console.warn('undefined');
    }
  }

  render() {
    const { wechatContentVisible } = this.state;
    const wechatContent = (
      <div className={styles.wechatContent} />
    );
    const mailContent = (
      <span>{config.mail}</span>
    );

    return (
      <div className={styles.Home}>
        <div className={styles.banner}>
          <div className={styles.banner_title}>
            <p className={styles.avator} />
            <div className={styles.content}>
              <span>{config.info}</span>
              <div className={styles.btnContent}>
                <Icon className={styles.icon} onClick={() => { this.openView('book'); }} style={{ fontSize: 26 }} type="book" />
                <Popover
                  content={wechatContent}
                  trigger="hover"
                >
                  <Icon className={styles.icon} style={{ color: '#79cd18', fontSize: 28 }} type="wechat" />
                </Popover>
                <Icon className={styles.icon} onClick={() => { this.openView('github'); }} style={{ color: '#fff', fontSize: 26 }} type="github" />
                <Icon className={styles.icon} onClick={() => { this.openView('weibo'); }} style={{ color: '#ef5350' }} type="weibo" />
                <Popover
                  content={mailContent}
                  trigger="hover"
                >
                  <Icon className={styles.icon} onClick={() => { this.openView('mail'); }} style={{ color: '#fff' }} type="mail" />
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
