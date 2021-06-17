import React, { PureComponent } from "react";
import { Modal, Tree, Button, Input, message, Spin } from "antd";
import * as Svg from "@/utils/svgImport";
import styles from "./index.less";

const { TreeNode, DirectoryTree } = Tree;
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
const loop = (data, key, callback) => {
  data.forEach((item, index, arr) => {
    if (item.id.toString() === key) {
      return callback(item, index, arr);
    }
    if (item.catelist) {
      return loop(item.catelist, key, callback);
    }
    return "";
  });
};

export default class OperationModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectTreeNode: ["0"], // 选择的树节点
      expandedKeys: ["0"], // 展开的树节点
      newFolderName: "新建文件夹" // 新建文件夹名称
    };
  }

  componentDidMount() {}

  // 点击树节点事件
  onSelect = keys => {
    if (keys[0] === "newId") {
      return;
    }
    this.setState({
      selectTreeNode: [...keys]
    });
  };

  // 收起展开树节点
  onExpand = keys => {
    this.setState({
      expandedKeys: [...keys]
    });
  };

  // 渲染文件树
  treeRender = data => {
    return data.map(item => {
      let imgSrc = "";
      if (item.operation === "1") {
        imgSrc = Svg.suodingSvg;
      } else if (
        item.type === "folder" ||
        (!item.type && item.operation === "0")
      ) {
        imgSrc = Svg.folderSvg;
      } else if (item.type === "file") {
        const type = item.name.slice(item.name.lastIndexOf(".") + 1);
        if (fileTypeList.indexOf(type) === -1) {
          imgSrc = Svg.fileIconSvg;
        } else {
          imgSrc = fileLogoObj[type];
        }
      }
      if (item.catelist) {
        return (
          <TreeNode
            icon={<img width="24" src={imgSrc} alt="" />}
            title={item.id === "newId" ? this.newFolderRender() : item.dirName}
            key={item.id}
          >
            {this.treeRender(item.catelist)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          icon={<img width="24" src={imgSrc} alt="" />}
          title={item.id === "newId" ? this.newFolderRender() : item.dirName}
          key={item.id}
          isLeaf
        />
      );
    });
  };

  // 新建文件夹改名渲染
  newFolderRender = () => {
    const { newFolderName } = this.state;
    return (
      <span>
        <Input
          value={newFolderName}
          className={styles.newFolderInput}
          placeholder="请输入文件夹名称"
          size="small"
          onChange={this.newFolderChange}
        />
        <Button
          className={styles.newFolderBtn}
          icon="check"
          size="small"
          onClick={() => this.editFolderNameOk()}
        />
        <Button
          className={styles.newFolderBtn}
          icon="close"
          size="small"
          onClick={() => this.editFolderNameCancel()}
        />
      </span>
    );
  };

  // 新建文件夹输入框change事件
  newFolderChange = e => {
    this.setState({
      newFolderName: e.target.value
    });
  };

  // 确定新建
  editFolderNameOk = () => {
    const { newFolderName, expandedKeys } = this.state;
    const { addNewFolderNameOk, fileList } = this.props;
    const list = [...fileList];
    let isSame = false;
    loop(list, "newId", (item, index, arr) => {
      for (let i = 0; i < arr.length - 1; i += 1) {
        if (arr[i].dirName === newFolderName) {
          isSame = true;
        }
      }
      if (isSame) {
        message.error("文件夹已存在，请更换命名");
      } else {
        addNewFolderNameOk({
          dirName: newFolderName,
          parentId: Number(expandedKeys[0])
        });
      }
    });
  };

  // 取消新建
  editFolderNameCancel = () => {
    const { fileList, addNewFolder } = this.props;
    const list = [...fileList];
    loop(list, "newId", (item, index, arr) => {
      arr.pop();
    });
    if (addNewFolder) addNewFolder(list);
  };

  // 新建文件夹
  addNewFolder = () => {
    const { selectTreeNode, expandedKeys } = this.state;
    const { fileList, addNewFolder } = this.props;
    const list = [...fileList];

    // 清除之前的新建
    loop(list, "newId", (item, index, arr) => {
      arr.pop();
    });

    loop(list, selectTreeNode[0], item => {
      // eslint-disable-next-line no-param-reassign
      if (item.type === "file") {
        return message.error("不能在文件下新建文件夹");
      }
      item.catelist = item.catelist || [];
      item.catelist.push({
        dirName: "新建文件夹",
        id: "newId",
        operation: "0"
      });
      this.setState({
        newFolderName: "新建文件夹"
      });
      const listArr = [item.id.toString()].concat(expandedKeys);
      this.onExpand(listArr);
    });
    if (addNewFolder) addNewFolder(list);
  };

  // 关闭弹窗
  handleCancel = () => {
    const { handleCancel } = this.props;
    this.editFolderNameCancel();
    this.setState(
      {
        selectTreeNode: ["0"],
        expandedKeys: ["0"],
        newFolderName: "新建文件夹"
      },
      () => {
        handleCancel();
      }
    );
  };

  render() {
    const { selectTreeNode, expandedKeys } = this.state;
    const {
      title,
      handleOk,
      fileList,
      visible,
      loading,
      addBtnStatus = true
    } = this.props;

    return (
      <Modal
        title={title}
        visible={visible}
        onOk={e => handleOk(e, selectTreeNode)}
        onCancel={this.handleCancel}
        destroyOnClose
      >
        <Spin spinning={loading}>
          <DirectoryTree
            onSelect={this.onSelect}
            defaultSelectedKeys={selectTreeNode}
            expandedKeys={expandedKeys}
            onExpand={this.onExpand}
          >
            {this.treeRender(fileList)}
          </DirectoryTree>
        </Spin>
        {addBtnStatus && (
          <Button
            className={styles.addBtn}
            onClick={() => {
              this.addNewFolder();
            }}
          >
            新建文件夹
          </Button>
        )}
      </Modal>
    );
  }
}
