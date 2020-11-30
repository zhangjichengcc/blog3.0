import React, { Component } from "react";
import moment from "moment";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Form } from "antd";
import {
  Button,
  Input,
  DatePicker,
  message,
  Switch,
  Spin,
  Tooltip,
  Progress,
  Modal
} from "antd";
// import Charts from '@/components/Charts';
import SimpleMDE from "react-simplemde-editor";
import { history } from "umi";
import styles from "./index.less";
import "easymde/dist/easymde.min.css";
import { uploadImg } from "@/services/image";
import {
  insertArtical,
  updateArtical,
  getArtical,
  deleteArtical
} from "@/services/artical";
import { pageLoading, timeout, getBase64 } from "@/utils/utils";
// import Ellipsis from '@/components/Ellipsis';

const { TextArea } = Input;
const { confirm } = Modal;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

class Editor extends Component {
  state = {
    banner: null
  };

  componentDidMount() {
    global.Editor = this;
    global.moment = moment;
    this.initPage();
  }

  componentWillUnmount() {}

  // 载入文章信息
  loadArticalInfo = id => {
    const [form] = Form.useForm();
    const { setFieldsValue } = form;
    getArtical({ id }).then(res => {
      const { code, data = {} } = res;
      if (code === 0) {
        const {
          banner,
          createTime,
          introduction,
          mainContent,
          title,
          publish
        } = data;
        this.setState(
          {
            banner,
            base64Banner: banner
          },
          () => {
            setFieldsValue({
              createTime: moment(createTime),
              introduction,
              mainContent,
              title,
              publish
            });
            timeout(pageLoading, [0], 1000);
          }
        );
      } else {
        message.warn("获取文章信息失败！");
        pageLoading(0);
      }
    });
  };

  // 初始化文章信息
  initArtical = () => {
    const [form] = Form.useForm();
    const { setFieldsValue } = form;
    setFieldsValue({
      createTime: moment(),
      publish: true
    });
  };

