import React, { Component } from 'react';
import { Spin, Anchor, Affix, Button } from 'antd';
// import Charts from '@/components/Charts';
import marked from 'marked';
import router from 'umi/router';
import highlight from 'highlight.js';
import moment from 'js-moment';
import pinyin from 'pinyin';
import classnames from 'classnames';
import styles from './index.less';
import Img from '@/components/Img';
import { getArtical } from '@/services/artical';
import 'highlight.js/styles/atom-one-dark.css';
// import Ellipsis from '@/components/Ellipsis';

// const { TagCloud } = Charts;
const { Link } = Anchor;

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: code => {
    return highlight.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

class Home extends Component {
  state = {
    id: undefined,
    pageLoading: false,
  };

  componentDidMount() {
    this.initData();
    global.that = this;
    global.pinyin = pinyin;
  }

  componentWillUnmount() {}

  // 初始化页面数据
  initData = () => {
    const { location } = this.props;
    const { query } = location;
    const { id = undefined } = query;
    if (!id) router.push('/');
    this.setState(
      {
        id,
      },
      () => {
        this.fetchArtical();
      },
    );
  };

  // 请求文章数据
  fetchArtical = () => {
    const { id } = this.state;
    this.setState({ pageLoading: true });
    getArtical({ id }).then(res => {
      const { code, data, message } = res;
      if (code === 0) {
        const {
          banner,
          createTime,
          // introduction,
          likeCount,
          readCount,
          title,
          // artical,
          mainContent,
        } = data;
        this.setState({
          banner,
          pageLoading: false,
          createTime,
          // introduction,
          likeCount,
          readCount,
          title,
          mainContent,
        });
      } else {
        this.setState({ pageLoading: false });
        console.error(message);
      }
    });
  };

  // 点击锚点
  handleClick = e => {
    // params (@e, @link)
    e.preventDefault();
  };

  // 生成文章导航-pc
  displayNav = () => {
    const { mainContent = '' } = this.state;
    const reg = new RegExp('#+\\s+.*', 'g');
    const options = {
      offsetTop: 86,
      onClick: this.handleClick,
      showInkInFixed: true,
      // targetOffset: -300,
      // bounds: 1000,
    };
    const navListSource = (mainContent && mainContent.match(reg)) || [];
    const titleObj = navListSource.map(v => ({
      level: v.replace(/(^#+).*/, '$1').match(/#/g).length,
      title: v.replace(/^#+\s?/, ''),
      text: v,
    }));
    return titleObj.length ? (
      <Anchor {...options}>
        {titleObj.map((item = {}, idx) => {
          const { title, level } = item;
          const keys = `key_${idx + 1}`;
          const anchor = this.displayHZ(title.replace(/\s/g, ''));
          return (
            <Link
              key={keys}
              href={`#${anchor}`}
              title={
                <span className={classnames(styles.anchor, styles[`h${level}`])}>{title}</span>
              }
            />
          );
        })}
      </Anchor>
    ) : (
      ''
    );
  };

  // 将汉字转为拼音
  displayHZ = (val = '') => {
    if (!val) return '';
    let str = '';
    pinyin(val, { style: pinyin.STYLE_NORMAL }).forEach((v, idx) => {
      str += idx === 0 ? v[0] : `-${v[0]}`;
    });
    return str;
  };

  // 格式化marked文本，使其支持锚点
  displayMarkdown = (text = '') => {
    if (!text) return '';
    const newText = text.replace(/#+\s+(.*)([\n|\r])/g, ($0, $1) => {
      const anchor = this.displayHZ($1.replace(/\s/g, ''));
      return `${$0}<p style="height: 0; margin: 0; overflow: hidden;"><a id="${anchor}" href="#${anchor}" name="${anchor}" class="anchor">#</a></p>`;
    });
    return newText;
  };

  // 编辑文章
  editArt = () => {
    const { location } = this.props;
    const { query } = location;
    const { id = undefined } = query;
    if (id)
      router.push({
        pathname: '/editor',
        query: {
          id,
        },
      });
  };

  render() {
    const {
      pageLoading = false,
      mainContent = '',
      banner,
      title,
      createTime,
      likeCount = 0,
      readCount = 0,
      // drawerVisiable = false, // 移动端 导航抽屉
    } = this.state;

    const markedHTML = marked(this.displayMarkdown(mainContent));
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
              <div className={styles.leftContent}>
                {/* <div>
                  <p>这是广告</p>
                  <p>是广告这</p>
                  <p>广告这是</p>
                  <p>告这是广</p>
                </div> */}
                {this.displayNav()}
              </div>
              <div className={styles.centerContent}>
                {/* eslint-disable-next-line react/no-danger */}
                <div
                  className={styles.articalBody}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: markedHTML }}
                />
                {/* </Card> */}
              </div>
              <div className={styles.rightContent}>
                {/* <Button onClick={() => {this.setState({drawerVisiable: true})}}>导航</Button> */}
              </div>
            </div>
            {/* 移动端展示导航抽屉 */}
            {/* 移动端抽屉按钮 */}
            {/* <Button type="primary" shape="circle" icon="search" onClick={() => {this.setState({drawerVisiable: true})}} /> */}
            <Affix offsetBottom={20} style={{ position: 'absolute', bottom: 20, right: 20 }}>
              <Button type="primary" shape="round" icon="edit" onClick={this.editArt} />
            </Affix>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
