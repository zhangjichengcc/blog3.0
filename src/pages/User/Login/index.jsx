import React, { Component } from 'react';
import { Icon, message } from 'antd';
import { SHA256 } from 'sha2';
import { FormattedMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';
import classnames from 'classnames';
import SelectLang from '@/components/SelectLang';
import BackgroundImage from './BackgroundImage';
import 'particles.js';
import styles from './index.less';
import { login } from '@/services/user';

const timeout = ms => {
  // eslint-disable-next-line compat/compat
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

class Home extends Component {
  state = {
    redirect: '',
  };

  componentDidMount() {
    this.initData();
    global.that = this;
    global.SHA256 = SHA256;
  }

  componentWillUnmount() {}

  // 初始化页面数据
  initData = () => {
    const {
      location: { query },
    } = this.props;
    const { redirect = '' } = query;
    this.setState({
      redirect,
    });
  };

  inputUsername = val => {
    const { value } = val.target;
    this.setState({ username: value });
  };

  inputPassword = val => {
    const { value } = val.target;
    this.setState({ password: value });
  };

  onKeyPress = e => {
    const { charCode } = e;
    if (charCode === 13) this.login();
  };

  // 登陆动画
  loginAnimate = (val = true) => {
    const key = !!val;
    this.setState(
      {
        animateStep1: true,
        animateStep2: false,
      },
      () => {
        timeout(700).then(() => {
          this.setState({
            animateStep1: key,
            animateStep2: key,
          });
        });
      },
    );
  };

  // 登陆触发
  login = () => {
    const { username, password, redirect } = this.state;
    const params = {
      username,
      password: SHA256(password),
    };
    const msgList = {
      username: '用户名不能为空！',
      password: '密码不能为空！',
    };
    // eslint-disable-next-line no-restricted-syntax
    for (const item of Object.keys(params)) {
      if (!params[item]) {
        message.warn(msgList[item]);
        return;
      }
    }

    this.loginAnimate();
    timeout(2000).then(() => {
      login(params).then((res = {}) => {
        this.loginAnimate(false);
        const { code, data, msg } = res;
        if (code === 0) {
          const userInfo = { ...data, password };
          localStorage.setItem('userInfo', JSON.stringify({ ...data, password }));
          this.setState(
            {
              // userInfo,
            },
            () => {
              console.log(userInfo);
              router.push(redirect);
            },
          );
        } else {
          message.error(msg === 'error username' ? '用户名不存在！' : '密码错误！');
        }
      });
    });
  };

  render() {
    const {
      showPwd = false,
      animateStep1 = false,
      animateStep2 = false,
      username = '',
      password = '',
    } = this.state;

    return (
      <div className={styles.loginPage}>
        <BackgroundImage className={styles.bg} />
        <div className={styles.viewContent}>
          <SelectLang className={styles.lang} />
          <div className={styles.loginContent}>
            <div
              className={classnames(
                styles.loginMain,
                animateStep1 && styles.active,
                animateStep2 && styles.moveLeft,
              )}
            >
              <span className={styles.userIcon} />
              <div className={styles.inputItem}>
                <Icon type="user" className={styles.itemIcon} style={{ left: 8 }} />
                <input
                  placeholder="username"
                  type="text"
                  name=""
                  onChange={this.inputUsername}
                  value={username}
                />
              </div>
              <div className={styles.inputItem}>
                <Icon type="key" className={styles.itemIcon} style={{ left: 8 }} />
                <input
                  placeholder="password"
                  type={showPwd ? 'text' : 'password'}
                  name=""
                  onChange={this.inputPassword}
                  onKeyPress={this.onKeyPress}
                  value={password}
                />
                {showPwd ? (
                  <Icon
                    type="eye"
                    onMouseLeave={() => this.setState({ showPwd: false })}
                    className={styles.itemIcon}
                    style={{ right: 8, cursor: 'pointer' }}
                  />
                ) : (
                  <Icon
                    type="eye-invisible"
                    className={styles.itemIcon}
                    onMouseEnter={() => this.setState({ showPwd: true })}
                    style={{ right: 8, cursor: 'pointer' }}
                  />
                )}
              </div>
              <div className={styles.btnContent}>
                <span className={styles.loginBtn} onClick={this.login}>
                  <FormattedMessage id="user.login.signin" defaultMessage="sign in" />
                </span>
                <div className={styles.otherBtn}>
                  <span className={styles.registerBtn}>
                    <FormattedMessage id="user.login.register" defaultMessage="register" />
                  </span>
                  <i className={styles.btnLine} />
                  <span className={styles.getPsdBtn}>
                    <FormattedMessage
                      id="user.login.forgetPsd"
                      defaultMessage="Forgot your password？"
                    />
                  </span>
                </div>
              </div>
              <span className={styles.loginInfo}>
                <FormattedMessage
                  id="user.login.loginInfo"
                  defaultMessage="It’s no use logging in"
                />
              </span>
            </div>
            <div className={classnames(styles.loginLoader, animateStep2 && styles.active)}>
              <div className={styles.loaderInner}>
                <i />
                <i />
                <i />
              </div>
              <p>认证中...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
