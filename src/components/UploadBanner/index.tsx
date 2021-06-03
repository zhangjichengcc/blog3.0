import React, { FC, useState, useEffect, useRef } from 'react';
import { Progress, Tooltip } from 'antd';
import classnames from 'classnames';
import {
  DeleteFilled,
  PlusOutlined
} from "@ant-design/icons";
import { uploadFiles } from '@/utils/utils';

import styles from './index.less';

interface maskProps {
  show: boolean;
  bgcolor?: string;
}
const Mask: FC<maskProps> = ({
  show = true,
  bgcolor = '',
}) => {
  // 状态样式类，show === true，立刻设为show(display: block;); show === false 待动画结束后设为hide(display: none;);
  const [stateClass, setStateClass] = useState<'show' | 'hide'>(show ? 'show' : 'hide');
  // 动作样式类，show === true 设为进程动画enter; show === false 设为离场动画leave; 动画结束后设为空
  const [actionClass, setActionClass] = useState<'enter' | 'leave' | ''>('');

  const onMaskAnimationEnd = () => {
    setActionClass('');
    if (!show) setStateClass('hide');
  };
  
  useEffect(() => {
    setActionClass(show ? 'enter' : 'leave')
    if(show) setStateClass('show');
  }, [show]);
  console.log(show)

  return (
    <div onAnimationEnd={onMaskAnimationEnd} style={{ backgroundColor: bgcolor }} className={classnames(styles.mask, styles[stateClass], styles[actionClass])} />
  )
}

interface uploadImageProps {
  value?: string;
  onChange?: (response: any) => void;
}

const UploadImg: FC<uploadImageProps> = ({
  value = '',
  onChange,
}) => {
  const uploadRef = useRef(null);
  interface fileProps {
    base64: string | null;
    precent: number;
    status: string; // 'ready' | 'uploading' | 'done' | 'error';
  }
  const defaultFile = {
    base64: null,
    precent: 0,
    status: value ? 'done' : 'ready',
  }
  const [file, setFile] = useState<fileProps>(defaultFile);

  const { base64, precent, status } = file;

  const inputOnChange = (e: { target: any; }) => {
    const { target: { files } } = e;
    const option = {
      url: '/api/image/uploadImage',
    }
    uploadFiles(files, option, (fs: Array<{[key: string]: any}>) => {
      setFile({
        base64: fs?.[0].base64,
        precent: fs?.[0].precent,
        status: fs?.[0].status,
      })
    }).then((res) => {
      const { response } = res?.[0];
      if (typeof onChange === 'function') onChange(response);
    })
  }

  const deleteImg = (): void => {
    if (typeof onChange === 'function') onChange('');
    // 重置初始化参数，status随value改变，故手动置为ready
    setFile({...defaultFile, status: 'ready'});
  }

  return (
    <div className={styles.bannerUpload}>
      <div className={styles.bannerUploadArea}>
        <input type="file" accept=".png,.jpg,.jpeg" ref={uploadRef} className={styles.file_input_dom} onChange={inputOnChange} />
        <div className={styles.upload_area_content} style={(value || base64) ? {backgroundImage: `url(${ base64 || value})`} : {}}>
          <Mask show={status === 'uploading'} />
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
            status === 'done' &&
            <div className={styles.btnGroup}>
              <div className={styles.btnGroup_done}>
                <div className={styles.btnGroup_done_content}>
                  <Tooltip placement="top" title="删除图片">
                    {/* @ts-ignore */}
                    <DeleteFilled className={styles.deleBtn} onClick={deleteImg} />
                  </Tooltip>
                  <Tooltip placement="top" title="上传图片">
                    {/* @ts-ignore */}
                    <PlusOutlined className={styles.plusBtn} onClick={() => {uploadRef.current?.click()}} />
                  </Tooltip>
                </div>
              </div>
            </div>
          }
          {
            (status === 'uploading' || status === 'error') &&
            <Progress type="circle" percent={precent} />
          }
        </div>
      </div>
    </div>
  )
}

export default UploadImg;
