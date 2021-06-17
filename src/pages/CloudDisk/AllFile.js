import React, { Component } from "react";
import { Table, Icon, Input, message, Popover, Modal, Button } from "antd";
import moment from "moment";
// import router from 'umi/router';
import classnames from "classnames";
import fileDownload from "js-file-download";
import {
  getDirList,
  getDir,
  addDir,
  deleteDir,
  updateXctDir,
  updateXctFile,
  uploadChunk,
  merge,
  isUploadOk,
  moveXctDirFile,
  copyXctDirFile,
  // insertXctFile,
  getSharedCode,
  search,
  downloadFile
} from "@/services/cloudDisk";
import * as Svg from "../../utils/svgImport";
import { renderSize } from "@/utils/methods";
import styles from "./AllFile.less";
import OperationModal from "./component/operationModal";
// import Ellipsis from '@/components';

const copyToClipboard = text => {
  const input = document.createElement("input");
  input.id = "copyToClipboard_input";
  input.value = text;
  document.body.appendChild(input);
  input.select();
  const res = document.execCommand("copy");
  document.body.removeChild(input);
  return res;
};

const { confirm } = Modal;

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

export default class AllFile extends Component {
  state = {
    fileList: [], // 文件列表
    modalFileList: [], // 弹框文件列表
    editDir: {
      id: null,
      name: "新建文件夹",
      fileType: "folder",
      size: "-",
      time: null,
      edit: true
    },
    loading: false, // 加载状态
    selectedRowKeys: [], // 已选条目
    btnControler: {
      upload: "active",
      newdir: "active",
      download: "hide",
      deletedir: "hide",
      move: "hide",
      copy: "hide"
    },
    searchParams: rootItem,
    historyList: [rootItem], // 存储历史记录
    historyIdx: 0,
    modalTitle: "" // 弹窗标题
  };

  componentDidMount() {
    const { bind } = this.props;
    // 将子组件传递给父级
    bind(this);
    this.initPage();
    this.initDragover();
  }

  // 页面初始化
  initPage = () => {
    const { onBtnStateChange } = this.props;
    onBtnStateChange();
    this.fetchFileList();
    this.setState({
      talbeHeight: document.body.clientHeight - 350 || 400
    });
  };

