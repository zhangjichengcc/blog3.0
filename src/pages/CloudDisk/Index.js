/* stylelint-disable */
import React, { Component } from 'react';
import { Button, Input, Menu, Icon, Modal, Badge, Tabs, message } from 'antd';
import styled, { keyframes } from 'styled-components';
import AllFile from './AllFile';
import LoadingPage from './LoadingPage';
import UploadPage from './UploadPage';
import ShareFiles from './ShareFiles';
import styles from './Index.less';
import { emptyUploadAndDownloadList } from '@/services/cloudDisk';
// import classnames from 'classnames';

const { Search } = Input;
const { TabPane } = Tabs;
const { Item, ItemGroup } = Menu;
const { confirm } = Modal;

export default class CloudDisk extends Component {
  state = {
    AllFileCom: {}, // 子组件实例
    LoadingPageCom: {}, // 子组件实例
    pageTab: 'allFile',
    uploadCount: 0,
    loadingCount: 0,
    btnControler: {
      upload: 'active',
      newdir: 'active',
      download: 'hide',
      deletedir: 'hide',
      move: 'hide',
      copy: 'hide',
    },
  };

  componentDidMount() {
    global.that = this;
    this.initData();

    // window.addEventListener('beforeunload', this.beforeunload);
  }

  // beforeunload (e) {
  //   let confirmationMessage = '你确定离开此页面吗asdfasdfs?';
  //   (e || window.event).returnValue = confirmationMessage;
  //   return confirmationMessage;
  // }

  // onbeforeunload = () => {
  //   debugger
  // }

  // 初始化页面
  initData = () => {
    // 获取下载列表
    // this.downloadSuccess();
    // this.fetchLoadingList();
    // this.setNavList();
    // window.onbeforeunload = this.onbeforeunload();
    emptyUploadAndDownloadList().then();
    window.onbeforeunload = e => {
      const { uploadCount, loadingCount } = this.state;
      if (uploadCount || loadingCount) {
        const ev = window.event || e;
        ev.returnValue = '存在正在上传或下载的文件，是否继续退出？';
      }
    };
  };

  // 获取正在下载数量
  // fetchLoadingList = () => {
  //   this.setState({
  //     loadingCount: 0,
  //   })
  // }

  // 全局搜索
  onSearch = value => {
    const { AllFileCom } = this.state;
    this.setState({ searchValue: value }, () => {
      AllFileCom.search();
    });
  };

  // 打开文件
  openDir = record => {
    this.onTabChange('allFile');
    this.setNavTab(record.id);
    const { AllFileCom } = this.state;
    // id = 0 则为根目录，单独处理面包屑及历史记录逻辑
    AllFileCom.openDirNav(record, record.id);
  };

  // 上传文件
  uploadDir = () => {
    const { AllFileCom } = this.state;
    AllFileCom.uploadFile();
  };

  // 输入共享文件码
  inputShareCode = () => {
    const { shareCode } = this.state;
    if (!shareCode) {
      message.warn('请输入共享码！');
      return;
    }
    this.setState({
      shareCodeModalVisiable: false,
      shareDirVisiable: true,
    });
  };

  // 新建文件
  addDir = () => {
    const { AllFileCom } = this.state;
    // 调用子组件新建方法
    AllFileCom.addNewDir();
  };

  // 下载文件
  downloadDir = () => {
    const { AllFileCom } = this.state;
    AllFileCom.downloadDir();
  };

  // 移动文件
  moveDir = () => {
    const { AllFileCom } = this.state;
    AllFileCom.moveDir();
  };

  // 复制文件
  copyDir = () => {
    const { AllFileCom } = this.state;
    AllFileCom.copyDir();
  };

