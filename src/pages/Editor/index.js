import React, { Component } from 'react';
// import { Icon, Popover, Alert, BackTop, Button } from 'antd';
// import Charts from '@/components/Charts';
// import marked from 'marked';
import SimpleMDE from "react-simplemde-editor";
import styles from './index.less';
import "easymde/dist/easymde.min.css";
import { uploadImg } from '@/services/editor';
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

  checkUpLoad = () => {
    const { uploadBtn } = this;
    uploadBtn.click();
  }



  handleChange = (value) => {
    this.setState({
      editorText: `${value}`,
    })
  }

  uploadImg = (tar) => {
    const file = tar.target.files[0];
    uploadImg(file).then(res => {
      debugger
    })
  }

  render() {
    const { editorText = ''} = this.state;
    const options = {
      autosave: {
        enabled: true,
        uniqueId: 'editorCatchValues',
        delay: 1000,
      },
      toolbar: [
        'bold', 'italic', 'strikethrough', 'code', '|', 'quote', 'unordered-list', 'ordered-list', 'clean-block', 'table', '|', 'link', 'image',
        {
          name: "uploadImg",
          action: this.checkUpLoad,
          className: `fa ${styles.aaa}`,
          title: "upload image",
        },
        '|', 'preview', 'side-by-side', 'fullscreen',
      ],
      placeholder: "使用 markdown 语法创建文章",
    }
    return (
      <div className={styles.Editor}>
        <input style={{ display: 'none' }} onChange={this.uploadImg} ref={(c) => {this.uploadBtn = c}} type="file" accept="image/*" />
        <SimpleMDE
          onChange={this.handleChange}
          value={editorText}
          options={options}
        />
      </div>
    );
  }
}

export default Home;
