import React, { Component } from 'react';
// import { Icon, Popover, Alert, BackTop, Button } from 'antd';
// import Charts from '@/components/Charts';
import marked from 'marked';
import router from 'umi/router';
import highlight  from 'highlight.js'
import styles from './index.less';
import Img from '@/components/Img';
import { getArtical } from '@/services/artical';
import 'highlight.js/styles/atom-one-dark.css';
// import Ellipsis from '@/components/Ellipsis';


// const { TagCloud } = Charts;

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code) => {
    return highlight.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

class Home extends Component {
  state = {
    id: undefined,
  };

  componentDidMount() {
    this.initData();
    global.that = this;
  }

  componentWillUnmount() {}

  initData = () => {
    const { location } = this.props;
    const { query } = location;
    const { id = undefined } = query;
    if(!id) router.push('/');
    this.setState({
      id,
    }, () => {
      this.fetchArtical();
    })
  };

  fetchArtical = () => {
    const { id } = this.state;
    getArtical({id}).then(res => {
      const { code, data, message } = res;
      if(code === 0) {
        const { 
          banner, 
          // createTime, 
          // introduction, 
          // likeCount, 
          // readCount, 
          // title, 
          // artical, 
          mainContent } = data;
        this.setState({
          banner,
          // createTime,
          // introduction,
          // likeCount,
          // readCount,
          // title,
          mainContent,
        })
      } else {
        console.error(message);
      }
    })
  }

  render() {
    const { mainContent = '', banner } = this.state;
    const markedHTML = marked(mainContent || '');
    return (
      <div className={styles.Artical}>
        <div className={styles.leftContent}>
          leftBar
        </div>
        <div className={styles.centerContent}>
          <div className={styles.banner}>
            <Img
              src={banner}
              alt="banner"
              style={{position: 'absolute'}}
              loading
            />
          </div>
          {/* eslint-disable-next-line react/no-danger */}
          <div className={styles.articalBody} dangerouslySetInnerHTML={{ __html: markedHTML }} />
        </div>
        <div className={styles.rightContent}>
          rightBar
        </div>
      </div>
    );
  }
}

export default Home;
