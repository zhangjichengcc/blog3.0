import React, { FC, useState, useRef, useEffect } from "react";
import moment from "moment";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteFilled,
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
import UploadBanner from '@/components/UploadBanner';
import MarkdownEditor from '@/components/MarkdownEditor';

// import { history } from "umi";
import styles from "./index.less";
import "easymde/dist/easymde.min.css";
// import {
//   insertArtical,
//   updateArtical,
//   getArtical,
//   deleteArtical
// } from "@/services/artical";

const { TextArea } = Input;
// const { confirm } = Modal;

const Editor: FC<any> = ({

}): React.ReactElement => {

  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  
  

  globalThis.form = form;

  form.setFieldsValue({banner: "http://118.190.52.53/images/u=3346477101,3512940777&fm=26&gp=0-1606644261597.jpg", mainContent: '666'})

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
          <UploadBanner />
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
          {/* @ts-ignore */}
          <MarkdownEditor />
        </Form.Item>
      </Form>
      <div className={styles.btnGroup}>
        
      </div>
      <Spin spinning={loading} tip="Loading..." className={styles.spin} />
    </div>
  )
}

export default Editor;
