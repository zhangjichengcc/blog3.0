import React, { Component } from 'react';
import moment from 'moment';
import { Icon, Button, Input, Row, Col, DatePicker, message, Switch, Spin, Tooltip } from 'antd';
// import Charts from '@/components/Charts';
import SimpleMDE from "react-simplemde-editor";
import styles from './index.less';
import "easymde/dist/easymde.min.css";
import { uploadImg } from '@/services/image';
import { uploadArtical } from '@/services/artical';
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
    banner: null,
    publish: true,
    createTime: moment(new Date()).format('YYYY-MM-DD HH:MM'),
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

  uploadeArtImg = () => {
    const { uploadImgBtn } = this;
    uploadImgBtn.click();
  }

  uploadeBanImg = () => {
    const { uploadBanBtn } = this;
    uploadBanBtn.click();
  }



  handleChange = (value) => {
    this.setState({
      editorText: `${value}`,
    })
  }

  uploadImg = (tar, type) => {
    const file = tar.target.files[0];
    const formData = new FormData();
    const { editorText } = this.state;
    // message.loading('图片上传中...', 0);
    formData.append('upload', file);
    uploadImg(formData).then(res => {
      const { code, data } = res;
      if (code === -1) {
        message.error('图片上传失败！');
      } else {
        message.success('图片上传成功');
        if (type === 'banner') {
          this.setState({
            banner: data,
          })
        } else {
          this.setState({
            editorText: `${editorText} ![](${data})`,
          })
        }
      }
    })
  };

  titleChange = (obj) => {
    const { value } = obj.target;
    this.setState({
      title: value,
    });
  };

  timeChange = (momentObj) => {
    if(!momentObj) return;
    const time = momentObj.format('YYYY-MM-DD HH:MM');
    this.setState({
      createTime: time,
    });
  };

  isPublish = (value) => {
    this.setState({ publish: value });
  };

  introduceChange = (obj) => {
    const { value } = obj.target;
    this.setState({
      introduction: value,
    });
  };

  submit = () => {
    const { title, createTime, publish, editorText, introduction, banner = null } = this.state;
    const params = {
      title,
      createTime,
      publish,
      mainContent: editorText,
      introduction,
      banner,
    }
    this.setState({loading: true});
    uploadArtical(params).then(res => {
      const { code } = res;
      if (code === -1) {
        message.error('文章提交失败！');
      } else {
        message.success('文章提交成功');
      }
      this.setState({
        loading: false,
        editorText: '',
        title: '',
        introduction: '',
      }, () => {
        localStorage.removeItem('smde_editorCatchValues');
      })
    })
  }

  render() {
    const { 
      title = '',
      editorText = '',
      createTime,
      introduction = '',
      banner = null,
      publish,
      loading = false,
    } = this.state;

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
          action: this.uploadeArtImg,
          className: `fa ${styles.aaa}`,
          title: "upload image",
        },
        '|', 'preview', 'side-by-side', 'fullscreen',
      ],
      placeholder: "请使用 markdown 语法编辑文章",
    }

    return (
      <div className={styles.Editor}>
        <input style={{ display: 'none' }} onChange={e => { this.uploadImg(e, 'artical'); }} ref={(c) => {this.uploadImgBtn = c}} type="file" accept="image/*" />
        <input style={{ display: 'none' }} onChange={e => { this.uploadImg(e, 'banner'); }} ref={(c) => {this.uploadBanBtn = c}} type="file" accept="image/*" />
        <Row type="flex" justify="space-around" style={{ paddingBottom: 40 }} align="middle">
          <Col {...formItemLayout.labelCol}>
            <span className={styles.label}>发布时间：</span>
          </Col>
          <Col {...formItemLayout.wrapperCol}>
            <DatePicker
              format="YYYY-MM-DD HH:MM"
              onChange={this.timeChange}
              value={moment(createTime)}
              showTime='0000-00-00: 00:00'
            />
          </Col>
        </Row>
        <Row type="flex" justify="space-around" style={{ paddingBottom: 40 }} align="middle">
          <Col {...formItemLayout.labelCol}>
            <span className={styles.label}>是否公开：</span>
          </Col>
          <Col {...formItemLayout.wrapperCol}>
            <Switch
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              checked={publish}
              onChange={this.isPublish}
            />
          </Col>
        </Row>
        <Row type="flex" justify="space-around" style={{ paddingBottom: 40 }} align="middle">
          <Col {...formItemLayout.labelCol}>
            <span className={styles.label}>文章标题：</span>
          </Col>
          <Col {...formItemLayout.wrapperCol}>
            <Input placeholder="请输入文章标题" value={title} onChange={this.titleChange} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around" style={{ paddingBottom: 40 }} align="top">
          <Col {...formItemLayout.labelCol}>
            <span className={styles.label}>文章banner：</span>
          </Col>
          <Col {...formItemLayout.wrapperCol}>
            <div className={styles.bannerArea} style={banner ? {backgroundImage: `url(${banner})`} : {}}>
              {
                banner ? (
                  <div className={styles.bannerImgEdit}>
                    <div className={styles.btnGroup}>
                      <Tooltip placement="top" title="预览">
                        <span><Icon type="eye" /></span>
                      </Tooltip>
                      <Tooltip placement="top" title="删除">
                        <span><Icon type="delete" /></span>
                      </Tooltip>
                    </div>
                  </div>
                ) : (
                  <div className={styles.btnGroup}>
                    <Tooltip placement="top" title="上传图片">
                      <span onClick={this.uploadeBanImg} style={{fontSize: 50}}><Icon type="plus" /></span>
                    </Tooltip>
                  </div>
                )
              }
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" style={{ paddingBottom: 40 }} align="top">
          <Col {...formItemLayout.labelCol}>
            <span className={styles.label}>文章简介：</span>
          </Col>
          <Col {...formItemLayout.wrapperCol}>
            <TextArea
              placeholder="请输入文章简介"
              value={introduction}
              onChange={this.introduceChange}
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
        <div className={styles.btnGroup}>
          <Button type="primary" style={{ padding: '0 50px' }} onClick={this.submit} loading={loading}>提交</Button>
        </div>
        <Spin spinning={loading} tip="Loading..." className={styles.spin} />
      </div>
    );
  }
}

export default Home;
