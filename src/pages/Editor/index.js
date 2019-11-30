import React, { Component } from 'react';
import moment from 'moment';
import {
  Icon,
  Button,
  Input,
  Row,
  Col,
  DatePicker,
  message,
  Switch,
  Spin,
  Tooltip,
  Progress,
  Modal,
} from 'antd';
// import Charts from '@/components/Charts';
import SimpleMDE from 'react-simplemde-editor';
import router from 'umi/router';
import styles from './index.less';
import 'easymde/dist/easymde.min.css';
import { uploadImg } from '@/services/image';
import { insertArtical, updateArtical, getArtical, deleteArtical } from '@/services/artical';
import { pageLoading, timeout } from '@/utils/utils';
// import Ellipsis from '@/components/Ellipsis';

// const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { confirm } = Modal;

const getBase64 = file => {
  // eslint-disable-next-line compat/compat
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

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
    createTime: null,
  };

  componentDidMount() {
    global.Editor = this;
    global.moment = moment;
    this.initPage();
  }

  componentWillUnmount() {}

  // createEditor = () => {};

  // 载入文章信息
  initEditerData = id => {
    getArtical({ id }).then(res => {
      const { code, data = {} } = res;
      if (code === 0) {
        const { banner, createTime, introduction, mainContent, title } = data;
        this.setState(
          {
            banner,
            createTime,
            introduction,
            editorText: mainContent,
            title,
          },
          () => {
            timeout(pageLoading, [0], 1000);
          },
        );
      } else {
        message.warn('获取文章信息失败！');
        pageLoading(0);
      }
    });
  };

  initPage = () => {
    const {
      location: { query },
    } = this.props;
    const { id } = query;
    if (id) {
      // 当前为编辑文章
      pageLoading(1);
      this.initEditerData(id);
    }
  };

  // 点击上传文章内图片
  uploadeArtImg = () => {
    const { uploadImgBtn } = this;
    uploadImgBtn.click();
  };

  // 点击上传banner按钮
  uploadeBanImg = () => {
    const { uploadBanBtn } = this;
    uploadBanBtn.click();
  };

  // 输入文本内容
  handleChange = value => {
    this.setState({
      editorText: `${value}`,
    });
  };

  // banner 上传完成调用，延迟隐藏进度条
  bannerUploaded = () => {
    setTimeout(() => {
      this.setState({
        showPercent: false,
      });
    }, 1000);
  };

  // XHR 请求方式，获取进度
  uploadXHR = formData => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/image/uploadImage');
    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        this.setState({ percent });
      }
    };
    xhr.onload = res => {
      const {
        target: { response = {} },
      } = res;
      const { code, data } = JSON.parse(response);
      if (code === -1) {
        message.error('图片上传失败！');
        this.setState(
          {
            progressStatus: 'error',
            banner: null,
          },
          () => {
            this.bannerUploaded();
          },
        );
      } else {
        message.success('图片上传成功');
        this.setState(
          {
            relBanner: data,
            percent: 100,
            progressStatus: 'success',
          },
          () => {
            this.bannerUploaded();
          },
        );
      }
    };
    xhr.send(formData);
  };

  // fetch 请求方式，项目通用方式
  uploadFetch = (formData, editorText) => {
    uploadImg(formData).then(res => {
      const { code, data } = res;
      if (code === -1) {
        message.error('图片上传失败！');
      } else {
        message.success('图片上传成功');
        this.setState({
          editorText: `${editorText} ![](${data})`,
        });
      }
    });
  };

  // 上传文件
  uploadImg = (tar, type) => {
    const file = tar.target.files[0];
    const formData = new FormData();
    const { editorText } = this.state;
    formData.append('upload', file);
    if (type === 'banner') {
      getBase64(file).then(res => {
        this.setState(
          {
            banner: res,
            progressStatus: 'active',
            showPercent: true,
          },
          () => {
            this.uploadXHR(formData);
          },
        );
      });
    } else {
      this.uploadFetch(formData, editorText);
    }
  };

  // 输入标题
  titleChange = obj => {
    const { value } = obj.target;
    this.setState({
      title: value,
    });
  };

  // 修改日期
  timeChange = (momentObj, str) => {
    if (!momentObj) return;
    this.setState({
      createTime: str,
    });
  };

  isPublish = value => {
    this.setState({ publish: value });
  };

  introduceChange = obj => {
    const { value } = obj.target;
    this.setState({
      introduction: value,
    });
  };

  // 提交文章
  submit = () => {
    const { title, createTime, publish, editorText, introduction, relBanner = null } = this.state;
    const {
      location: { query = {} },
    } = this.props;
    const params = {
      title,
      createTime,
      publish,
      mainContent: editorText,
      introduction,
      banner: relBanner,
    };
    this.setState({ loading: true });
    // 有id则为更新，否则为新建
    if (query.id) {
      updateArtical({ ...params, id: query.id }).then(res => {
        const { code, data } = res;
        const { id } = data;
        if (code === -1) {
          message.error('文章提交失败！');
        } else {
          message.success('文章提交成功');
          router.push(`/artical?id=${id}`);
          this.setState({
            loading: false,
            editorText: '',
            title: '',
            introduction: '',
          });
        }
      });
    } else {
      insertArtical(params).then(res => {
        const { code, data } = res;
        const { id } = data;
        if (code === -1) {
          message.error('文章提交失败！');
        } else {
          message.success('文章提交成功');
          router.push(`/artical?id=${id}`);
          this.setState({
            loading: false,
            editorText: '',
            title: '',
            introduction: '',
          });
        }
      });
    }
  };

  // 删除文章
  beforeDelete = () => {
    confirm({
      title: '确认删除该文章？',
      content: '删除操作不可逆，请谨慎操作！',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const {
          location: { query },
        } = this.props;
        const { id } = query;
        deleteArtical({ id }).then(res => {
          const { code } = res;
          if (code === 0) {
            message.success('操作完成！');
            router.replace('/');
          }
        });
      },
    });
  };

  render() {
    const {
      title = '',
      editorText = '',
      createTime,
      introduction = '',
      banner = null,
      publish,
      loading = false,
      showPercent = false,
      percent = 0,
      progressStatus = 'active',
    } = this.state;
    const {
      location: { query },
    } = this.props;
    const { id } = query;

    const options = {
      // autosave: {
      //   enabled: true,
      //   uniqueId: 'editorCatchValues',
      //   delay: 1000,
      // },
      toolbar: [
        'bold',
        'italic',
        'strikethrough',
        'code',
        '|',
        'quote',
        'unordered-list',
        'ordered-list',
        'clean-block',
        'table',
        '|',
        'link',
        {
          name: 'image',
          action: this.uploadeArtImg,
          className: 'fa fa-image',
          title: 'image',
        },
        '|',
        'preview',
        'side-by-side',
        'fullscreen',
      ],
      placeholder: '请使用 markdown 语法编辑文章',
    };

    return (
      <div className={styles.Editor}>
        <input
          style={{ display: 'none' }}
          onChange={e => {
            this.uploadImg(e, 'artical');
          }}
          ref={c => {
            this.uploadImgBtn = c;
          }}
          type="file"
          accept="image/*"
        />
        <input
          style={{ display: 'none' }}
          onChange={e => {
            this.uploadImg(e, 'banner');
          }}
          ref={c => {
            this.uploadBanBtn = c;
          }}
          type="file"
          accept="image/*"
        />
        <Row type="flex" justify="space-around" style={{ paddingBottom: 40 }} align="middle">
          <Col {...formItemLayout.labelCol}>
            <span className={styles.label}>发布时间：</span>
          </Col>
          <Col {...formItemLayout.wrapperCol}>
            <DatePicker
              // format="YYYY-MM-DD hh:mm"
              onChange={this.timeChange}
              value={createTime && moment(createTime)}
              showTime
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
            <div
              className={styles.bannerArea}
              style={banner ? { backgroundImage: `url(${banner})` } : {}}
            >
              {banner ? (
                <div className={styles.bannerImgEdit}>
                  <div className={styles.btnGroup}>
                    <Tooltip placement="top" title="预览">
                      <span>
                        <Icon type="eye" />
                      </span>
                    </Tooltip>
                    <Tooltip placement="top" title="删除">
                      <span>
                        <Icon type="delete" />
                      </span>
                    </Tooltip>
                  </div>
                </div>
              ) : (
                <div className={styles.btnGroup}>
                  <Tooltip placement="top" title="上传图片">
                    <span onClick={this.uploadeBanImg} style={{ fontSize: 50 }}>
                      <Icon type="plus" />
                    </span>
                  </Tooltip>
                </div>
              )}
              {showPercent && (
                <div className={styles.progressBox}>
                  <Progress percent={percent} status={progressStatus} />
                </div>
              )}
              {/* {showPercent && <div style={{width: `${100 - percent}%`}} className={styles.progress}>{percent}</div>} */}
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
            <SimpleMDE onChange={this.handleChange} value={editorText} options={options} />
          </Col>
        </Row>
        <div className={styles.btnGroup}>
          <Button
            type="primary"
            style={{ padding: '0 50px', margin: '0 20px' }}
            onClick={this.submit}
            loading={loading}
          >
            提交
          </Button>
          {id && (
            <Button
              type="danger"
              style={{ padding: '0 50px', margin: '0 20px' }}
              onClick={this.beforeDelete}
            >
              删除
            </Button>
          )}
        </div>
        <Spin spinning={loading} tip="Loading..." className={styles.spin} />
      </div>
    );
  }
}

export default Home;
