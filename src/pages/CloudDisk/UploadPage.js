import React, { Component } from 'react';
import {
  Table,
  // Icon,
  Modal,
  Progress,
  // Tooltip
} from 'antd';
import moment from 'moment';
import { renderSize } from '@/utils/methods';
// import router from 'umi/router';
// import classnames from 'classnames';
import { getUploadingList, isUploadOk } from '@/services/cloudDisk';
import * as Svg from '../../utils/svgImport';
import styles from './UploadPage.less';
// import Ellipsis from '@/components';

// const list  =[{"id":1,"dirid":0,"fileid":0,"parentid":null,"userIds":null,"name":"我的资源","size":"","createTime":"2019-09-06 16:00:05","operation":"1","url":"","type":"folder","catelist":null},{"id":2,"dirid":0,"fileid":0,"parentid":null,"userIds":null,"name":"我的下载","size":"","createTime":"2019-09-06 16:01:08","operation":"1","url":"","type":"folder","catelist":null},{"id":131,"dirid":0,"fileid":0,"parentid":null,"userIds":null,"name":"我的资源_1568894937","size":"","createTime":"2019-09-19 20:08:57","operation":"0","url":"","type":"folder","catelist":null},{"id":132,"dirid":0,"fileid":0,"parentid":null,"userIds":null,"name":"我的下载_1568894937","size":100000, loadSize: 40000, progress: 40, "createTime":"2019-09-19 20:08:57","operation":"0","url":"","type":"folder","catelist":null},{"id":130,"dirid":0,"fileid":0,"parentid":null,"userIds":null,"name":"我的下载_","size":"","createTime":"2019-09-19 20:00:45","operation":"0","url":"","type":"folder","catelist":null},{"id":113,"dirid":0,"fileid":0,"parentid":null,"userIds":null,"name":"技术人员绩效流程调整.pdf","size":"465613.0","createTime":"2019-09-20 19:08:04","operation":"0","url":"http://172.16.119.192:8020/2,ba5b60e9e0","type":"file","catelist":null},{"id":112,"dirid":0,"fileid":0,"parentid":null,"userIds":null,"name":"查询结果转换说明.docx","size":"12438.0","createTime":"2019-09-20 19:07:54","operation":"0","url":"http://172.16.119.192:8020/5,b902775eba","type":"file","catelist":null},{"id":111,"dirid":0,"fileid":0,"parentid":null,"userIds":null,"name":"dist.zip","size":"1319906.0","createTime":"2019-09-20 19:07:46","operation":"0","url":"http://172.16.119.192:8020/2,b89cbd4f3f","type":"file","catelist":null},{"id":110,"dirid":0,"fileid":0,"parentid":null,"userIds":null,"name":"行政区划","size":"818649.0","createTime":"2019-09-20 16:42:45","operation":"0","url":"http://172.16.119.192:8020/6,b774562f6e","type":"file","catelist":null}];

const { confirm } = Modal;

const { Column } = Table;
const fileLogoObj = {
  xls: Svg.excelSvg,
  xlsx: Svg.excelSvg,
  doc: Svg.wordIconSvg,
  docx: Svg.wordIconSvg,
  pdf: Svg.pdfIconSvg,
  ppt: Svg.pptSvg,
  pptx: Svg.pptSvg,
  txt: Svg.txtSvg,
  png: Svg.imgSvg,
  jpg: Svg.imgSvg,
  mp3: Svg.mp3Svg,
  mp4: Svg.videoSvg,
  zip: Svg.zipIconSvg,
  rar: Svg.zipIconSvg,
  folder: Svg.folderSvg,
  other: Svg.fileIconSvg,
};

// let uploadTimer = 0;

export default class UploadPage extends Component {
  state = {
    fileList: [], // 文件列表
    uploadTimer: 0,
    // selectedRowKeys: [],
    // selectedRows: [],
  };

  componentDidMount() {
    const { bind } = this.props;
    // 将子组件传递给父级
    bind(this);
    this.initPage();
  }

  // 页面初始化
  initPage = () => {
    this.setState(
      {
        talbeHeight: document.body.clientHeight - 350 || 400,
      },
      () => {
        this.fetchFileList();
      }
    );
  };

  startFetch = () => {
    const travel = () => {
      this.fetchFileList();
      setTimeout(() => {
        const { uploadTimer } = this.state;
        if (uploadTimer) travel();
      }, 500);
    };
    this.setState({ uploadTimer: false }, () => {
      this.setState({ uploadTimer: true }, () => {
        travel();
      });
    });
  };

  stopFetch = () => {
    this.setState({ uploadTimer: false });
  };

