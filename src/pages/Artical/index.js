import React, { Component } from 'react';
// import { Icon, Popover, Alert, BackTop, Button } from 'antd';
// import Charts from '@/components/Charts';
import marked from 'marked';
import styles from './index.less';
// import Ellipsis from '@/components/Ellipsis';


// const { TagCloud } = Charts;
const input = localStorage.getItem('aa');

const output = marked(input);

class Home extends Component {
  state = {
    
  };

  componentDidMount() {
    this.initData();
  }

  componentWillUnmount() {}

  initData = () => {
    // this.fetchArtical();
  };

  render() {
    return (
      <div className={styles.Artical}>
        <div dangerouslySetInnerHTML={{ __html: output }} />
        {/* {output} */}
      </div>
    );
  }
}

export default Home;
