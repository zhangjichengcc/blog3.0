import React, { FC, useState, useEffect } from "react";
import { Icon, Popover, Alert, BackTop, Button } from "antd";
import router from "umi/router";
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

interface homeProps {}

interface pageParamsProps {
  pageSize: number;
  pageNum: number;
  total: number;
}

type fetchStateProps = "close" | "open" | "finish";

const Home: FC<homeProps> = (): React.ReactElement => {
  const [articalList, setArticalList] = useState<any>([]);
  const [pageParams, setPageParams] = useState<pageParamsProps>({
    pageSize: 10,
    pageNum: 1,
    total: 0
  });
  const [fetchState, setFetchState] = useState<fetchStateProps>("close");
  const [showContent, setShowContent] = useState<boolean>(false);
  const isPC = isPc();

  // 获取文章列表
  const fetchArticalList = (): void => {
    if (fetchState === "finish") return;
    const { pageNum, pageSize } = pageParams;
    const params = {
      pageNum,
      pageSize
    };
    setFetchState("open");
    queryArticalList(params).then(res => {
      const { code, data = {}, msg } = res;
      if (code === 0) {
        const { list = [], total } = data;
        const loaded = pageNum * pageSize >= total;
        setFetchState(loaded ? "finish" : "close");
        setArticalList([...articalList, ...list]);
        setPageParams({ ...pageParams, total });
      } else {
        setFetchState("close");
        console.error(msg);
      }
    });
  };

  // 翻页方法
  const loadMore = () => {
    const { pageNum } = pageParams;
    setPageParams({ ...pageParams, pageNum: pageNum + 1 });
  };

  // 监听页面滚动
  const scrollFun = (): void => {
    const dom = document.documentElement || document.body;
    const { scrollHeight } = dom;
    const { topBottom } = offset(dom);
    if (fetchState === "close" && topBottom + 5 > scrollHeight) {
      loadMore();
    }
  };

  // 页面初始化
  const initPage = (): void => {
    fetchArticalList();
  };

  // 页面跳转
  const openView = (type: string): void => {
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

  // 选择文章卡片
  const cardClick = (item: { id: any }) => {
    const { id } = item;
    router.push({
      pathname: "/artical",
      query: { id }
    });
  };

  // 文章点赞
  const likeChoose = (like, count, item) => {
    console.log(like, count, item);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollFun);
    initPage();
    return () => {
      window.removeEventListener("scroll", scrollFun);
    };
  }, []);

  // 监听pageNum变化，触发搜索方法
  useEffect(() => {
    fetchArticalList();
  }, [pageParams.pageNum]);

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
        <Icon
          className={classnames(
            styles.banner_openKey,
            showContent ? styles.active : ""
          )}
          type={showContent ? "minus-circle" : "plus-circle"}
          theme="filled"
          onClick={() => setShowContent(!showContent)}
        />
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
              <Icon
                className={styles.icon}
                onClick={() => {
                  openView("book");
                }}
                style={{ fontSize: 22, transform: "translateY(-2px)" }}
                type="book"
                theme="filled"
              />
              <Popover content={wechatContent} trigger="hover">
                <Icon
                  className={styles.icon}
                  style={{ fontSize: 28 }}
                  type="wechat"
                  theme="filled"
                />
              </Popover>
              <Icon
                className={styles.icon}
                onClick={() => {
                  openView("github");
                }}
                style={{ color: "#fff", fontSize: 26 }}
                type="github"
                theme="filled"
              />
              <Icon
                className={styles.icon}
                onClick={() => {
                  openView("weibo");
                }}
                style={{ color: "#fff" }}
                type="weibo"
              />
              <Popover
                content={mailContent}
                trigger="hover"
                placement="topRight"
              >
                <Icon
                  className={styles.icon}
                  onClick={() => {
                    openView("mail");
                  }}
                  style={{ color: "#fff", fontSize: 25 }}
                  type="mail"
                  theme="filled"
                />
              </Popover>
            </div>
          </div>
        </div>
      </div>
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
            <Icon type="global" className={styles.title_icon} />
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
            <Icon type="book" className={styles.title_icon} />
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
                onClick={cardClick}
                onLike={likeChoose}
              />
            );
          })}
        </div>
        {isPC ? (
          <div className={styles.loadBar}>
            {fetchState === "finish" && (
              <span>很高兴你会看到这里，不过真的没有了...</span>
            )}
            {fetchState === "open" && (
              <Button onClick={loadMore} type="primary">
                加载更多
              </Button>
            )}
            {fetchState === "close" && <Button type="primary">加载更多</Button>}
          </div>
        ) : (
          <div className={styles.loadBar}>
            {fetchState === "finish" ? (
              <span>很高兴你能够看到这里，不过真的没有了...</span>
            ) : (
              <span>
                <Icon
                  type="loading-3-quarters"
                  style={{ marginRight: 5 }}
                  spin
                />
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
};

export default Home;
