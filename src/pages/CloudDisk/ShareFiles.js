import React, { Component } from "react";
import { Table, Icon, message, Button } from "antd";
import moment from "moment";
// import router from 'umi/router';
import classnames from "classnames";
import fileDownload from "js-file-download";
import {
  getDirList,
  getDir,
  addDir,
  copyXctDirFile,
  // insertXctFile,
  downloadFile,
  getSharedFile
} from "@/services/cloudDisk";
import * as Svg from "../../utils/svgImport";
import { renderSize } from "@/utils/methods";
import styles from "./ShareFiles.less";
import OperationModal from "./component/operationModal";

const { Column } = Table;
const fileTypeList =
  "xls, xlsx, doc, docx, pdf, ppt, pptx, txt, png, jpg, mp3, mp4, zip, rar";
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
  rar: Svg.zipIconSvg
};

// 时间格式化
const timeRender = t => {
  return moment(t).format("YYYY-MM-DD HH:mm");
};

const rootItem = {
  name: "全部文件",
  dirId: 0, // 根目录id为0
  sorter: null,
  prev: null
};

export default class ShareFiles extends Component {
  state = {
    fileList: [], // 文件列表
    modalFileList: [], // 弹框文件列表
    loading: false, // 加载状态
    selectedRowKeys: [], // 已选条目
    searchParams: rootItem,
    historyList: [rootItem], // 存储历史记录
    historyIdx: 0
  };

  componentDidMount() {
    this.initPage();
  }

  componentWillUpdate(nextProps) {
    const { shareCode: oldCode } = this.props;
    const { shareCode: newCode } = nextProps;
    if (newCode && newCode !== oldCode) {
      this.initShareDir(newCode);
    }
  }

  // 页面初始化
  initPage = () => {
    this.initShareDir();
    this.setState({
      talbeHeight: document.body.clientHeight - 400 || 350
    });
  };

  // 初始化获得分享文件夹
  initShareDir = newCode => {
    const { shareCode, onClose } = this.props;
    const sharedCode = newCode || shareCode;
    this.setState({
      loading: true,
      fileList: [],
      selectedRowKeys: [],
      selectedRows: []
    });
    getSharedFile({ sharedCode })
      .then(res => {
        const { code, data } = res;
        if (code === 0) {
          this.setState({
            loading: false,
            userName: data.username,
            userId: data.userIds,
            fileList: [
              {
                ...data,
                key: "0",
                fileType: data.type,
                fileId: data.id,
                id: `${data.type}${data.id}`
              }
            ]
          });
        } else {
          message.error("无效分享码！");
          onClose();
        }
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.warn(e);
        message.error("无效分享码！");
        onClose();
      });
  };

  // 获取文件列表
  fetchFileList = () => {
    this.setState({ loading: true, selectedRowKeys: [], selectedRows: [] });
    const { searchParams = {}, userId } = this.state;
    const { dirId = 0, order } = searchParams;
    const params = {
      ascending: order === "ascend",
      dirId,
      userId
    };
    getDirList(params)
      .then((res = {}) => {
        const { code, data, msg } = res;
        if (code === 0) {
          this.setState({
            loading: false,
            fileList: data.map((item, idx) => {
              const fileType = item.size
                ? item.name.replace(/^.*\.(.*)$/, "$1")
                : "folder";
              return {
                ...item,
                key: `${idx}`,
                fileType,
                fileId: item.id,
                id: fileType + item.id,
                lock: parseInt(item.operation, 10)
              };
            })
          });
        } else {
          this.setState({ loading: false });
          message.error(msg);
        }
      })
      .catch(e => {
        this.setState({ loading: true });
        message.error(e.message || "获取数据失败！");
      });
  };

  // 获取文件夹列表
  fetchModalFileList = () => {
    this.setState({ modalLoading: true });
    getDir()
      .then((res = {}) => {
        const { data, code } = res;
        if (code === 0) {
          this.setState({
            modalFileList: data,
            modalLoading: false
          });
        } else {
          this.setState({
            modalLoading: false
          });
          message.warn("获取小抽屉文件列表失败");
        }
      })
      .catch(() => {
        message.warn("获取小抽屉文件列表失败");
      });
  };

  // 打开文件
  openDir = record => {
    const { searchParams = {}, historyList = [], historyIdx } = this.state;
    const { fileId, type, name } = record;
    const newSearchParams = {
      ...searchParams,
      dirId: fileId,
      name
    };
    if (type === "folder") {
      this.setState(
        {
          searchParams: newSearchParams,
          historyList: historyList
            .slice(0, historyIdx + 1)
            .concat(newSearchParams),
          historyIdx: historyIdx + 1
        },
        () => {
          this.fetchFileList();
        }
      );
    }
  };

