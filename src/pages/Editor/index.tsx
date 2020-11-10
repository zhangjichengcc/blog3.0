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

const useUpload = () => {
  // const percentRef = useRef<number>(0);
  const [percent, setPercent] = useState<number>(0);
  const status = useRef<string>('ready');
  // percentRef.current = percent;
  // let percent = 0;
  // const setPercent = value => percent = value;
  const timer = () => {
    setTimeout(() => {
      if(percent < 20) {
        setPercent(percent + 1);
      }
    }, 1000);
  }
  useEffect(() => {
    timer();
  }, [percent]);
  return [percent, status];
}

const UploadImg: FC<any> = ({
  value = '',
}) => {
  const uploadRef = useRef(null);
  const percentRef = useRef<number>(0);
  
  // XHR 请求方式，获取进度
  // const uploadXHR = formData => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open("POST", "/api/image/uploadImage");
  //   xhr.upload.onprogress = event => {
  //     if (event.lengthComputable) {
  //       const percent = Math.round((event.loaded / event.total) * 100);
  //       percentRef.current = percent;
  //     }
  //   };
  //   xhr.onload = (res: {target: any}) => {
  //     const {
  //       target: { response = {} }
  //     } = res;
  //     const { code, data } = JSON.parse(response);
  //     if (code === -1) {
  //       message.error("图片上传失败！");
  //       this.setState(
  //         {
  //           progressStatus: "error",
  //           banner: null,
  //           base64Banner: null
  //         },
  //         () => {
  //           this.bannerUploaded();
  //         }
  //       );
  //     } else {
  //       message.success("图片上传成功");
  //       this.setState(
  //         {
  //           banner: data,
  //           percent: 100,
  //           progressStatus: "success"
  //         },
  //         () => {
  //           this.bannerUploaded();
  //         }
  //       );
  //     }
  //   };
  //   xhr.send(formData);
  // };

  return (
    <div className={styles.bannerUploadArea}>
      <input type="file" accept=".png,.jpg,.jpeg" ref={uploadRef} className={styles.file_input_dom} />
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

  const [percent, status] = useUpload();

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
