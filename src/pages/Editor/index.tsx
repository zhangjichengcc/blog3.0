import React, { FC } from "react";
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

const Editor: FC<any> = ({

}): React.ReactElement => {
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
  )
}

export default Editor;