  // 返回上一级
  prevHistory = () => {
    const { historyList = [], historyIdx } = this.state;
    if (historyIdx === 0) return;
    const newHistoryIdx = historyIdx - 1;
    this.setState(
      {
        searchParams: historyList[newHistoryIdx],
        historyIdx: newHistoryIdx
      },
      () => {
        if (newHistoryIdx === 0) {
          this.initShareDir();
        } else {
          this.fetchFileList();
        }
      }
    );
  };

  // 进入下一级
  nextHistory = () => {
    const { historyList = [], historyIdx } = this.state;
    if (historyIdx + 1 === historyList.length) return;
    const newHistoryIdx = historyIdx + 1;
    this.setState(
      {
        searchParams: historyList[newHistoryIdx],
        historyIdx: newHistoryIdx
      },
      () => {
        this.fetchFileList();
      }
    );
  };

  // 选择历史记录
  selectHistory = (_item, idx) => {
    const { historyList = [] } = this.state;
    this.setState(
      {
        historyList: historyList.slice(0, idx + 1),
        searchParams: historyList[idx],
        historyIdx: idx
      },
      () => {
        if (idx === 0) {
          this.initShareDir();
        } else {
          this.fetchFileList();
        }
      }
    );
  };

  // 下载文件
  downloadDir = () => {
    const { downloadSuccess, downloadAnimate } = this.props;
    const { selectedRows = [] } = this.state;
    if (!selectedRows.length) {
      message.warn("请选择要下载的文件!");
      return;
    }
    message.info("开始下载...");
    downloadAnimate(200, 150, Svg.zipIconSvg);
    const uuid = new Date().getTime();
    const params = selectedRows.map(item => ({
      id: item.fileId,
      type: item.type,
      moveId: uuid
    }));
    downloadFile({ params, uuid })
      .then(res => {
        const blob = res.blob();
        const name = res.headers
          .get("content-disposition")
          .split(";")[1]
          .split("filename=")[1];
        const decodeName = decodeURIComponent(name);
        blob.then(blobFile => {
          fileDownload(blobFile, decodeName);
          this.cleanSelectedRow();
        });
        message.success(`${decodeName || "文件"}下载完成！`);
        downloadSuccess();
      })
      .catch(e => {
        console.warn(e);
        downloadSuccess();
        message.error("下载失败！");
      });
  };

  // 保存到小抽屉
  copyDir = () => {
    const { selectedRows } = this.state;
    if (!selectedRows.length) {
      message.warn("请选择要下载的文件!");
      return;
    }
    this.setState(
      {
        opt: selectedRows,
        modalVisible: true
      },
      () => {
        this.fetchModalFileList();
      }
    );
  };

  // 确认保存到小抽屉
  handleOk = (e, keys) => {
    const { opt, userId } = this.state;
    this.setState({
      modalVisible: false
    });
    if (!keys.length || keys[0] === "0-0") return;

    const moveDirFileModels = opt.map(item => ({
      id: item.fileId,
      moveId: Number(keys[0]),
      type: item.type
    }));
    copyXctDirFile({ userId, moveDirFileModels })
      .then((res = {}) => {
        const { code } = res;
        if (code === 0) {
          message.success("文件保存成功");
          this.cleanSelectedRow();
        } else {
          message.warn("操作失败，请稍后重试!");
        }
      })
      .catch(() => {
        message.warn("操作失败，请稍后重试!");
      });
  };

