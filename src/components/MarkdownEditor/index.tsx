import React, { FC, useEffect, useState, useRef, ChangeEvent } from 'react';
import SimpleMDE from "react-simplemde-editor";
import { uploadFiles } from '@/utils/utils';

import styles from './index.less';

interface markdownEditorProps {
  onChange: Function;
  value: string;
}

const MarkdownEditor: FC<markdownEditorProps> = ({
  onChange,
  value,
}): React.ReactElement => {

  const inputRef = useRef<any>(null);

  // 编辑器变化触发
  const onHandleChange = (text: string) => {
    if (typeof onChange === 'function') onChange(text);
  }

  // 上传图片方法
  const uploadImages = (e: ChangeEvent): void => {
    const { target }: { target: any} = e;
    const { files } = target;
    const option = {
      url: '/api/image/uploadImage',
    }
    uploadFiles(files, option).then((res) => {
      console.log(res);
    })
  }

  // 上传文件触发
  const uploadeImg = () => {
    inputRef?.current?.click();
  }

  // 编辑器配置
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
        action: uploadeImg,
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
    <div className={styles.markdownEditor}>
      <input type="file" ref={inputRef} onChange={uploadImages} />
      <SimpleMDE
        // @ts-ignore
        options={options}
        style={{ lineHeight: "normal" }}
        onChange={onHandleChange}
        value={value}
      />
    </div>
  )
}

export default MarkdownEditor;