  initPage = () => {
    const {
      location: { query }
    } = this.props;
    const { id } = query;
    if (id) {
      // 当前为编辑文章
      pageLoading(1);
      this.loadArticalInfo(id);
    } else {
      // 新建文章
      this.initArtical();
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

  // banner 上传完成调用，延迟隐藏进度条
  bannerUploaded = () => {
    setTimeout(() => {
      this.setState({
        showPercent: false
      });
    }, 1000);
  };

  // XHR 请求方式，获取进度
  uploadXHR = formData => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/image/uploadImage");
    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        this.setState({ percent });
      }
    };
    xhr.onload = res => {
      const {
        target: { response = {} }
      } = res;
      const { code, data } = JSON.parse(response);
      if (code === -1) {
        message.error("图片上传失败！");
        this.setState(
          {
            progressStatus: "error",
            banner: null,
            base64Banner: null
          },
          () => {
            this.bannerUploaded();
          }
        );
      } else {
        message.success("图片上传成功");
        this.setState(
          {
            banner: data,
            percent: 100,
            progressStatus: "success"
          },
          () => {
            this.bannerUploaded();
          }
        );
      }
    };
    xhr.send(formData);
  };

  // fetch 请求方式，项目通用方式
  uploadFetch = (formData, mainContent) => {
    const [form] = Form.useForm();
    const { setFieldsValue } = from;
    // const {
    //   form: { setFieldsValue }
    // } = this.props;
    uploadImg(formData).then(res => {
      const { code, data } = res;
      if (code === -1) {
        message.error("图片上传失败！");
      } else {
        message.success("图片上传成功");
        setFieldsValue("mainContent", `${mainContent} ![](${data})`);
      }
    });
  };

    // 

  // 上传 || 插入图片
  uploadImg = (tar, type) => {
    const [form] = Form.useForm();
    const mainContent = form.getFieldValue("mainContent");
    const file = tar.target.files[0];
    const formData = new FormData();
    formData.append("upload", file);
    if (type === "banner") {
      getBase64(file).then(res => {
        this.setState(
          {
            base64Banner: res,
            progressStatus: "active",
            showPercent: true
          },
          () => {
            this.uploadXHR(formData);
          }
        );
      });
    } else {
      this.uploadFetch(formData, mainContent);
    }
  };

  // 提交文章
  submit = () => {
    const { banner = null } = this.state;
    const [form] = Form.useForm();
    const {
      location: { query = {} }
    } = this.props;
    const { getFieldsValue } = form;
    const {
      title,
      createTime,
      publish,
      mainContent,
      introduction
    } = getFieldsValue();
    const params = {
      title,
      createTime: moment(createTime).format("YYYY-MM-DD hh:mm:ss"),
      publish,
      mainContent,
      introduction,
      banner
    };
    const next = res => {
      const { code, data = {} } = res;
      const { id } = data;
      this.setState({ loading: false });
      if (code === -1) {
        message.error("文章提交失败！");
      } else {
        message.success("文章提交成功");
        history.push(`/artical?id=${id}`);
      }
    };
    this.setState({ loading: true });
    // 有id则为更新，否则为新建
    if (query.id) {
      updateArtical({ ...params, id: query.id }).then(res => {
        next(res);
      });
    } else {
      insertArtical(params).then(res => {
        next(res);
      });
    }
  };

  // 删除文章
  beforeDelete = () => {
    confirm({
      title: "确认删除该文章？",
      content: "删除操作不可逆，请谨慎操作！",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        const {
          location: { query }
        } = this.props;
        const { id } = query;
        deleteArtical({ id }).then(res => {
          const { code } = res;
          if (code === 0) {
            message.success("操作完成！");
            history.replace("/");
          }
        });
      }
    });
  };

  render() {
    const {
      base64Banner = null,
      loading = false,
      showPercent = false,
      percent = 0,
      progressStatus = "active"
    } = this.state;
    const {
      location: { query }
    } = this.props;
    const [form] = Form.useForm();
    const { getFieldDecorator } = form;
    const { id } = query;

    const options = {
      toolbar: [
        "bold",
        "italic",
        "strikethrough",
        "code",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "clean-block",
        "table",
        "|",
        "link",
        {
          name: "image",
          action: this.uploadeArtImg,
          className: "fa fa-image",
          title: "image"
        },
        "|",
        "preview",
        "side-by-side",
        "fullscreen"
      ],
      placeholder: "请使用 markdown 语法编辑文章"
    };

    return (
      <div className={styles.Editor}>
        <input
          style={{ display: "none" }}
          onChange={e => {
            this.uploadImg(e, "artical");
          }}
          ref={c => {
            this.uploadImgBtn = c;
          }}
          type="file"
          accept="image/*"
        />
        <input
          style={{ display: "none" }}
          onChange={e => {
            this.uploadImg(e, "banner");
          }}
          ref={c => {
            this.uploadBanBtn = c;
          }}
          type="file"
          accept="image/*"
        />
        <Form {...formItemLayout}>
          <Form.Item
            label="发布时间："
            name="createTime"
            rules={[{ required: true, message: "请选择发布时间!" }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="公开"
            name="publish"
            valuePropName="checked"
            rules={[{ required: true }]}
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>
          <Form.Item
            label="文章标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题!" }]}
          >
            <Input placeholder="请输入文章标题" />
          </Form.Item>
          <Form.Item label="文章banner：" name="banner">
            <div
              className={styles.bannerArea}
              style={
                base64Banner ? { backgroundImage: `url(${base64Banner})` } : {}
              }
            >
              {base64Banner ? (
                <div className={styles.bannerImgEdit}>
                  <div className={styles.btnGroup}>
                    <Tooltip placement="top" title="预览">
                      <span>
                        <EyeOutlined />
                      </span>
                    </Tooltip>
                    <Tooltip placement="top" title="删除">
                      <span>
                        <DeleteOutlined />
                      </span>
                    </Tooltip>
                  </div>
                </div>
              ) : (
                <div className={styles.btnGroup}>
                  <Tooltip placement="top" title="上传图片">
                    <span onClick={this.uploadeBanImg} style={{ fontSize: 50 }}>
                      <PlusOutlined />
                    </span>
                  </Tooltip>
                </div>
              )}
              {showPercent && (
                <div className={styles.progressBox}>
                  <Progress percent={percent} status={progressStatus} />
                </div>
              )}
            </div>
          </Form.Item>
          <Form.Item
            label="文章简介："
            name="introduction"
            rules={[{ required: true, message: "请输入文章简介!" }]}
          >
            <TextArea
              placeholder="请输入文章简介"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item
            label="文章正文："
            name="mainContent"
            rules={[{ required: true, message: "请输入文章正文!" }]}
          >
            <SimpleMDE options={options} style={{ lineHeight: "normal" }} />
          </Form.Item>
        </Form>
        <div className={styles.btnGroup}>
          <Button
            type="primary"
            style={{ padding: "0 50px", margin: "0 20px" }}
            onClick={this.submit}
            loading={loading}
          >
            提交
          </Button>
          {id && (
            <Button
              type="danger"
              style={{ padding: "0 50px", margin: "0 20px" }}
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

export default Editor;
