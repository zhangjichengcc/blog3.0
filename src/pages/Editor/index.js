import React, { Component } from 'react';
import { Icon, Popover, Alert, BackTop, Button, Input, Form, Row, Col, Upload, DatePicker } from 'antd';
// import Charts from '@/components/Charts';
// import marked from 'marked';
import SimpleMDE from "react-simplemde-editor";
import styles from './index.less';
import "easymde/dist/easymde.min.css";
import { uploadImg } from '@/services/editor';
// import Ellipsis from '@/components/Ellipsis';

// const { RangePicker } = DatePicker;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

class Home extends Component {
  state = {
    editorText: '',
    imageList: null,
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

  // banner 上传及删除
  chooseBanner = (list) => {
    const { file } = list;
    this.setState({
      imageList: [
        {
          ...file,
          status: 'success',
        }
      ],
    })
  }

  onRemove = () => {
    this.setState({
      imageList: null,
    })
  }

  onPreview = () => {
    return false;
  }

  render() {
    const { editorText = '', imageList } = this.state;
    const uploadProps = {
      listType: 'picture',
      onChange: this.chooseBanner,
      fileList: imageList,
      onPreview: this.onPreview,
      onRemove: this.onRemove,
    };
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
      placeholder: "请使用 markdown 语法编辑文章",
    }
    return (
      <div className={styles.Editor}>
        <input style={{ display: 'none' }} onChange={this.uploadImg} ref={(c) => {this.uploadBtn = c}} type="file" accept="image/*" />
        <Row type="flex" justify="space-around" style={{ paddingBottom: 40 }} align="middle">
          <Col {...formItemLayout.labelCol}>
            <span className={styles.label}>文章标题：</span>
          </Col>
          <Col {...formItemLayout.wrapperCol}>
            <Input placeholder="请输入文章标题" />
          </Col>
        </Row>
        <Row type="flex" justify="space-around" style={{ paddingBottom: 40 }} align="middle">
          <Col {...formItemLayout.labelCol}>
            <span className={styles.label}>文章banner：</span>
          </Col>
          <Col {...formItemLayout.wrapperCol}>
            <Upload {...uploadProps}>
              <Button>
                <Icon type="upload" /> 上传图片
              </Button>
            </Upload>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" style={{ paddingBottom: 40 }} align="middle">
          <Col {...formItemLayout.labelCol}>
            <span className={styles.label}>发布时间：</span>
          </Col>
          <Col {...formItemLayout.wrapperCol}>
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              // disabledDate={disabledDate}
              // disabledTime={disabledDateTime}
              showTime='0000-00-00: 00:00:00'
            />
          </Col>
        </Row>
        <Row type="flex" justify="space-around" style={{ paddingBottom: 40 }} align="middle">
          <Col {...formItemLayout.labelCol}>
            <span className={styles.label}>文章简介：</span>
          </Col>
          <Col {...formItemLayout.wrapperCol}>
            <TextArea
              placeholder="Autosize height with minimum and maximum number of lines"
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          </Col>
        </Row>


        <Row type="flex" justify="space-around" style={{ paddingBottom: 40 }} align="top">
          <Col {...formItemLayout.labelCol}>
            <span className={styles.label}>文章正文：</span>
          </Col>
          <Col {...formItemLayout.wrapperCol}>
            <SimpleMDE
              onChange={this.handleChange}
              value={editorText}
              options={options}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