  // 弹窗新建文件夹确认
  modalDirAddFolderNameOk = obj => {
    if (!obj.dirName || obj.dirName.match(/^\s*$/)) {
      message.error("新建文件夹命名不能为空");
      return;
    }
    addDir({ dirName: obj.dirName, parentId: obj.parentId })
      .then((res = {}) => {
        const { code, msg } = res;
        if (code === 0) {
          message.success("文件新增成功！");
          this.fetchModalFileList();
        } else {
          message.warn(msg || "创建失败，请重试！");
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  // 排序
  onTableChage = (pagination, filters, sorter, prev) => {
    if (prev === "search") return;
    const { searchParams } = this.state;
    const { order } = sorter;
    this.setState(
      {
        searchParams: {
          ...searchParams,
          order
        }
      },
      () => {
        this.fetchFileList();
      }
    );
  };

  // 选择项回调
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRows
    });
  };

  // 清空已选
  cleanSelectedRow = () => {
    this.setState({
      selectedRowKeys: [],
      selectedRows: []
    });
  };

  // 表格斑马条纹
  rowBgColor = (record, index) => {
    if (!(index % 2 === 0)) {
      return styles.rowBgColor;
    }
    return styles.rowStyle;
  };

  // 文件名行渲染
  fileNameRender = (text, record) => {
    let imgSrc = "";
    if (record.lock) {
      imgSrc = Svg.suodingSvg;
    } else if (record.fileType === "folder") {
      imgSrc = Svg.folderSvg;
    } else if (fileTypeList.indexOf(record.fileType) === -1) {
      imgSrc = Svg.fileIconSvg;
    } else {
      imgSrc = fileLogoObj[record.fileType];
    }
    return (
      <div className={styles.fileNameWrap}>
        <img
          src={imgSrc}
          alt=""
          ref={e => {
            this[`imgDom${record.id}`] = e;
          }}
        />
        <span className={styles.fileTitle}>{text}</span>
      </div>
    );
  };

  // modal 新建文件夹 | 取消新建
  modalAddDir = list => {
    this.setState({
      modalFileList: list
    });
  };

  render() {
    const {
      fileList = [],
      modalFileList = [],
      modalLoading,
      loading,
      selectedRowKeys,
      modalVisible,
      historyList = [],
      historyIdx,
      talbeHeight = 350,
      userName = ""
    } = this.state;
    const { onClose } = this.props;
    const activeHistoryList = historyList.slice(0, historyIdx + 1);

    const rowSelection = {
      onChange: this.onSelectChange,
      selectedRowKeys
    };

    return (
      <div
        className={styles.shareFilesPage}
        style={{ height: talbeHeight + 200 }}
      >
        <div className={styles.pageTitle}>
          <span>
            <Icon className={styles.pageTitleIcon} type="user" />
            <span className={styles.shareUserName}>{userName}</span>分享的文件
          </span>
          <Icon onClick={onClose} type="close" />
        </div>
        <div className={styles.header}>
          <span
            className={classnames(
              styles.historyBtn,
              historyIdx === 0 ? styles.disable : ""
            )}
            onClick={this.prevHistory}
          >
            <Icon type="left" />
          </span>
          <span
            className={classnames(
              styles.historyBtn,
              historyIdx + 1 === historyList.length ? styles.disable : ""
            )}
            onClick={this.nextHistory}
          >
            <Icon type="right" />
          </span>
          <span className={styles.line} />
          {activeHistoryList.map((item, idx) => (
            <p key={`key_${idx + 1}`}>
              {idx !== 0 && <span className={styles.nextIcon}>&gt;</span>}
              <span
                className={styles.title}
                onClick={() => {
                  this.selectHistory(item, idx);
                }}
              >
                {item.name}
              </span>
            </p>
          ))}
          <div>
            共<span>{fileList.length}</span>个
          </div>
        </div>
        <Table
          dataSource={fileList}
          rowSelection={rowSelection}
          rowClassName={this.rowBgColor}
          pagination={false}
          rowKey="id"
          loading={loading}
          onChange={this.onTableChage}
          scroll={{ y: talbeHeight }}
          onRow={record => {
            return {
              onDoubleClick: () => this.openDir(record)
            };
          }}
        >
          <Column
            title="文件名"
            dataIndex="name"
            key="name"
            render={(text, record) => this.fileNameRender(text, record)}
          />
          <Column
            title="文件大小"
            dataIndex="size"
            key="size"
            // width={110}
            render={text => (text ? renderSize(text) : "-")}
          />
          <Column
            title="修改时间"
            dataIndex="createTime"
            // width={200}
            key="createTime"
            sorter
            sortDirections={["descend", "ascend"]}
            render={text => timeRender(text)}
          />
        </Table>
        <OperationModal
          visible={modalVisible}
          title="保存到小抽屉"
          handleCancel={() => this.setState({ modalVisible: false })}
          handleOk={this.handleOk}
          fileList={modalFileList}
          loading={modalLoading}
          addNewFolder={this.modalAddDir}
          addNewFolderNameOk={this.modalDirAddFolderNameOk}
        />
        <div className={styles.btnBar}>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={this.copyDir}
          >
            保存到小抽屉
          </Button>
          <Button onClick={this.downloadDir}>下载到本地</Button>
        </div>
      </div>
    );
  }
}
