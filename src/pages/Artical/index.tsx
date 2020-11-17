import React, { FC, useEffect, useState, useRef } from "react";

import {
  EditOutlined,
  GithubFilled,
  LikeFilled,
  MessageFilled,
  StarFilled,
  WechatFilled,
  WeiboCircleFilled
} from "@ant-design/icons";

import { Spin, Affix, Button } from "antd";
import { history } from "umi";
import moment from "js-moment";
import classnames from "classnames";
import { offset } from "@/utils/utils";
import Img from "@/components/Img";
import { getArtical } from "@/services/artical";
import MdArtical, { MdMenus } from "./components/MdArtical";

import styles from "./index.less";

interface articalProps {
  location: any;
}

// 定义文章内容接口
interface articalDataProps {
  banner?: string;
  createTime?: string;
  introduction?: string;
  likeCount?: number;
  readCount?: number;
  title?: string;
  mainContent?: string;
}

// class MenuAnchor {
//   htmlStr: string;
//   constructor(props: string) {
//     this.htmlStr = props;
//   }
//   static a = '1';
//   public b = '2';
  
// }

// 文章
const Artical: FC<articalProps> = ({ location }): React.ReactElement => {
  const { query } = location;
  const { id } = query;
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [articalData, setArticalData] = useState<articalDataProps>({});
  const toolsRef = useRef(null);
  const {
    banner = "",
    title = "",
    createTime = "",
    likeCount = 0,
    readCount = 0,
    introduction = "",
    mainContent = ""
  } = articalData;

  // 获取文章数据
  const fetchData = (): void => {
    setPageLoading(true);
    getArtical({ id })
      .then((res: any) => {
        const { code, data, message } = res;
        setPageLoading(false);
        if (code === 0) {
          setArticalData(data);
        } else {
          console.error(message);
        }
      })
      .catch(e => {
        console.warn(e);
      });
  };

  // 编辑文章
  const editArtical = (): void => {
    history.push({
      pathname: "/editor",
      query: { id }
    });
  };

  // 初始化页面数据
  const initPage = () => {
    // initMarkdownStyle();
    fetchData();
  };

  useEffect(() => {
    initPage();
  }, []);

  const toolsTop = (() => {
    const toolsDomHeight = offset(toolsRef.current).height;
    const clientHeight = document.body.clientHeight;
    return (clientHeight - toolsDomHeight) / 2;
  })();

  return (
    <div>
      {pageLoading ? (
        <div className={styles.pageStyle}>
          <Spin spinning />
        </div>
      ) : (
        <div className={styles.Artical}>
          <div className={styles.banner}>
            <Img
              src={banner}
              alt="banner"
              style={{ position: "absolute" }}
              loading
            />
            <div className={styles.artTitle}>
              <div>
                <span className={styles.title}>{title}</span>
                <div className={styles.infoBar}>
                  <span>{moment(createTime).format("YYYY-MM-DD")}</span>
                  <span className={styles.cercle} />
                  <span>{likeCount || 0}人喜欢</span>
                  <span className={styles.cercle} />
                  <span>{readCount || 0}次阅读</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mainBody}>
            <div className={styles.centerContent}>
              <div className={styles.tools_bar} ref={toolsRef}>
                <Affix offsetTop={toolsTop}>
                  <div className={styles.tools_bar_content}>
                    <span
                      className={classnames(
                        styles.tools_icon,
                        likeCount > 0 ? styles.badge : ""
                      )}
                      data-badge={likeCount}
                    >
                      <LikeFilled />
                    </span>
                    <span
                      className={classnames(
                        styles.tools_icon,
                        readCount > 0 ? styles.badge : ""
                      )}
                      data-badge={readCount}
                    >
                      <MessageFilled />
                    </span>
                    <span className={styles.tools_icon} data-badge={null}>
                      <StarFilled />
                    </span>
                    <span className={styles.tools_icon} data-badge={null}>
                      <WeiboCircleFilled />
                    </span>
                    <span className={styles.tools_icon} data-badge={null}>
                      <WechatFilled />
                    </span>
                    <span className={styles.tools_icon} data-badge={null}>
                      <GithubFilled />
                    </span>
                  </div>
                </Affix>
              </div>
              <div className={styles.articalHead}>
                <span className={styles.title}>前言</span>
                <div className={styles.content}>
                  <span>{introduction}</span>
                </div>
              </div>
              {/* <div
                className={styles.articalBody}
                dangerouslySetInnerHTML={{ __html: htmlStr }}
              /> */}
              <div className={styles.articalBody}>
                <MdArtical>{mainContent}</MdArtical>
              </div>
            </div>
            <div className={styles.rightContent}>
              <Affix offsetTop={86}>
                <MdMenus markdownString={mainContent} />
              </Affix>
            </div>
          </div>
          <Affix offsetBottom={20}>
            <Button
              style={{ position: "absolute", bottom: 20, right: 20 }}
              type="primary"
              shape="round"
              icon={<EditOutlined />}
              onClick={editArtical}
            />
          </Affix>
        </div>
      )}
    </div>
  );
};

export default Artical;
