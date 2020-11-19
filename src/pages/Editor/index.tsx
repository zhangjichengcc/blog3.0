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
import classnames from 'classnames';
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

type statusType = 'ready' | 'fetching' | 'success' | 'error';
const useUploadPercent = (): [{percent: number, status: statusType, url: string, base64: string}, (arg0: any) => void] => {
  const [percent, setPercent] = useState<number>(0);
  const [status, setStatus] = useState<statusType>('ready');
  const [url, setUrl] = useState<string>('');
  const [base64, setBase64] = useState<string>('');
  // XHR 请求方式，获取进度
  const uploadXHR = (file: string | Blob) => {
    // const formData = new FormData();
    // formData.append("upload", file);
    // const xhr = new XMLHttpRequest();
    // xhr.open("POST", "/api/image/uploadImage");
    // xhr.upload.onprogress = event => {
      //   if (event.lengthComputable) {
    //     const _percent = Math.round((event.loaded / event.total) * 100);
    //     setPercent(_percent < 99 ? _percent : 99);
    //   }
    // };
    // xhr.onload = (res: {target: any}) => {
    //   const { target: { response = {} } } = res;
    //   const { code, data } = JSON.parse(response);
    //   if (code === 0) {
      //     setTimeout(() => {
    //       setPercent(100);
    //       setStatus('success');
    //     }, 1000);
    //     setUrl(data);
    //   } else {
    //     setStatus('error');
    //   }
    // };
    // xhr.send(formData);
    let _p = 0;
    const fn = () => {
      setTimeout(() => {
        setPercent(_p + 1);
        _p = _p + 5;
        if(_p < 100) {
          fn()
        } else {
          setStatus('success');
        }
      }, 500);
    }
    fn();
  };
  // 调用上次方法
  const setFile = (file: any) => {
    setStatus('fetching');
    getBase64(file).then(res => {
      setBase64(res);
    })
    uploadXHR(file);
  }
  return [{percent, status, url, base64}, setFile];
}

const UploadImg: FC<any> = ({
  value = '',
  onChange,
}) => {
  const uploadRef = useRef(null);
  const [mask, setMask] = useState<boolean>(true);
  const [{percent, status, url, base64}, setFile] = useUploadPercent();
  const inputOnChange = (e: { target: any; }) => {
    const { target: { files } } = e;
    setFile(files?.[0]);
  }

  // 当url改变时代表有文件上传成功或初始化有文件存在
  useEffect(() => {
    onChange(url);
  }, [url]);

  // 当url改变时代表有文件上传成功或初始化有文件存在
  useEffect(() => {
    if(status === 'fetching' || status === 'success') setMask(true);
  }, [status])

  useEffect(() => {
    console.log(percent, status, url, base64);
  }, [percent, status, url, base64])
  return (
    <div className={styles.bannerUploadArea}>
      <input type="file" accept=".png,.jpg,.jpeg" ref={uploadRef} className={styles.file_input_dom} onChange={inputOnChange} />
      <div className={styles.upload_area_content} style={(value || base64) ? {backgroundImage: `url(${value || base64})`} : {}}>
        <div onAnimationEnd={() => setMask(false)} className={classnames(styles.mask, status === 'success' ? styles.hide : '')} />
        {
          status === 'ready' &&
          <div className={styles.btnGroup}>
            <Tooltip placement="top" title="上传图片">
              {/* @ts-ignore */}
              <PlusOutlined className={styles.plusBtn} onClick={() => {uploadRef.current?.click()}} />
            </Tooltip>
          </div>
        }
        {
          (status === 'fetching' || status === 'error') &&
          <div>
            <Progress type="circle" percent={percent} />
          </div>
        }
        {
          value &&
          <div>
            {value}
          </div>
        }
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
