import React, { FC, useEffect, useState } from 'react';
import { Spin, Anchor, Affix, Button, Icon } from 'antd';
// import Charts from '@/components/Charts';
import marked from 'marked';
import router from 'umi/router';
import highlight from 'highlight.js';
import moment from 'js-moment';
import pinyin from 'pinyin';
import classnames from 'classnames';
import Ellipsis from '@/components/Ellipsis';
import Img from '@/components/Img';
import { getArtical } from '@/services/artical';
import 'highlight.js/styles/atom-one-dark.css';

const { Link } = Anchor;

import styles from './index.less';

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

const displayHZ = (val = '') => {
  if (!val) return '';
  let str = '';
  pinyin(val, { style: pinyin.STYLE_NORMAL }).forEach((v: any[], idx: number) => {
    str += idx === 0 ? v[0] : `-${v[0]}`;
  });
  return str;
};

// 文章导航
const MenuList: FC<{markdownString: string}> = ({
  markdownString,
}): React.ReactElement => {

  const handleClick = (e: { preventDefault: () => void; }) => {
    // params (@e, @link)
    e.preventDefault();
  };

  const options = {
    offsetTop: 86,
    onClick: handleClick,
    showInkInFixed: true,
    // targetOffset: -300,
    // bounds: 1000,
  };

  const navListSource = markdownString?.match(/#+\s+(.*)?/g) || [];
  const titleObj = navListSource.map((v: any = '') => ({
    level: v?.match(/^#+/g)[0]?.length,
    title: v?.replace(/^#+\s+/, ''),
    text: v,
  }));

  return (
    <Anchor {...options}>
      {titleObj.map((item: any = {}, idx) => {
        const { title, level } = item;
        const keys = `key_${idx + 1}`;
        return (
          <Link
            key={keys}
            href={`#${title}`}
            title={<span className={classnames(styles.anchor, styles[`h${level}`])}>{title}</span>}
          />
        );
      })}
    </Anchor>
  );
};

// 文章
const Artical: FC<articalProps> = ({
  location,
}): React.ReactElement => {

  const { query } = location;
  const { id } = query;
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [articalData, setArticalData] = useState<articalDataProps>({});
  const {
    banner = '',
    title = '',
    createTime = '',
    likeCount = 0,
    readCount = 0,
    introduction = '',
    mainContent = '',
  } = articalData;

  // 格式化marked文本，使其支持锚点
  const addAnchor = (text: string) => {
    if (typeof text !== 'string') return '';
    return text.replace(/#+\s+(.*)?(?=\s+)?/g, ($0, $1) => `${$0}<p style="height: 0; margin: 0; overflow: hidden;"><a id="${$1}" href="#${$1}" name="${$1}" class="anchor">#</a></p> \r`);
  };

  // 将markdown转义为html
  const htmlStr = marked(addAnchor(mainContent));

  // 初始化markdown样式
  const initMarkdownStyle = () => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: code => {
        return highlight.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
  }

  // 获取文章数据
  const fetchData = (): void => {
    setPageLoading(true);
    getArtical({ id }).then((res: any) => {
      const { code, data, message } = res;
      setPageLoading(false);
      if (code === 0) {
        setArticalData(data);
      } else {
        console.error(message);
      }
    }).catch(e => {
      console.warn(e);
    });
  }

  // 编辑文章
  const editArtical = (): void => {
    router.push({
      pathname: '/editor',
      query: { id },
    });
  }

  // 初始化页面数据
  const initPage = () => {
    initMarkdownStyle();
    fetchData();
  }

  useEffect(() => {
    initPage();
  }, []);

  return (
    <div>
      {pageLoading ? (
        <div className={styles.pageStyle}>
          <Spin spinning />
        </div>
      ) : (
        <div className={styles.Artical}>
          <div className={styles.banner}>
            <Img src={banner} alt="banner" style={{ position: 'absolute' }} loading />
            <div className={styles.artTitle}>
              <div>
                <span className={styles.title}>{title}</span>
                <div className={styles.infoBar}>
                  <span>{moment(createTime).format('YYYY-MM-DD')}</span>
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
              <div className={styles.tools_bar}>
                <Affix offsetTop={300}>
                  <div className={styles.tools_bar_content}>
                    <span className={styles.tools_icon_like}>
                      <i className={styles.msg_count}>1878</i>
                      <Icon type="like" theme="filled" />
                    </span>
                    <span className={styles.tools_icon_message}>
                      <i className={styles.msg_count}>1878</i>
                      <Icon type="message" theme="filled" />
                    </span>
                    <span className={styles.tools_icon_message}>
                      <Icon type="star" theme="filled" />
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
              <div
                className={styles.articalBody}
                dangerouslySetInnerHTML={{ __html: htmlStr }}
              />
            </div>
            <div className={styles.rightContent}>
              <MenuList markdownString={mainContent} />
            </div>
          </div>
          {/* 移动端展示导航抽屉 */}
          {/* 移动端抽屉按钮 */}
          <Affix offsetBottom={20} style={{ position: 'absolute', bottom: 20, right: 20 }}>
            <Button type="primary" shape="round" icon="edit" onClick={editArtical} />
          </Affix>
        </div>
      )}
    </div>
  )
}

export default Artical;