  // 获取文件列表
  fetchFileList = () => {
    const { oldFileList = [], fileList = [] } = this.state;
    const { setLoadingCount } = this.props;
    getUploadingList().then((res = {}) => {
      const { data, code } = res;
      if (code === 0) {
        this.setState(
          {
            fileList: data.map((item = {}, idx) => {
              const oldItem = oldFileList.filter(v => item.id === v.id)[0] || {};
              // 计算下载速度
              const speed =
                (item.endBuyt - oldItem.loadSize || 0) / 0.5 > 0
                  ? (item.endBuyt - oldItem.loadSize || 0) / 0.5
                  : 0;
              const speedStr = `${renderSize(speed || 0)} / s`;
              const remainingTime = speed ? (item.transmitted - item.endBuyt) / speed : null;
              const timeObj = moment.duration(remainingTime, 's');
              const remainingTimeObj = {
                hours: timeObj.hours(),
                minutes: timeObj.minutes(),
                seconds: timeObj.seconds(),
              };
              return {
                ...item,
                size: item.transmitted,
                loadSize: item.endBuyt,
                key: `${idx} + 1`,
                speed,
                speedStr,
                remainingTime,
                remainingTimeObj,
              };
            }),
            oldFileList: fileList,
          },
          () => {
            // this.loadedList();
            // 修改正在下载数量
            setLoadingCount();
          }
        );
      }
    });
  };

  loadedList = () => {
    const { fileList = [] } = this.state;
    fileList.forEach(item => {
      // 删除已完成或文件大小为0的数据
      if (item.size <= item.loadSize || item.size === 0) {
        isUploadOk({ uuid: item.md5 }).then(() => {
          this.fetchFileList();
        });
      }
    });
  };

  resetList = () => {};

  // 删除文件提醒
  deleteDir = record => {
    // 取消新建或修改文件名操作
    const that = this;
    confirm({
      title: '确定删除？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        isUploadOk({ uuid: record.md5 }).then(() => {
          that.fetchFileList();
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // onSelectChange = (keys, rows) => {
  //   this.setState({
  //     selectedRowKeys: keys,
  //     selectedRows: rows,
  //   })
  // }

  render() {
    const {
      talbeHeight = 400,
      fileList = [],
      // selectedRowKeys = [],
    } = this.state;

    // 文件名渲染
    const fileNameRender = name => {
      const reg = new RegExp('.*\\.(.*)$');
      const fileType = reg.test(name) ? name.replace(reg, '$1') : 'folder';
      const imgSrc = fileLogoObj[fileType] || fileLogoObj.other;
      return (
        <div className={styles.fileNameWrap}>
          <img src={imgSrc} alt="" />
          <span className={styles.fileTitle}>{name}</span>
        </div>
      );
    };

    // 进度渲染
    const progressDom = (value, record) => {
      const { size = 0, loadSize = 0, speedStr = 0, remainingTimeObj = {} } = record;
      const values = Number((99.99 * (loadSize / size)).toFixed(2));
      const num2 = val => val.toString().replace(/^(\d{1})$/, '0$1');
      return (
        <div>
          {/* <Progress percent={values < 99 ? values : 99} style={{paddingRight: 20}} status="active" /> */}
          <Progress percent={values} style={{ paddingRight: 20 }} status="active" />
          <span style={{ fontSize: 12, color: '#4583FD' }}>{speedStr}</span>
          <span style={{ fontSize: 12, color: '#999999', paddingLeft: 10 }}>{`剩余${num2(
            remainingTimeObj.hours
          )}:${num2(remainingTimeObj.minutes)}:${num2(remainingTimeObj.seconds)}`}
          </span>
        </div>
      );
    };

    // const todoDom = (value, record) => {
    //   return (
    //     <div className={styles.todoDom}>
    //       <Tooltip placement="top" title="删除">
    //         <span onClick={() => this.deleteDir(record)}><Icon type="close-square" style={{color: '#F00'}} /></span>
    //       </Tooltip>
    //     </div>
    //   )
    // }

    // const rowSelection = {
    //   onChange: this.onSelectChange,
    //   selectedRowKeys,
    // };

    const sizeDom = (value, record) => {
      const { size = 0, loadSize = 0 } = record;
      return (
        <span style={{ fontSize: 13 }}>{`${renderSize(loadSize)} / ${renderSize(size)}`}</span>
      );
    };

    return (
      <div className={styles.uploadPage}>
        <Table
          dataSource={fileList}
          // rowSelection={rowSelection}
          // rowClassName={this.rowBgColor}
          pagination={false}
          rowKey="key"
          on
          onChange={this.onTableChage}
          scroll={{ y: talbeHeight }}
        >
          <Column title="文件名" dataIndex="name" key="name" width={300} render={fileNameRender} />
          <Column
            title="文件大小"
            dataIndex="size"
            key="size"
            width={200}
            align="right"
            render={sizeDom}
          />
          <Column title="" key="progress" dataIndex="progress" render={progressDom} />
          {/* <Column
            title=""
            key="todo"
            width={150}
            render={todoDom}
            algin="right"
          /> */}
        </Table>
      </div>
    );
  }
}
