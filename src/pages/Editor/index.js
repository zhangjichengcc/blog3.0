import React, { Component } from 'react';
// import { Icon, Popover, Alert, BackTop, Button } from 'antd';
// import Charts from '@/components/Charts';
// import marked from 'marked';
import SimpleMDE from "react-simplemde-editor";
import styles from './index.less';
import "easymde/dist/easymde.min.css";
// import Ellipsis from '@/components/Ellipsis';

class Home extends Component {
  state = {
    editorText: '',
  };

  componentDidMount() {
    global.Editor = this;
    this.createEditor();
    this.initData();
  }

  componentWillUnmount() {}

  createEditor = () => {

  }

  initData = () => {
    // this.fetchArtical();
  };



  handleChange = (value) => {
    this.setState({editorText: value});
    console.log(value)
  }

  render() {
    const { editorText = ''} = this.state;
    const options = {
      autosave: {
        enabled: true,
        uniqueId: 101,
        delay: 1000,
      },
      customToolbar: {
        save: {
          text: '保存',
          handler: () => {
            console.log('保存')
          },
        },
      },
    }
    return (
      <div className={styles.Editor}>
        <SimpleMDE
          onChange={this.handleChange}
          value={editorText}
          options={options}
        />;
      </div>
    );
  }
}

export default Home;
