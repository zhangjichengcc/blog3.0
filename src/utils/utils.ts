/*
 * @Author: zhangjicheng
 * @Date: 2019-11-28 18:50:31
 * @LastEditTime: 2020-11-27 11:19:58
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \blog3.0\src\utils\utils.ts
 * @可以输入预定的版权声明、个性签名、空行等
 */

import { stringify } from "qs";

// import React from "react";

/**
 * @description: 是否为url
 * @param {string} path
 * @return {boolean}
 */
export const isUrl = (path: string): boolean => {
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\\+\\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\\+\\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\\+~%\\/.\w-_]*)?\??(?:[-\\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
};

/**
 * @description: 格式化千分制数字
 * @param {string | number}
 * @return {number}
 */
export const thousandNum = (
  num: string | number, // 目标字段
  dec?: number // 小数位
): string => {
  const _num = Number(num).toFixed(dec || 2);
  return _num.replace(/(\d)(?=(\d{3})+(\.\d+)*$)/g, "$1,");
};

/**
 * @description: 返回 min-max 随机数
 * @param {number}
 * @return {number}
 */
export const random = (max: number, min?: number): number => {
  return Math.floor(Math.random() * (max - (min || 0) + 1) + max);
};

/**
 * @description: 格式化文件大小
 * @param {size: number} 文件大小，bytes为单位，number类型
 * @return {size: string }
 */
export function fileSizeFormat(size: number | string): string {
  // 获取以 x 为底 y 的对数
  function getBaseLog(x: number, y: number): number {
    return Math.log(y) / Math.log(x);
  }
  if (!size) return "0Bytes";
  const unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const num = typeof size === "number" ? size : parseFloat(size);
  const index = Math.floor(getBaseLog(1024, num));
  const res = num / 1024 ** index;
  return `${res.toFixed(2)}${unitArr[index]}`;
}

// 数字格式化
export const numberFormat = (num: number): string => {
  const unitArr = ["", "万", "亿", "万亿"];
  let index = 0;
  let res = "";
  (function travel(count) {
    if (count > 10000) {
      index += 1;
      travel(num / 10000);
    } else {
      res = index ? count.toFixed(2) + unitArr[index] : count.toString();
    }
  })(num);
  return res;
};

/**
 * @description: 函数节流
 * @param {function, number, boolean} 执行的方法；延迟时间ms；是否首次执行
 * @return {void}
 */
export function throttle(
  fn: { (): void; call?: any },
  delay = 300,
  first = true
) {
  let timer: any = null;
  let isFirst = first;
  return (...args: any) => {
    if (isFirst) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fn.call(this, args);
      isFirst = false;
    }
    if (timer) return;
    timer = setTimeout(() => {
      clearTimeout(timer);
      fn.call(this, args);
    }, delay);
  };
}

/**
 * @description: 函数防抖
 * @param {function, number} 执行的方法；延迟时间ms
 * @return {type}
 */
export function debounce(fn: { (): void; call?: any }, delay = 300) {
  let timer: any = null;
  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, args);
    }, delay);
  };
}