  // 删除文件
  deleteDir = () => {
    const { AllFileCom } = this.state;
    // 取消新建或修改文件名操作
    AllFileCom.addDirCancel();
    confirm({
      title: '确定删除这些文件吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        AllFileCom.deleteDir();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 绑定子组件
  bindChildAllFile = child => {
    this.setState({ AllFileCom: child });
  };

  bindChildLoadingPage = child => {
    this.setState({ LoadingPageCom: child });
  };

  bindChildUploadPage = child => {
    this.setState({ UploadPageCom: child });
  };

  // 控制按钮可操作性
  btnContro = () => {
    const { AllFileCom = {} } = this.state;
    const { state = {} } = AllFileCom;
    const { btnControler } = state;
    // 从子组件获取按钮状态并写入state
    if (btnControler) this.setState({ btnControler });
  };

  // 触发设置导航样式
  handleClick = item => {
    const key = item.dirId || item.key || 0;
    this.setState({ navTab: key.toString() });
  };

  // 文件下载动画
  downloadAnimate = (sourceX, sourceY, imgSrc) => {
    const { loadingCount } = this.state;
    const { downLoadingNav } = this;
    const { left, top: y } = downLoadingNav.getBoundingClientRect();
    const { clientWidth: bodyWidth } = document.body;
    const { clientWidth: rootWidth } = document.getElementById('root');
    const targetX = left - (bodyWidth - rootWidth) / 2;
    const targetY = y - 80;
    // const animateTime = 700;
    const animateTime = 1000;

    const opacity = keyframes`
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 1; }
    `;

    const move = keyframes`
      0% { top: ${sourceY}px; left: ${sourceX}px; }
      20% { top: ${sourceY + 30}px; left: ${sourceX - 10}px; }
      40% { top: ${sourceY + 30}px; left: ${sourceX - 10}px; }
      100% { top: ${targetY + 10}px; left: ${targetX + 80}px; }
    `;

    const LoadTag = styled.div`
      position: absolute;
      z-index: 1;
      width: 30px;
      height: 22px;
      background-image: url(${imgSrc});
      background-repeat: no-repeat;
      background-position: center;
      background-size: auto 100%;
      animation: ${opacity} ${animateTime / 1000}s linear forwards,
        ${move} ${animateTime / 1000}s ease-in-out forwards;
    `;

    this.setState({
      LoadTag,
      showLoadTag: true,
    });
    const timer1 = setTimeout(() => {
      this.setState(
        {
          showLoadTag: false,
          loadingCount: loadingCount + 1,
        },
        () => {
          clearTimeout(timer1);
          const timer2 = setTimeout(() => {
            clearTimeout(timer2);
            this.downloadSuccess();
          }, 1500);
        }
      );
    }, animateTime);
  };

  // 文件下载完成触发
  downloadSuccess = uuid => {
    const { LoadingPageCom } = this.state;
    // LoadingPageCom.fetchFileList();
    if (uuid) LoadingPageCom.finishList(uuid);
  };

  // 文件上传动画
  uploadloadAnimate = () => {
    const { uploadCount = 0, UploadPageCom } = this.state;
    const timer1 = setTimeout(() => {
      clearTimeout(timer1);
      this.setState(
        {
          showLoadTag: false,
          uploadCount: uploadCount + 1,
        },
        () => {
          const timer2 = setTimeout(() => {
            clearTimeout(timer2);
            UploadPageCom.fetchFileList();
            // this.uploadSuccess();
          }, 1500);
        }
      );
    }, 500);
  };

  // 文件上传完成触发
  uploadSuccess = () => {
    const { UploadPageCom } = this.state;
    UploadPageCom.fetchFileList();
  };

  // 取消下载
  deleteLoading = () => {
    const { LoadingPageCom } = this.state;
    confirm({
      title: '确定删除这些下载文件？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        LoadingPageCom.deleteList();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  // 刷新正在下载列表，生成数量
  setLoadingCount = () => {
    const { LoadingPageCom } = this.state;
    const { fileList = [] } = LoadingPageCom.state;
    this.setState({
      loadingCount: fileList.length,
    });
  };

  // 刷新正在上传列表，生成数量
  setUploadCount = () => {
    const { UploadPageCom } = this.state;
    const { fileList = [] } = UploadPageCom.state;
    this.setState({
      uploadCount: fileList.length,
    });
  };

  // tab切换
  onTabChange = tab => {
    this.setState({ pageTab: tab });
  };

  setNavTab = tab => {
    const { LoadingPageCom, UploadPageCom, navTab } = this.state;
    if (tab.toString() === navTab) return;
    this.setState(
      {
        navTab: tab.toString(),
      },
      () => {
        if (tab === 'download') {
          LoadingPageCom.startFetch();
          UploadPageCom.stopFetch();
        } else if (tab === 'upload') {
          UploadPageCom.startFetch();
          LoadingPageCom.stopFetch();
        } else {
          LoadingPageCom.stopFetch();
          UploadPageCom.stopFetch();
        }
      }
    );
  };

  // 关闭共享文件结构
  closeShareFiles = () => {
    const { AllFileCom } = this.state;
    AllFileCom.fetchFileList();
    this.setState({ shareDirVisiable: false, shareCode: '' });
  };

  render() {
    const {
      loadingCount = 0,
      uploadCount = 0,
      btnControler = {},
      showLoadTag = false,
      LoadTag = {},
      pageTab = {},
      navTab = '0',
      searchValue = '',
      // LoadingPageCom = {},
      shareCode = '',
      shareCodeModalVisiable = false,
      shareDirVisiable = false,
    } = this.state;

    // 获取操作控制队列
    const { upload, newdir, download, deletedir, move, copy, share } = btnControler;

    return (
      <div className={styles.cloudDiskPage}>
        <div className={styles.headerWrap}>
          <span className={styles.title}>小抽屉</span>
          {pageTab === 'allFile' && (
            <div className={styles.btnWrap}>
              {upload !== 'hide' && (
                <Button
                  className={styles.btn}
                  disabled={upload === 'disabled'}
                  onClick={this.uploadDir}
                  type="primary"
                >
                  上传
                </Button>
              )}
              <Button className={styles.btn} onClick={this.addDir} disabled={newdir === 'disabled'}>
                新建文件夹
              </Button>
              {share !== 'hide' && (
                <Button
                  className={styles.btn}
                  disabled={shareCodeModalVisiable || share === 'disabled'}
                  onClick={() => {
                    this.setState({ shareCodeModalVisiable: true });
                  }}
                  type="primary"
                >
                  输入文件共享码
                </Button>
              )}
              {download !== 'hide' && (
                <Button
                  className={styles.btn}
                  onClick={this.downloadDir}
                  disabled={download === 'disabled'}
                >
                  下载
                </Button>
              )}
              {deletedir !== 'hide' && (
                <Button
                  className={styles.btn}
                  onClick={this.deleteDir}
                  disabled={deletedir === 'disabled'}
                >
                  删除
                </Button>
              )}
              {move !== 'hide' && (
                <Button
                  className={styles.btn}
                  onClick={this.moveDir}
                  disabled={move === 'disabled'}
                >
                  移动到
                </Button>
              )}
              {copy !== 'hide' && (
                <Button
                  className={styles.btn}
                  onClick={this.copyDir}
                  disabled={copy === 'disabled'}
                >
                  复制到
                </Button>
              )}
            </div>
          )}
          {pageTab === 'allFile' && (
            <div className={styles.searchWrap}>
              <Search
                placeholder="输入文件名搜索"
                onSearch={this.onSearch}
                style={{ width: 200 }}
              />
            </div>
          )}
          {/* {
            pageTab === 'loadingPage' &&
            <Button className={styles.btn} onClick={this.deleteLoading} disabled={!LoadingPageCom.state.selectedRowKeys.length}>
              删除
            </Button>
          } */}
        </div>
        <div className={styles.container}>
          <div className={styles.menuWrap}>
            <Menu selectedKeys={[navTab]} mode="inline">
              <Item key={0} onClick={() => this.openDir({ name: '全部文件', id: 0 })}>
                <Icon type="folder" />
                <span>全部文件</span>
              </Item>
              <Item key={1} onClick={() => this.openDir({ name: '我的资源', id: 1 })}>
                <Icon type="profile" />
                <span>我的资源</span>
              </Item>
              <Item key={2} onClick={() => this.openDir({ name: '我的下载', id: 2 })}>
                <Icon type="cloud-download" />
                <span>我的下载</span>
              </Item>
              <ItemGroup title="传输列表">
                <Item
                  key="upload"
                  onClick={() => {
                    this.setNavTab('upload');
                    this.onTabChange('uploadPage');
                  }}
                >
                  <Badge count={uploadCount} offset={[13, 0]} overflowCount={99}>
                    <Icon type="upload" />
                    <span>正在上传</span>
                  </Badge>
                </Item>
                <Item
                  key="download"
                  onClick={() => {
                    this.setNavTab('download');
                    this.onTabChange('loadingPage');
                  }}
                >
                  <Badge count={loadingCount} offset={[13, 0]} overflowCount={99}>
                    <div
                      ref={e => {
                        this.downLoadingNav = e;
                      }}
                    >
                      <Icon type="download" />
                      <span>正在下载</span>
                    </div>
                  </Badge>
                </Item>
                {/* <Item key="finish" onClick={() => { this.setNavTab('finish'); this.onTabChange('loadingPage') }}>
                  <div>
                    <Icon type="check-circle" />
                    <span>传输完成</span>
                  </div>
                </Item> */}
              </ItemGroup>
            </Menu>
          </div>
          <div className={styles.contentWrap}>
            <Tabs activeKey={pageTab}>
              <TabPane tab="allFile" forceRender key="allFile">
                <AllFile
                  parent={this}
                  bind={this.bindChildAllFile}
                  onBtnStateChange={this.btnContro}
                  onMenuClick={this.handleClick}
                  downloadAnimate={this.downloadAnimate}
                  uploadloadAnimate={this.uploadloadAnimate}
                  downloadSuccess={this.downloadSuccess}
                  uploadSuccess={this.uploadSuccess}
                  searchValue={searchValue}
                />
              </TabPane>
              <TabPane tab="uploadPage" forceRender key="uploadPage">
                <UploadPage
                  parent={this}
                  bind={this.bindChildUploadPage}
                  setLoadingCount={this.setUploadCount}
                />
              </TabPane>
              <TabPane tab="loadingPage" forceRender key="loadingPage">
                <LoadingPage
                  parent={this}
                  bind={this.bindChildLoadingPage}
                  setLoadingCount={this.setLoadingCount}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
        {showLoadTag && <LoadTag />}
        <Modal
          visible={shareCodeModalVisiable}
          title={false}
          closable={false}
          okText="确定"
          cancelText="取消"
          onCancel={() => this.setState({ shareCodeModalVisiable: false, shareCode: '' })}
          onOk={this.inputShareCode}
        >
          <div className={styles.shareCodeBody}>
            <Input
              placeholder="请输入6为大写字母组成的共享码"
              value={shareCode}
              onChange={v =>
                this.setState({ shareCode: v.target.value.replace(/[^A-Z]/g, '').slice(0, 6) })
              }
            />
          </div>
        </Modal>
        <Modal
          width="1000px"
          visible={shareDirVisiable}
          title={false}
          closable={false}
          footer={null}
        >
          <ShareFiles
            parent={this}
            onClose={this.closeShareFiles}
            shareCode={shareCode}
            downloadAnimate={this.downloadAnimate}
            downloadSuccess={this.downloadSuccess}
          />
        </Modal>
      </div>
    );
  }
}
