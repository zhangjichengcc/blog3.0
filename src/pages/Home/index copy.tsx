import React, { Component } from "react";

import {
  BookFilled,
  BookOutlined,
  GithubFilled,
  GlobalOutlined,
  Loading3QuartersOutlined,
  MailFilled,
  WechatFilled,
  WeiboOutlined
} from "@ant-design/icons";

import { Popover, Alert, BackTop, Button } from "antd";
import moment from "js-moment";
// import Advert from '@/components/Advert';
// import Charts from '@/components/Charts';
import classnames from "classnames";
import ArticalCard from "@/components/ArticalCard";
// import advertImg1 from '@/assets/image/home/advert.jpg';
import weChatImg from "@/assets/image/my-wechat.jpg";
import config from "@/config";
import styles from "./index.less";
import Ellipsis from "@/components/Ellipsis";
import { queryArticalList } from "@/services/artical";
import { isPc, offset } from "@/utils/utils";

// const { TagCloud } = Charts;

class Home extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      articalList: [],
      pageParams: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      articalLoaded: false,
      articalLoading: false
    };
  }

  componentDidMount() {
    global.that = this;
    global.moment = moment;
    this.initPage();
    this.initData();
  }

  initData = () => {
    this.fetchArtical();
  };

  initPage = () => {
    const isPC = isPc();
    this.setState(
      {
        isPC
      },
      () => {
        if (!isPC) {
          window.addEventListener("scroll", this.scrollFun);
        }
      }
    );
  };

  scrollFun = () => {
    const { articalLoaded, articalLoading } = this.state;
    const dom = document.documentElement || document.body;
    const { scrollHeight } = dom;
    const { topBottom } = offset(dom);
    if (articalLoading) return;
    if (!articalLoaded && topBottom + 5 > scrollHeight) {
      this.loadMore();
    }
  };

  openView = (type = "") => {
    switch (type) {
      case "book":
        window.open("https://zhangjichengcc.github.io/blog/");
        break;
      case "github":
        window.open("https://github.com/zhangjichengcc");
        break;
      default:
        console.warn("undefined");
    }
  };

  fetchArtical = () => {
    const { pageParams, articalList = [], articalLoaded } = this.state;
    if (articalLoaded) return;
    const { pageNum, pageSize } = pageParams;
    const pagems = {
      pageNum,
      pageSize
    };
    this.setState({ articalLoading: true });
    queryArticalList(pagems).then(res => {
      const { code, data = {}, msg } = res;
      if (code === 0) {
        const { list = [], total } = data;
        const loaded = pageNum * pageSize >= total;
        this.setState({
          articalLoading: false,
          articalLoaded: loaded,
          articalList: [...articalList, ...list],
          pageParams: {
            ...pageParams,
            total
          }
        });
      } else {
        this.setState(
          {
            articalLoading: false,
            articalLoaded: true
          },
          () => {
            console.warn(msg);
          }
        );
      }
    });
  };

  loadMore = () => {
    const { pageParams = {} } = this.state;
    const { pageNum, pageSize, total } = pageParams;
    if (pageNum * pageSize >= total) return;
    this.setState(
      {
        pageParams: {
          ...pageParams,
          pageNum: pageNum + 1
        }
      },
      () => {
        this.fetchArtical();
      }
    );
  };

  cardClick = item => {
    const { id } = item;
    history.push({
      pathname: "/artical",
      query: {
        id
      }
    });
  };

  likeChoose = (like, count, item) => {
    console.log(like, count, item);
  };

  render() {
    const {
      articalList = [],
      articalLoading = false,
      articalLoaded = false,
      isPC = true,
      showContent = false
    } = this.state;
    const { topArtical } = config;
    const wechatContent = (
      <img src={weChatImg} alt="微信二维码" className={styles.wechatContent} />
    );
    const mailContent = <span>{config.mail}</span>;

    return (
      <div className={styles.Home}>
        <div className={styles.banner}>
          <div className={styles.banner_title}>
            <span>负重攀越</span>
            <span>只为一个全新的高度</span>
            <span>Just for a new height</span>
          </div>
          {/* <LegacyIcon
            className={classnames(
              styles.banner_openKey,
              showContent ? styles.active : ""
            )}
            type={showContent ? "minus-circle" : "plus-circle"}
            theme="filled"
            onClick={() => {
              this.setState({ showContent: !showContent });
            }}
          /> */}
          <div
            className={classnames(
              styles.banner_content,
              showContent ? styles.active : ""
            )}
          >
            {/* <p className={styles.avator} /> */}
            <div className={styles.content}>
              <span>{config.info}</span>
              <div className={styles.btnContent}>
                <BookFilled
                  className={styles.icon}
                  onClick={() => {
                    this.openView("book");
                  }}
                  style={{ fontSize: 22, transform: "translateY(-2px)" }}
                />
                <Popover content={wechatContent} trigger="hover">
                  <WechatFilled
                    className={styles.icon}
                    style={{ fontSize: 28 }}
                  />
                </Popover>
                <GithubFilled
                  className={styles.icon}
                  onClick={() => {
                    this.openView("github");
                  }}
                  style={{ color: "#fff", fontSize: 26 }}
                />
                <WeiboOutlined
                  className={styles.icon}
                  onClick={() => {
                    this.openView("weibo");
                  }}
                  style={{ color: "#fff" }}
                />
                <Popover
                  content={mailContent}
                  trigger="hover"
                  placement="topRight"
                >
                  <MailFilled
                    className={styles.icon}
                    onClick={() => {
                      this.openView("mail");
                    }}
                    style={{ color: "#fff", fontSize: 25 }}
                  />
                </Popover>
              </div>
            </div>
          </div>
        </div>
        {/* <div className={styles.cloud}>
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
                <a
                  target="_blank"
                  rel="博客v1.0"
                  href="https://zhangjichengcc.github.io/blog/"
                >
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
              <GlobalOutlined className={styles.title_icon} />
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
              <BookOutlined className={styles.title_icon} />
              最新文章
            </span>
          </div>
          <div className={styles.artical_body} style={{ marginTop: 40 }}>
            {articalList.map((item, idx) => {
              const keys = `art_card_${idx}`;
              return (
                <ArticalCard
                  key={keys}
                  id={item.id}
                  title={item.title}
                  img={item.banner}
                  look={item.readCount}
                  like={item.likeCount}
                  type={item.type}
                  // tag={item.tag}
                  msgCount={item.msgCount}
                  message={item.introduction}
                  createTime={item.createTime}
                  onClick={this.cardClick}
                  onLike={this.likeChoose}
                />
              );
            })}
          </div>
          {isPC ? (
            <div className={styles.loadBar}>
              {articalLoaded ? (
                <span>很高兴你会看到这里，不过真的没有了...</span>
              ) : (
                <Button
                  onClick={this.loadMore}
                  type="primary"
                  loading={articalLoading}
                >
                  {articalLoading ? "数据加载中" : "加载更多"}
                </Button>
              )}
            </div>
          ) : (
            <div className={styles.loadBar}>
              {articalLoaded ? (
                <span>很高兴你能够看到这里，不过真的没有了...</span>
              ) : (
                <span>
                  <Loading3QuartersOutlined style={{ marginRight: 5 }} spin />
                  数据加载中...
                </span>
              )}
            </div>
          )}
        </div>
        {/* <Advert img={advertImg1} /> */}
        <BackTop />
      </div>
    );
  }
}

export default Home;
