import React, { Component } from "react";

import {
  EyeInvisibleOutlined,
  EyeOutlined,
  FacebookOutlined,
  GithubOutlined,
  KeyOutlined,
  QqOutlined,
  UserOutlined,
  WechatOutlined,
  WeiboOutlined
} from "@ant-design/icons";

import { message } from "antd";
import SHA2 from "sha2";
// import { FormattedMessage } from "umi-plugin-react/locale";
import { history } from "umi";
import classnames from "classnames";
import SelectLang from "@/components/SelectLang";
import BackgroundImage from "./BackgroundImage";
import "particles.js";
import styles from "./index.less";
import { login } from "@/services/user";

const timeout = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

class Home extends Component {
  state = {
    redirect: "",
    signIconAction: {
      signIconAction1: false,
      signIconAction2: false,
      signIconAction3: false,
      signIconAction4: false,
      signIconAction5: false
    }
  };

  componentDidMount() {
    this.initData();
    global.that = this;
    global.SHA2 = SHA2;
  }

  componentWillUnmount() {}

  // 初始化页面数据
  initData = () => {
    const {
      location: { query }
    } = this.props;
    const { redirect = "" } = query;
    this.setState({
      redirect
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
        animateStep2: false
      },
      () => {
        timeout(700).then(() => {
          this.setState({
            animateStep1: key,
            animateStep2: key
          });
        });
      }
    );
  };

  // 展示第三方登陆方式
  showSignWay = () => {
    const {
      signIconAction: defSignAction,
      signWayVisiable = false
    } = this.state;
    const keys = Object.keys(defSignAction);
    this.setState({
      signWayVisiable: !signWayVisiable
    });
    if (signWayVisiable) {
      this.setState({
        signIconAction: (() => {
          const res = {};
          keys.forEach(item => {
            res[item] = false;
          });
          return res;
        })()
      });
    } else {
      keys.forEach((item, idx) => {
        setTimeout(() => {
          const { signIconAction } = this.state;
          this.setState({
            signIconAction: {
              ...signIconAction,
              [item]: true
            }
          });
        }, idx * 120);
      });
    }
  };

  // 登陆触发
  login = () => {
    // https://www.npmjs.com/package/sha2
    const { SHA256 } = SHA2;
    const { username, password, redirect } = this.state;
    const sha2Pwd =
      SHA256(SHA256(password)).toString("hex") +
      SHA256(username).toString("hex");
    const params = {
      username,
      password: sha2Pwd
    };
    const msgList = {
      username: "用户名不能为空！",
      password: "密码不能为空！"
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
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ ...data, password })
          );
          this.setState(
            {
              // userInfo,
            },
            () => {
              console.log(userInfo);
              history.push(redirect);
            }
          );
        } else {
          message.error(
            msg === "error username" ? "用户名不存在！" : "密码错误！"
          );
        }
      });
    });
  };

  render() {
    const {
      showPwd = false,
      animateStep1 = false,
      animateStep2 = false,
      iconAnimate = false,
      username = "",
      password = "",
      signIconAction = {}
    } = this.state;

    const {
      signIconAction1 = false,
      signIconAction2 = false,
      signIconAction3 = false,
      signIconAction4 = false,
      signIconAction5 = false
    } = signIconAction;

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
                animateStep2 && styles.moveLeft
              )}
            >
              <span
                className={classnames(
                  styles.userIcon,
                  iconAnimate && styles.active
                )}
                onMouseEnter={() => {
                  this.setState({ iconAnimate: true });
                }}
                onMouseLeave={() => {
                  this.setState({ iconAnimate: false });
                }}
              />
              <div className={styles.inputItem}>
                <UserOutlined className={styles.itemIcon} style={{ left: 8 }} />
                <input
                  placeholder="username"
                  type="text"
                  name=""
                  onChange={this.inputUsername}
                  value={username}
                />
              </div>
              <div className={styles.inputItem}>
                <KeyOutlined className={styles.itemIcon} style={{ left: 8 }} />
                <input
                  placeholder="password"
                  type={showPwd ? "text" : "password"}
                  name=""
                  onChange={this.inputPassword}
                  onKeyPress={this.onKeyPress}
                  value={password}
                />
                {showPwd ? (
                  <EyeOutlined
                    onMouseLeave={() => this.setState({ showPwd: false })}
                    className={styles.itemIcon}
                    style={{ right: 8, cursor: "pointer" }}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    className={styles.itemIcon}
                    onMouseEnter={() => this.setState({ showPwd: true })}
                    style={{ right: 8, cursor: "pointer" }}
                  />
                )}
              </div>
              <div className={styles.btnContent}>
                <span className={styles.loginBtn} onClick={this.login}>
                  {/* <FormattedMessage
                    id="user.login.signin"
                    defaultMessage="sign in"
                  /> */}
                </span>
                <div className={styles.otherBtn}>
                  <span
                    className={styles.registerBtn}
                    onClick={this.showSignWay}
                  >
                    {/* <FormattedMessage
                      id="user.login.SignInWith"
                      defaultMessage="Sign in with"
                    /> */}
                  </span>
                  <i className={styles.btnLine} />
                  <span className={styles.registerBtn}>
                    {/* <FormattedMessage
                      id="user.login.register"
                      defaultMessage="register"
                    /> */}
                  </span>
                  <i className={styles.btnLine} />
                  <span className={styles.getPsdBtn}>
                    {/* <FormattedMessage
                      id="user.login.forgetPsd"
                      defaultMessage="Forgot your password？"
                    /> */}
                  </span>
                </div>
              </div>
              <div className={classnames(styles.signinWith)}>
                <GithubOutlined className={signIconAction1 && styles.active} />
                <WeiboOutlined className={signIconAction2 && styles.active} />
                <WechatOutlined className={signIconAction3 && styles.active} />
                <QqOutlined className={signIconAction4 && styles.active} />
                <FacebookOutlined
                  className={signIconAction5 && styles.active}
                />
              </div>
              <span className={styles.loginInfo}>
                {/* <FormattedMessage
                  id="user.login.loginInfo"
                  defaultMessage="It’s no use logging in"
                /> */}
              </span>
            </div>
            <div
              className={classnames(
                styles.loginLoader,
                animateStep2 && styles.active
              )}
            >
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
