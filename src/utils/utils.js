/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = path => reg.test(path);

const isAntDesignPro = () => {
  // eslint-disable-next-line no-undef
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

// 判断当前项目
const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};

// 格式化千分制数字
const formatPrice = (price, dec = 2) => {
  if (!price) return '0';
  const numP = parseFloat(price);
  const strP = numP.toFixed(dec);
  const int = strP.replace(/^(-?[0-9]*)\..*/, '$1');
  const float = strP.replace(/^(-?[0-9]*\.)/, '');
  return `${int.replace(/\B(?=(?:\d{3})+$)/g, ',')}.${float}`;
};

// 格式化文件大小
const renderSize = filesize => {
  if (!filesize) return '0Bytes';
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let index = 0;
  const srcsize = parseFloat(filesize);
  index = Math.floor(Math.log(srcsize) / Math.log(1024));
  // eslint-disable-next-line no-mixed-operators
  let size = srcsize / 1024 ** index;
  size = size.toFixed(2); // 保留的小数位数
  return `${size}${unitArr[index]}`;
};

// 数字格式化
const renderNum = num => {
  const unitArr = ['', '万', '亿', '万亿'];
  let index = 0;
  let res = '';
  // eslint-disable-next-line wrap-iife
  (function travel(count) {
    if (count > 10000) {
      index += 1;
      travel(count / 10000);
    } else {
      res = index ? count.toFixed(2) + unitArr[index] : count.toString();
    }
  })(num);
  return res;
};

// 函数节流
const throttle = (() => {
  const content = this;
  let timer = false;
  return (fn, delay = 300) => {
    if (timer) return;
    fn.call(content);
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = false;
    }, delay);
  };
})();

// 函数防抖
const debounce = (() => {
  let timer = null;
  return (fn, delay = 300) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this);
    }, delay);
  };
})();

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
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  let ctx;
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
  }
  // canvas的toDataURL只能转jpg的
  if (ctx) {
    // 铺底色
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // 如果图片像素大于100万则使用瓦片绘制
  let count = (width * height) / 1000000;
  if (count > 1) {
    count = parseInt(Math.sqrt(count) + 1, 10); // 计算要分成多少块瓦片

    // 计算每块瓦片的宽和高
    const nw = parseInt(width / count, 10);
    const nh = parseInt(height / count, 10);
    const tCanvas = document.createElement('canvas');
    tCanvas.width = nw;
    tCanvas.height = nh;
    let tctx;
    if (tCanvas.getContext) {
      tctx = tCanvas.getContext('2d');
      for (let i = 0; i < count; i += 1) {
        for (let j = 0; j < count; j += 1) {
          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
        }
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }

  const ndata = canvas.toDataURL('image/jpeg', 0.6);

  return ndata;
};

// 仿jq offset()
const offset = el => {
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
  const domRect = el.getBoundingClientRect();
  const { top = 0, left = 0, height = 0 } = domRect;
  return {
    top,
    left,
    height,
    topBottom: clientHeight - top, // dom头部距离client底部距离
  };
};

// 判断设备pc || 移动
const isPc = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'ymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  for (let v = 0; v < Agents.length; v += 1) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

export {
  isAntDesignProOrDev,
  isAntDesignPro,
  isUrl,
  formatPrice,
  renderSize,
  renderNum,
  throttle,
  debounce,
  compress,
  offset,
  isPc,
};