// 压缩图片
const compress = img => {
  let { width, height } = img;
  // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  // let ratio = width * height / 4000000;
  // if (ratio > 1) {
  //   ratio = Math.sqrt(ratio);
  //   width /= ratio;
  //   height /= ratio;
  // } else {
  //   ratio = 1;
  // }
  let ratio = 1;
  const w = width / 640;
  const h = height / 640;
  if (w < 1 && height < 1) {
    ratio = 1;
  } else if (w > h) {
    ratio = w;
    width = 640;
    height /= ratio;
  } else if (h > w) {
    ratio = h;
    width /= ratio;
    height = 640;
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx;
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
  }
  // canvas的toDataURL只能转jpg的
  if (ctx) {
    // 铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // 如果图片像素大于100万则使用瓦片绘制
  let count = (width * height) / 1000000;
  if (count > 1) {
    count = parseInt(Math.sqrt(count) + 1, 10); // 计算要分成多少块瓦片

    // 计算每块瓦片的宽和高
    const nw = parseInt(width / count, 10);
    const nh = parseInt(height / count, 10);
    const tCanvas = document.createElement("canvas");
    tCanvas.width = nw;
    tCanvas.height = nh;
    let tctx;
    if (tCanvas.getContext) {
      tctx = tCanvas.getContext("2d");
      for (let i = 0; i < count; i += 1) {
        for (let j = 0; j < count; j += 1) {
          tctx.drawImage(
            img,
            i * nw * ratio,
            j * nh * ratio,
            nw * ratio,
            nh * ratio,
            0,
            0,
            nw,
            nh
          );
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
        }
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }

  const ndata = canvas.toDataURL("image/jpeg", 0.6);

  return ndata;
};

// 仿jq offset()
const offset = (el: HTMLElement | null) => {
  if (!el) return { top: 0, left: 0, height: 0, topBottom: 0 };
  const clientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  const domRect = el.getBoundingClientRect();
  const { top = 0, left = 0, height = 0 } = domRect;
  return {
    top,
    left,
    height,
    topBottom: clientHeight - top // dom头部距离client底部距离
  };
};

// 判断设备pc || 移动
const isPc = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = [
    "Android",
    "iPhone",
    "ymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  ];
  let flag = true;
  for (let v = 0; v < Agents.length; v += 1) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

// 全局loading
const pageLoading = (key = false, text: any) => {
  if (key) {
    const child = document.createElement("dev");
    child.setAttribute("id", "pageLoading_page");
    // if (pageStyle === 'black') child.setAttribute('class', 'black');
    child.innerHTML = `<div class="ball-content"><i></i><i></i><i></i></div><p>${text ||
      "loading"}<span>.</span><span>.</span><span>.</span></p>`;
    document.body.appendChild(child);
  } else {
    const child = document.getElementById("pageLoading_page");
    if (child) document.body.removeChild(child);
  }
};

// 模拟延迟
const timeout = (fn, params, ms = 300) =>
  new Promise(resolve => {
    setTimeout(() => {
      const res = fn(...params);
      resolve(res);
    }, ms);
  });

// 转换base64编码图片
const getBase64 = (file: Blob): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

interface optionProps {
  url: string;
  headers?: {[key: string]: any};
}

interface fsProps {
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
  precent: number;
  status: string;
  response: any;
  base64: string | null;
}

const uploadFiles = (files: Array<any>, option: optionProps, callback?: (fs: Array<{[key: string]: any}>) => void) => {
  const {
    url,
    headers,
  } = option;
  // eslint-disable-next-line no-underscore-dangle
  const _files: Array<fsProps> = [...files].map(item => ({
    name: item.name,
    lastModified: item.lastModified,
    lastModifiedDate: item.lastModifiedDate,
    size: item.size,
    type: item.type,
    precent: 0,
    status: 'uploading',
    response: {},
    base64: null,
  }));
  // 文件(图片)转base64
  const base64 = (file: any, idx: number) => (
    new Promise((resolve) => {
      if (new RegExp(/image/).test(file.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
          // @ts-ignore
          _files[idx].base64 = reader.result;
        };
        reader.onerror = () => {
          resolve(null);
          _files[idx].base64 = null;
        };
      } else {
        resolve(null);
        _files[idx].base64 = null;
      }
    })
  );
  // 上传文件
  const upload = (file: any, idx: number) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);
    xhr.open('POST', url);
    if (typeof headers === 'object') {
      Object.keys(headers).forEach((key: string) => {
        xhr.setRequestHeader(key, headers[key]);
      })
    }
    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        _files[idx].precent = percent > 99 ? 99 : percent;
        callback(_files);
      }
    };
    return new Promise((resolve, reject) => {
      xhr.onload = (res: any) => {
        try {
          const {
            target: { response = {} },
          } = res;
          const { code, data } = JSON.parse(response) || {};
          if (code === 0) {
            setTimeout(() => {
              resolve(data);
              _files[idx].status = 'done';
              _files[idx].precent = 100;
              _files[idx].response = data;
              callback(_files);
            }, 1000)
          } else {
            reject(new Error('error'));
            _files[idx].status = 'error';
            callback(_files);
          }
        } catch {
          reject(new Error('error'));
          _files[idx].status = 'error';
          callback(_files);
        }
      }
      xhr.send(formData);
    })
  }
  return Promise.all([...files].map((item, idx) => base64(item, idx)))
  .then(() => {
    // 图片base64处理完毕触发callback返回更新后的数据
    callback(_files);
    return Promise.all([...files].map((item, idx) => upload(item, idx).catch(() => {}))).then(() => 
      new Promise<Array<fsProps>>((resolve: (fs: Array<fsProps>) => void) => {
        resolve(_files);
      }
    ))
  })
}

export {
  compress,
  offset,
  isPc,
  pageLoading,
  timeout,
  getBase64,
  uploadFiles,
};
