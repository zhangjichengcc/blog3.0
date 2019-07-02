import React, { Component } from 'react';
import { Icon, Popover, Alert, BackTop } from 'antd';
import Advert from '@/components/Advert';
// import Charts from '@/components/Charts';
import ArticalCard from '@/components/ArticalCard';
import advertImg1 from '@/assets/image/home/advert.jpg';
import weChatImg from '@/assets/image/my-wechat.jpg';
import config from '@/config';
import styles from './index.less';
import Ellipsis from '@/components/Ellipsis';
import { queryVisitorList } from '@/services/home';

// const { TagCloud } = Charts;

const data = [
  {
    title:
      'nodejs 开发实战前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why',
    img: 'http://www.yx319.cn/wp-content/uploads/2019/03/timg-1024x768.jpeg',
    message:
      '前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why',
    tag: '前端',
    look: 109,
    like: 60,
    msgCount: 10,
    createTime: '2019-01-01',
  },
  {
    title: 'nodejs 开发实战',
    // img: 'http://www.yx319.cn/wp-content/uploads/2019/03/timg-1024x768.jpeg',
  },
  {
    title:
      'nodejs 开发实战前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why',
    img: 'http://www.yx319.cn/wp-content/uploads/2019/03/timg-1024x768.jpeg',
    message:
      '前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why',
    tag: '前端',
    look: 109,
    like: 60,
    msgCount: 10,
    createTime: '2019-01-01',
  },
  {
    title:
      'nodejs 开发实战前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why',
    img: 'http://www.yx319.cn/wp-content/uploads/2019/03/timg-1024x768.jpeg',
    message:
      '前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why',
    tag: '前端',
    look: 109,
    like: 60,
    msgCount: 10,
    createTime: '2019-01-01',
  },
  {
    title:
      'nodejs 开发实战前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why',
    img: 'http://www.yx319.cn/wp-content/uploads/2019/03/timg-1024x768.jpeg',
    message:
      '前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why',
    tag: '前端',
    look: 109,
    like: 60,
    msgCount: 10,
    createTime: '2019-01-01',
  },
  {
    title:
      'nodejs 开发实战前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why',
    img: 'http://www.yx319.cn/wp-content/uploads/2019/03/timg-1024x768.jpeg',
    message:
      '前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why前言 本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why',
    tag: '前端',
    look: 109,
    like: 60,
    msgCount: 10,
    createTime: '2019-01-01',
  },
];

class Home extends Component {
  state = {
    // wechatContentVisible: false,
  };

  componentDidMount() {
    this.initData();
  }

  componentWillUnmount() {}

  initData = () => {
    queryVisitorList().then(res => {
      console.log(res);
    });
  };

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
  };

  cardClick = (item = {}) => {
    console.log(item);
  };

  render() {
    // const { wechatContentVisible } = this.state;
    const { topArtical } = config;
    const wechatContent = <img src={weChatImg} alt="微信二维码" className={styles.wechatContent} />;
    const mailContent = <span>{config.mail}</span>;

    return (
      <div className={styles.Home}>
        <div className={styles.banner}>
          <div className={styles.banner_title}>
            <p className={styles.avator} />
            <div className={styles.content}>
              <span>{config.info}</span>
              <div className={styles.btnContent}>
                <Icon
                  className={styles.icon}
                  onClick={() => {
                    this.openView('book');
                  }}
                  style={{ fontSize: 26 }}
                  type="book"
                />
                <Popover content={wechatContent} trigger="hover">
                  <Icon
                    className={styles.icon}
                    style={{ color: '#79cd18', fontSize: 28 }}
                    type="wechat"
                  />
                </Popover>
                <Icon
                  className={styles.icon}
                  onClick={() => {
                    this.openView('github');
                  }}
                  style={{ color: '#fff', fontSize: 26 }}
                  type="github"
                />
                <Icon
                  className={styles.icon}
                  onClick={() => {
                    this.openView('weibo');
                  }}
                  style={{ color: '#ef5350' }}
                  type="weibo"
                />
                <Popover content={mailContent} trigger="hover">
                  <Icon
                    className={styles.icon}
                    onClick={() => {
                      this.openView('mail');
                    }}
                    style={{ color: '#fff' }}
                    type="mail"
                  />
                </Popover>
              </div>
            </div>
          </div>
        </div>
        {/* <div className={}>
          <TagCloud
            width="20vw"
            height={200}
            data={[{ name: 'aaa', value: 12 }, { name: 'bbb', value: 23 }]}
          />
        </div> */}
        <div className={styles.home_body}>
          <Alert
            message="博客3.0版本即将发布"
            // eslint-disable-next-line react/jsx-no-target-blank
            description={
              <span>
                之前的博客将继续保留再github博客上,
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <a target="_blank" rel="博客v1.0" href="https://zhangjichengcc.github.io/blog/">
                  https://zhangjichengcc.github.io/blog/
                </a>
                。 同时，将会慢慢将博客同步到当前版本中。
              </span>
            }
            type="info"
            showIcon
            style={{ marginTop: 60 }}
          />
          <div className={styles.title} style={{ marginTop: 50 }}>
            <span>
              <Icon type="crown" className={styles.title_icon} />
              常用网站
            </span>
          </div>
          <div className={styles.top_artical_body} style={{ marginTop: 40 }}>
            {topArtical.map((item, idx) => {
              const keys = `topArt_${idx + 1}`;
              return (
                <div key={keys} className={styles.top_artical_card}>
                  <div
                    style={{ backgroundImage: `url(${item.img})` }}
                    onClick={() => {
                      window.open(item.link);
                    }}
                  >
                    <span className={styles.top_artical_card_title}>
                      <Ellipsis lines={1}>{item.title}</Ellipsis>
                    </span>
                    <span className={styles.top_artical_card_message}>
                      <Ellipsis lines={1}>{item.introduction}</Ellipsis>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.title} style={{ marginTop: 50 }}>
            <span>
              <Icon type="crown" className={styles.title_icon} />
              最新文章
            </span>
          </div>
          <div className={styles.artical_body} style={{ marginTop: 40 }}>
            {data.map((item, idx) => {
              const keys = `art_card_${idx}`;
              return (
                <ArticalCard
                  key={keys}
                  title={item.title}
                  img={item.img}
                  look={item.look}
                  like={item.like}
                  tag={item.tag}
                  msgCount={item.msgCount}
                  message={item.message}
                  createTime={item.createTime}
                  onClick={this.cardClick}
                />
              );
            })}
          </div>
        </div>
        <Advert img={advertImg1} />
        <BackTop />
      </div>
    );
  }
}

export default Home;
