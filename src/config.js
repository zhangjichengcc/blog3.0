import oldBogImg from '@/assets/image/topArtical/blog.jpg';
import regImg from '@/assets/image/topArtical/regex.jpeg';

export default {
  name: '张吉成',
  info: '功能是资产，代码是负债！',
  mail: 'zhangjichengcc@163.com',
  topArtical: [
    {
      title: '正则表达式全集',
      introduction: '常用正则表达式及规则',
      img: regImg,
      link: 'http://tool.oschina.net/uploads/apidocs/jquery/regexp.html',
    },
    {
      title: '腾讯云开发者社区',
      introduction: '中文化编程基础技术教程的知识平台',
      img:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562394463&di=765e2706369fbe1ca1a5637d0ef8cb91&imgtype=jpg&er=1&src=http%3A%2F%2Fres.kaifu.com%2Fisy%2Fupload%2Fueditor%2Fimage%2F20180123%2Fcswy1wdtg0p3ld7s.jpg',
      link: 'https://cloud.tencent.com/developer',
    },
    {
      title: 'BLOG V1.0',
      introduction: '基于hexo,挂载在github的旧版博客',
      img: oldBogImg,
      link: 'https://zhangjichengcc.github.io/blog/',
    },
  ],
};
