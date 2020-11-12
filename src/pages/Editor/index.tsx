import React, { FC, useState, useRef, useEffect } from "react";
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

const useUploadPercent = () => {
  const [percent, setPercent] = useState<number>(0);
  const [status, setStatus] = useState<'ready' | 'fetching' | 'success' | 'error'>('ready');
  const [url, setUrl] = useState<string>('');
  // XHR 请求方式，获取进度
  const uploadXHR = (file: string | Blob) => {
    const formData = new FormData();
    formData.append("upload", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/image/uploadImage");
    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        const _percent = Math.round((event.loaded / event.total) * 100);
        setPercent(_percent)
      }
    };
    xhr.onload = (res: {target: any}) => {
      const { target: { response = {} } } = res;
      const { code, data } = JSON.parse(response);
      if (code === 0) {
        setPercent(100);
        setStatus('success');
        setUrl(data);
      } else {
        setStatus('error');
      }
    };
    xhr.send(formData);
  };
  const setFile = (file: any) => {
    debugger
    uploadXHR(file);
  }
  return [{percent, status, url}, setFile];
}

const UploadImg: FC<any> = ({
  value = '',
}) => {
  const uploadRef = useRef(null);
  const [{percent, status, url}, setFile] = useUploadPercent();
  const inputOnChange = (e: { target: any; }) => {
    const { target: { files } } = e;
    setFile(files?.[0])
  }

  useEffect(() => {
    console.log(percent, status, url);
  }, [percent, status, url])
  return (
    <div className={styles.bannerUploadArea}>
      <input type="file" accept=".png,.jpg,.jpeg" ref={uploadRef} className={styles.file_input_dom} onChange={inputOnChange} />
      <div className={styles.upload_area_content}>
        <div className={styles.btnGroup}>
          <Tooltip placement="top" title="上传图片">
            {/* @ts-ignore */}
            <PlusOutlined className={styles.plusBtn} onClick={() => {uploadRef.current?.click()}} />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

const Editor: FC<any> = ({

}): React.ReactElement => {

  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const [percent, status] = useUploadPercent();

  useEffect(() => {
    console.log(percent)
  }, [percent])
  

  globalThis.form = form;

  return (
    <div className={styles.Editor}>
      <Form form={form}>
        {/* <Form.Item
          label="发布时间："
          name="createTime"
          rules={[{ required: true, message: "请选择发布时间!" }]}
        >
          <DatePicker showTime />
        </Form.Item> */}
        <Form.Item
          label="文章标题"
          name="title"
          rules={[{ required: true, message: "请输入文章标题!" }]}
        >
          <Input placeholder="请输入文章标题" />
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
        <Form.Item label="文章banner：" name="banner">
          <UploadImg />
        </Form.Item>
        {/* <Form.Item label="文章banner：" name="banner">
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
        </Form.Item> */}
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
          {/* <SimpleMDE options={options} style={{ lineHeight: "normal" }} /> */}
        </Form.Item>
      </Form>
      <div className={styles.btnGroup}>
        
      </div>
      <Spin spinning={loading} tip="Loading..." className={styles.spin} />
    </div>
  )
}

export default Editor;