  // 获取文件列表
  fetchFileList = () => {
    this.setState({
      loading: true,
      selectedRowKeys: [],
      selectedRows: [],
      prev: "fetch"
    });
    const { searchParams = {} } = this.state;
    const { dirId = 0, order } = searchParams;
    const { onMenuClick } = this.props;
    onMenuClick(searchParams);
    const params = {
      ascending: order === "ascend",
      dirId
    };
    getDirList(params)
      .then((res = {}) => {
        const { code, data, msg } = res;
        if (code === 0) {
          this.setState(
            {
              loading: false,
              listType: "default",
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
            },
            () => {
              this.setBtnControl();
            }
          );
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

  // 搜索目录及文件
  search = () => {
    const { searchValue } = this.props;
    if (!searchValue) {
      this.fetchFileList();
      return;
    }
    const params = { name: searchValue };
    this.setState({
      loading: true,
      selectedRowKeys: [],
      selectedRows: [],
      prev: "search"
    });
    search(params)
      .then((res = {}) => {
        const { code, data } = res;
        if (code === 0) {
          this.setState(
            {
              loading: false,
              listType: "search",
              fileList: data.map(item => {
                const fileType = item.size
                  ? item.name.replace(/^.*\.(.*)$/, "$1")
                  : "folder";
                return {
                  ...item,
                  fileType,
                  fileId: item.id,
                  id: fileType + item.id,
                  lock: parseInt(item.operation, 10)
                };
              })
            },
            () => {
              this.setBtnControl();
            }
          );
        } else {
          this.setState({ loading: false });
          message.warn("查询失败，请重试");
        }
      })
      .catch(() => {
        message.warn("查询失败，请重试");
      });
  };

  // 选择文件
  uploadFile = () => {
    const { input } = this;
    // 关闭重命名或新建操作
    this.addDirCancel();
    input.click();
  };

  // 拖拽文件
  initDragover = () => {
    const { container } = this;
    // 监听drop事件，防止浏览器中打开客户端图片
    document.ondragover = e => {
      // 阻止ondragover的默认行为（触发ondragleave)
      e.preventDefault();
    };
    document.ondrop = e => {
      // 阻止ondrop的默认行为(触发在当前窗口打开客户端图片)
      e.preventDefault();
    };
    container.ondragover = e => {
      e.preventDefault();
    };
    container.ondrop = e => {
      // 阻止ondragover的默认行为（触发ondragleave)
      const { files = [] } = e.dataTransfer;
      const file = files[0];
      this.upload(file);
    };
  };

  // 选择文件完成调用
  uploadSubmit = e => {
    const { files } = e.target;
    const file = files[0];
    this.upload(file);
    e.target.value = "";
  };

  // 分片上传完成，合并分片
  uploadFinished = md5 => {
    const { uploadSuccess } = this.props;
    merge({ uuid: md5 }).then((res = {}) => {
      const { code } = res;
      if (code === 0) {
        // 清空正在下载列表
        isUploadOk({ uuid: md5 }).then((res1 = {}) => {
          setTimeout(() => {
            uploadSuccess();
          }, 1000);
          if (res1.code === 0) {
            message.success("文件上传完成");
            this.fetchFileList();
          } else {
            message.error("上传失败");
          }
        });
      } else {
        message.error("上传失败");
        isUploadOk({ uuid: md5 }).then(() => {
          uploadSuccess();
        });
      }
    });
  };

  // 上传文件
  upload = file => {
    const {
      searchParams: { dirId }
    } = this.state;
    const { uploadloadAnimate } = this.props;
    uploadloadAnimate();
    const fileSize = file.size;
    const chunkSize = 1024 ** 2 * 2;
    const chunkTotal = Math.ceil(fileSize / chunkSize);
    let chunkIndex = 0;
    const md5 = new Date().getTime();
    const loadNext = () => {
      const formData = new FormData();
      const startSize = chunkIndex * chunkSize;
      const endSize = Math.min(fileSize, (chunkIndex + 1) * chunkSize);
      const chunkFormData = file.slice(startSize, endSize);
      const params = {
        md5,
        number: chunkTotal,
        currentNumber: chunkIndex,
        size: fileSize,
        dirId,
        fileName: `${file.name}_${chunkIndex}`
      };
      chunkFormData.name = `${file.name}_${chunkIndex}`;
      formData.append("file", chunkFormData);
      if (chunkIndex < chunkTotal) {
        uploadChunk(params, formData).then((res = {}) => {
          const { code } = res;
          if (code === 0) {
            chunkIndex += 1;
            loadNext();
          } else {
            loadNext();
          }
        });
      } else {
        // eslint-disable-next-line no-console
        console.log("分片上传完毕");
        // 所有分片上传完毕
        this.uploadFinished(md5);
      }
    };
    loadNext();
  };

  // 新建文件夹
  addNewDir = () => {
    const { fileList = [], editDir = {} } = this.state;
    const newDir = {
      ...editDir,
      time: new Date(),
      size: 0,
      id: "newId" // 默认新建过程中的id为newId
    };
    this.setState(
      {
        fileList: [newDir, ...fileList]
      },
      () => {
        this.setBtnControl();
      }
    );
  };

  // 写入新建文件名称 || 修改文件名称
  newNameChange = e => {
    const {
      target: { value }
    } = e;
    const { fileList } = this.state;
    const newFileList = fileList.map(item => ({
      ...item,
      name: item.edit ? value : item.name
    }));
    this.setState({
      fileList: newFileList
    });
  };

  // 新建文件确认
  addDirOk = () => {
    const { fileList = [], searchParams, oldName, prev } = this.state;
    const record = fileList.filter(item => item.edit)[0] || {};
    // 判断是否重名
    const sameName = () => {
      for (let i = 0; i < fileList.length; i += 1) {
        const item = fileList[i];
        if (!item.edit && item.name === record.name) {
          return true;
        }
      }
      return false;
    };
    if (sameName()) {
      message.error("文件或文件夹已存在，请更换命名！");
      return;
    }
    // 若名称未发生改变，则不做命名操作
    if (record.name === oldName) {
      this.addDirCancel();
      return;
    }
    if (!record.name || record.name.match(/^\s*$/)) {
      message.error("新建文件夹命名不能为空");
      return;
    }
    if (record.name.length > 30) {
      message.warn("文件名过长！请保证文件名长度不超过30个字符");
      return;
    }
    if (record.id === "newId") {
      // 新建文件
      const params = {
        dirName: record.name,
        parentId: searchParams.dirId || 0
      };
      addDir(params)
        .then((res = {}) => {
          const { code, msg } = res;
          if (code === 0) {
            message.success("文件新增成功！");
            this.setState({}, () => {
              // this.setBtnControl();
              this.fetchFileList();
            });
          } else {
            this.setState({ loading: false });
            message.warn(msg || "创建失败，请重试！");
          }
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.error(e);
        });
    } else if (record.type === "folder") {
      // 修改文件夹名称
      const params = {
        id: record.fileId,
        dirName: record.name,
        parentId: searchParams.dirId || 0
      };
      updateXctDir(params)
        .then((res = {}) => {
          const { code, msg } = res;
          if (code === 0) {
            message.success("重命名成功！");
            // 操作完成后根据重复上次查询操作
            if (prev === "search") {
              this.search();
            } else {
              this.fetchFileList();
            }
          } else {
            message.warn(msg || "重命名失败，请重试！");
          }
        })
        .catch(() => {
          message.warn("重命名失败，请重试！");
        });
    } else {
      // 修改文件名
      const params = {
        id: record.fileId,
        name: record.name,
        dirId: searchParams.dirId || 0
      };
      updateXctFile(params)
        .then((res = {}) => {
          const { code } = res;
          if (code === 0) {
            message.success("重命名成功！");
            // 操作完成后根据重复上次查询操作
            if (prev === "search") {
              this.search();
            } else {
              this.fetchFileList();
            }
          } else {
            message.warn("重命名失败，请重试！");
          }
        })
        .catch(() => {
          message.warn("重命名失败，请重试！");
        });
    }
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
        // eslint-disable-next-line no-console
        console.error(e);
      });
  };

  // 新建文件取消 || 重命名取消
  addDirCancel = () => {
    const { fileList = [], oldName = "" } = this.state;
    const record = fileList.filter(item => item.edit)[0] || {};
    if (record.id === "newId") {
      // 新建文件
      this.setState(
        {
          fileList: fileList.filter(v => !v.edit)
        },
        () => {
          this.setBtnControl();
        }
      );
    } else {
      // 修改文件
      this.setState(
        {
          fileList: fileList.map(item => ({
            ...item,
            name: item.id === record.id ? oldName : item.name,
            edit: false
          }))
        },
        () => {
          this.setBtnControl();
        }
      );
    }
  };

  // 删除文件
  deleteDir = record => {
    const { selectedRows, prev } = this.state;
    const params = record
      ? [{ id: record.fileId, type: record.type }]
      : selectedRows.map(item => ({
          id: item.fileId,
          type: item.type
        }));
    deleteDir(params)
      .then((res = {}) => {
        const { code } = res;
        if (code === 0) {
          message.success("操作成功！");
          this.cleanSelectedRow();
          this.fetchFileList();
          if (prev === "search") {
            this.search();
          } else {
            this.fetchFileList();
          }
        } else {
          message.warn("操作失败，请重试！");
        }
      })
      .catch(() => {
        message.warn("操作失败，请重试！");
      });
  };

  // 删除文件提醒
  deleteDirInfo = record => {
    // 取消新建或修改文件名操作
    this.addDirCancel();
    const that = this;
    confirm({
      title: "确定删除这些文件吗？",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        that.deleteDir(record);
      },
      onCancel() {
        // eslint-disable-next-line no-console
        console.log("Cancel");
      }
    });
  };

  // 重命名文件
  renameDir = record => {
    const { fileList } = this.state;
    this.setState(
      {
        fileList: fileList.map(item => ({
          ...item,
          edit: item.id === record.id
        })),
        oldName: record.name
      },
      () => {
        this.setBtnControl();
      }
    );
  };

  // 打开文件
  openDir = record => {
    const { searchParams = {}, historyList = [], historyIdx } = this.state;
    const { fileId, type, name, operation = "0" } = record;
    const newSearchParams = {
      ...searchParams,
      dirId: fileId,
      operation,
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

  // 打开文件
  openDirNav = (record, level) => {
    const { searchParams = {}, historyList = [] } = this.state;
    const { id, name } = record;
    const newSearchParams = {
      ...searchParams,
      dirId: id,
      name
    };
    this.setState(
      {
        searchParams: newSearchParams,
        historyList: level
          ? historyList.slice(0, 1).concat(newSearchParams)
          : historyList.slice(0, 1),
        historyIdx: level ? 1 : 0
      },
      () => {
        this.fetchFileList();
      }
    );
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
        // this.setBtnControl();
        this.fetchFileList();
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
        // this.setBtnControl();
        this.fetchFileList();
      }
    );
  };

  // 选择历史记录
  selectHistory = (item, idx) => {
    const { historyList = [] } = this.state;
    this.setState(
      {
        historyList: historyList.slice(0, idx + 1),
        searchParams: historyList[idx],
        historyIdx: idx
      },
      () => {
        // this.setBtnControl();
        this.fetchFileList();
      }
    );
  };

  // 分享文件
  shareDir = item => {
    const { fileId, type = "file", code: sCode } = item;
    const todo = value => {
      copyToClipboard(value);
      this.setState({
        shareCodeModalVisiable: true,
        shareCode: value
      });
    };
    if (sCode) {
      todo(sCode);
    } else {
      getSharedCode({ id: fileId, type }).then(res => {
        const { code, data } = res;
        if (code === 0) {
          todo(data);
        } else {
          message.error("分享码生产失败，请稍后重试！");
        }
      });
    }
  };

  // 复制分享码
  copyShareCode = code => {
    const res = copyToClipboard(code);
    if (res) {
      message.success("共享码已复制！");
    } else {
      message.error("复制失败，请手动复制");
    }
  };

  // 下载文件
  downloadDir = (record, imgSrc) => {
    const { downloadAnimate, downloadSuccess, parent } = this.props;
    const { LoadingPageCom = {}, fetchController = {} } = parent.state;
    const { fileList = [] } = LoadingPageCom.state;
    if (record) {
      const { id, fileId } = record;
      // 防止重复下载
      if (fileList.map(v => v.id).includes(fileId)) {
        message.warn("该文件已在下载队列中，请勿重复下载");
        return;
      }
      const imgDom = this[`imgDom${id}`];
      const { left: x, top: y } = imgDom.getBoundingClientRect();
      const { clientWidth: bodyWidth } = document.body;
      const { clientWidth: rootWidth } = document.getElementById("root");
      // 触发下载动画 y 去除导航高度
      downloadAnimate(x - (bodyWidth - rootWidth) / 2, y - 64, imgSrc);
    } else {
      downloadAnimate(200, 150, Svg.zipIconSvg);
    }
    // 取消新建或修改文件名操作
    this.addDirCancel();
    message.info("开始下载...");
    const { selectedRows = [] } = this.state;
    // // 添加唯一标识，用于终止下载
    // const controller = new AbortController();
    const uuid = new Date().getTime();
    // const { signal } = controller;
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      fetchController: {
        ...fetchController
        // [uuid]: controller,
      }
    });
    const timer = setTimeout(() => {
      clearTimeout(timer);
      const params = record
        ? [{ id: record.fileId, type: record.type, moveId: uuid }]
        : selectedRows
            .filter(item => !fileList.map(v => v.id).includes(item.fileId))
            .map(item => ({ id: item.fileId, type: item.type, moveId: uuid }));
      // 传递signal用于停止下载
      // downloadFile({params, signal})
      if (!params.length) return;
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
            message.success(`${decodeName || "文件"}下载完成！`);
            downloadSuccess(uuid);
          });
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.warn(e);
          downloadSuccess(uuid);
          message.error("下载失败！");
        });
    }, 1500);
  };

  // 复制文件
  copyDir = record => {
    this.addDirCancel();
    const { selectedRows } = this.state;
    this.setState(
      {
        // 将当前操作数据暂存
        todo: "copy",
        opt: record ? [record] : selectedRows,
        modalVisible: true,
        modalTitle: "复制到"
      },
      () => {
        this.fetchModalFileList();
      }
    );
  };

  // 移动文件
  moveDir = record => {
    this.addDirCancel();
    const { selectedRows } = this.state;
    this.setState(
      {
        todo: "move",
        // 将当前操作数据暂存
        opt: record ? [record] : selectedRows,
        modalVisible: true,
        modalTitle: "移动到"
      },
      () => {
        this.fetchModalFileList();
      }
    );
  };

  // 确认移动 | 复制
  handleOk = (e, keys) => {
    const { opt, todo, prev } = this.state;
    this.setState({
      modalVisible: false
    });
    if (!keys.length || keys[0] === "0-0") return;
    const moveDirFileModels = opt.map(item => ({
      id: item.fileId,
      moveId: Number(keys[0]),
      type: item.type
    }));
    if (todo === "copy") {
      copyXctDirFile({ moveDirFileModels })
        .then((res = {}) => {
          const { code } = res;
          if (code === 0) {
            message.success("文件复制成功");
            this.cleanSelectedRow();
            if (prev === "search") {
              this.search();
            } else {
              this.fetchFileList();
            }
          } else {
            message.warn("操作失败，请稍后重试!");
          }
        })
        .catch(() => {
          message.warn("操作失败，请稍后重试!");
        });
    } else if (todo === "move") {
      moveXctDirFile({ moveDirFileModels })
        .then((res = {}) => {
          const { code } = res;
          if (code === 0) {
            message.success("文件移动成功");
            this.cleanSelectedRow();
            if (prev === "search") {
              this.search();
            } else {
              this.fetchFileList();
            }
          } else {
            message.warn("操作失败，请稍后重试!");
          }
        })
        .catch(() => {
          message.warn("操作失败，请稍后重试!");
        });
    }
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

  // 根据已选内容设定按钮操作性
  setBtnControl = () => {
    const {
      selectedRowKeys,
      btnControler,
      selectedRows,
      historyList,
      historyIdx,
      fileList = [],
      listType
    } = this.state;
    const activeHistoryList = historyList.slice(0, historyIdx + 1);
    const { onBtnStateChange } = this.props;
    this.setState(
      {
        btnControler: {
          ...btnControler,
          newdir:
            fileList.filter(item => item.edit).length ||
            selectedRowKeys.length ||
            listType === "search"
              ? "disabled"
              : "active",
          // upload: activeHistoryList.map(item => item.name).includes('我的下载') ? 'hide' : 'active',
          upload: (() => {
            if (!selectedRowKeys.length && listType === "default") {
              return activeHistoryList
                .filter(item => item.operation === "1")
                .map(item => item.name)
                .includes("我的下载")
                ? "hide"
                : "active";
            }
            return "disabled";
          })(),
          download: selectedRowKeys.length > 0 ? "active" : "hide",
          deletedir: (() => {
            if (selectedRowKeys.length > 0) {
              return selectedRows.filter(v => v.lock).length > 0
                ? "disabled"
                : "active";
            }
            return "hide";
          })(),
          move: (() => {
            if (selectedRowKeys.length > 0) {
              return selectedRows.filter(v => v.lock).length > 0
                ? "disabled"
                : "active";
            }
            return "hide";
          })(),
          copy: selectedRowKeys.length > 0 ? "active" : "hide",
          share: (() => {
            if (!selectedRowKeys.length && listType === "default") {
              return activeHistoryList
                .filter(item => item.operation === "1")
                .map(item => item.name)
                .includes("我的下载")
                ? "hide"
                : "active";
            }
            return "disabled";
          })()
        }
      },
      () => {
        onBtnStateChange();
      }
    );
  };

  // 选择项回调
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState(
      {
        selectedRowKeys,
        selectedRows
      },
      this.setBtnControl
    );
  };

  // 清空已选
  cleanSelectedRow = () => {
    this.setState(
      {
        selectedRowKeys: [],
        selectedRows: []
      },
      this.setBtnControl
    );
  };

  // 表格斑马条纹
  rowBgColor = (record, index) => {
    if (!(index % 2 === 0)) {
      return styles.rowBgColor;
    }
    return styles.rowStyle;
  };

  // 展示popover
  showPopover = record => {
    const { fileList } = this.state;
    this.setState({
      fileList: fileList.map(item => ({
        ...item,
        popVisible: record.id === item.id
      }))
    });
  };

  // 隐藏popover
  hidePopover = () => {
    const { fileList } = this.state;
    this.setState({
      fileList: fileList.map(item => ({
        ...item,
        popVisible: false
      }))
    });
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
    const popContent = (
      <div className={styles.popContent}>
        {!record.lock && (
          <span
            onClick={() => {
              this.hidePopover();
              this.moveDir(record);
            }}
          >
            移动到
          </span>
        )}
        <span
          onClick={() => {
            this.hidePopover();
            this.copyDir(record);
          }}
        >
          复制到
        </span>
        {!record.lock && (
          <span
            onClick={() => {
              this.hidePopover();
              this.renameDir(record);
            }}
          >
            重命名
          </span>
        )}
        {!record.lock && (
          <span
            onClick={() => {
              this.hidePopover();
              this.deleteDirInfo(record);
            }}
          >
            删除
          </span>
        )}
      </div>
    );
    return (
      <div className={styles.fileNameWrap}>
        <img
          src={imgSrc}
          alt=""
          ref={e => {
            this[`imgDom${record.id}`] = e;
          }}
        />
        {record.edit ? (
          <div className={styles.newFileNameBar}>
            <Input value={text} onChange={this.newNameChange} />
            <Icon
              type="check-square"
              style={{ left: 190 }}
              onClick={this.addDirOk}
            />
            <Icon
              type="close-square"
              style={{ left: 220 }}
              onClick={this.addDirCancel}
            />
          </div>
        ) : (
          <span className={styles.fileTitle}>{text}</span>
        )}
        {!record.edit && (
          <div
            className={classnames(
              styles.operationBtnWrap,
              record.focus ? styles.active : ""
            )}
          >
            <Icon
              type="share-alt"
              onClick={() => {
                this.shareDir(record);
              }}
            />
            <Icon
              type="download"
              onClick={() => {
                this.downloadDir(record, imgSrc);
              }}
            />
            <Popover
              content={popContent}
              visible={record.popVisible}
              trigger="hover"
            >
              <Icon
                type="ellipsis"
                onClick={() => {
                  this.showPopover(record);
                }}
              />
            </Popover>
          </div>
        )}
      </div>
    );
  };

  // 鼠标移入行
  tableRowMouseEnter = (e, record) => {
    const { id } = record;
    const { fileList } = this.state;
    this.setState({
      fileList: fileList.map(item => ({
        ...item,
        focus: item.id === id
      }))
    });
  };

  // 鼠标离开行
  tableRowMouseLeave = () => {
    // const { id } = record;
    const { fileList } = this.state;
    this.setState(
      {
        fileList: fileList.map(item => ({
          ...item,
          focus: false
        }))
      },
      () => {
        this.hidePopover();
      }
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
      modalTitle,
      talbeHeight = 400,
      shareCode = "",
      shareCodeModalVisiable = false
    } = this.state;
    const activeHistoryList = historyList.slice(0, historyIdx + 1);
    // const { name = '全部文件' } = searchParams;

    const rowSelection = {
      onChange: this.onSelectChange,
      selectedRowKeys
    };

    return (
      <div
        className={styles.allFilePage}
        ref={e => {
          this.container = e;
        }}
      >
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
              onMouseEnter: e => this.tableRowMouseEnter(e, record),
              onMouseLeave: e => this.tableRowMouseLeave(e, record),
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
            width={110}
            render={text => (text ? renderSize(text) : "-")}
          />
          <Column
            title="修改时间"
            dataIndex="createTime"
            width={200}
            key="createTime"
            sorter
            sortDirections={["descend", "ascend"]}
            render={text => timeRender(text)}
          />
        </Table>
        <input
          type="file"
          ref={e => {
            this.input = e;
          }}
          style={{ display: "none" }}
          onChange={this.uploadSubmit}
        />
        <OperationModal
          visible={modalVisible}
          title={modalTitle}
          handleCancel={() => this.setState({ modalVisible: false })}
          handleOk={this.handleOk}
          fileList={modalFileList}
          loading={modalLoading}
          addNewFolder={this.modalAddDir}
          addNewFolderNameOk={this.modalDirAddFolderNameOk}
        />
        <Modal
          visible={shareCodeModalVisiable}
          title={false}
          closable={false}
          footer={null}
        >
          <div className={styles.shareCodeBody}>
            <span>共享码已生成，去分享吧~</span>
            <div>
              <span>{shareCode}</span>
              <span
                onClick={() => {
                  this.copyShareCode(shareCode);
                }}
              >
                复制
              </span>
            </div>
            <Button
              type="primary"
              style={{ float: "right" }}
              onClick={() => {
                this.setState({ shareCodeModalVisiable: false });
              }}
            >
              我知道了
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
