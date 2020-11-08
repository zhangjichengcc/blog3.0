/*
 * @Author: zhangjicheng
 * @Date: 2019-12-04 10:59:22
 * @LastEditTime: 2020-11-06 20:25:51
 * @LastEditors: zhangjicheng
 * @Description: 文章管理页面
 * @FilePath: \blog3.0\src\pages\ArticalManage\index.js
 */

import React, { Component } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  UndoOutlined
} from "@ant-design/icons";
// import { Form } from "antd";
// import moment from 'moment';
import { Table, Input, Divider, Modal, message } from "antd";
import { history } from "umi";
import styles from "./index.less";
import "easymde/dist/easymde.min.css";
import { queryArticalList, deleteArtical } from "@/services/artical";
// import { uploadImg } from '@/services/image';
// import { insertArtical, updateArtical, getArtical, deleteArtical } from '@/services/artical';
// import { pageLoading, timeout } from '@/utils/utils';

// const { Item } = Form;
const { confirm } = Modal;

class Home extends Component {
  state = {
    dataList: [], // 当前页数据
    editLine: {}, // 编辑行数据
    loading: false, // 加载状态
    searchParams: {
      pageSize: 10,
      pageNum: 1
    },
    total: 0
  };

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {}

  // 请求表格数据
  fetchData = () => {
    const { searchParams } = this.state;
    const { pageNum, pageSize } = searchParams;
    this.setState({ loading: true });
    queryArticalList(searchParams).then(res => {
      const { data = {}, code } = res;
      const { list = [], total = 0 } = data;
      if (code === 0) {
        this.setState({
          dataList: list.map((item, idx) => ({
            ...item,
            no: idx + 1 + (pageNum - 1) * pageSize
          })),
          loading: false,
          total
        });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  // 编辑行方法
  editColums = record => {
    const { id } = record;
    this.setState({
      editId: id,
      editLine: record
    });
  };

  // 保存行
  saveColums = record => {
    const { id } = record;
    const { dataList, editLine } = this.state;
    const canSave = () => {
      const keys = Object.keys(editLine);
      let res = true;
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (!editLine[key]) {
          res = false;
          break;
        }
      }
      return res;
    };
    if (!canSave()) return;
    const index = dataList.findIndex(item => id === item.id);
    dataList.splice(index, 1, { ...dataList[index], ...editLine });
    this.setState({
      dataList,
      editId: ""
    });
  };

  // 取消行操作
  undoColums = () => {
    this.setState({ editId: "" });
  };

  // 删除行
  deleteColums = record => {
    const { id } = record;
    confirm({
      title: "确认删除该文章？",
      content: "删除操作不可逆，请谨慎操作！",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        deleteArtical({ id }).then(res => {
          const { code } = res;
          if (code === 0) {
            message.success("操作完成！");
            this.fetchData();
          }
        });
      }
    });
  };

  // 编辑触发
  inputChange = (e, key, type) => {
    const { editLine } = this.state;
    const { value } = e.target;
    const resVal = v => {
      if (type === "+num") {
        return v.replace(/[^0-9]/g, "").replace(/^0.+/, "0");
      }
      return v;
    };
    this.setState({
      editLine: {
        ...editLine,
        [key]: resVal(value)
      }
    });
  };

  // 表格切换
  onTableChange = (page, pageSize) => {
    const { searchParams } = this.state;
    this.setState(
      {
        searchParams: {
          ...searchParams,
          pageSize,
          pageNum: page
        }
      },
      this.fetchData
    );
  };

  /**
   * @description: 生成列表项
   * @param {object} record 当前行所有值
   * @param {string} key 要编辑的字段键名
   * @param {string} toast 提示信息
   * @param {string} type 校验类型（可选）
   * @return: {reactDom}
   */
  createTableItem = (record, key, toast, type) => {
    const { editId, editLine } = this.state;
    const value = editLine[key];
    const unTest = !value;
    // eslint-disable-next-line no-nested-ternary
    return editId === record.id ? (
      // <Item
      //   hasFeedback
      //   validateStatus={unTest ? "error" : "success"}
      //   help={unTest ? toast : ""}
      // >
      //   <Input
      //     placeholder="请输入文章名称"
      //     style={{ paddingRight: 26 }}
      //     value={value}
      //     onChange={e => {
      //       this.inputChange(e, `${key}`, type);
      //     }}
      //   />
      // </Item>
      "debug"
    ) : key === "title" ? (
      <a onClick={() => history.push(`/artical?id=${record.id}`)}>
        {record[key]}
      </a>
    ) : (
      <span>{record[key]}</span>
    );
  };

  render() {
    const {
      dataList = [],
      loading = false,
      searchParams = {},
      total = 10
    } = this.state;
    const { pageSize = 10, pageNum = 1 } = searchParams;

    const columns = [
      {
        title: "NO",
        dataIndex: "no",
        width: 60,
        align: "center"
      },
      {
        title: "id",
        dataIndex: "id",
        width: 60,
        align: "center"
      },
      {
        title: "标题",
        dataIndex: "title",
        ellipsis: true,
        render: (_text, record) => {
          return this.createTableItem(record, "title", "文章标题不能为空！");
        }
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        width: 170,
        render: (_text, record) => {
          return this.createTableItem(
            record,
            "createTime",
            "文章创建时间不能为空！"
          );
        }
      },
      {
        title: "阅读数",
        dataIndex: "readCount",
        ellipsis: true,
        width: 80,
        align: "center",
        render: (_text, record) => {
          return this.createTableItem(
            record,
            "readCount",
            "阅读数量不能为空！",
            "+num"
          );
        }
      },
      {
        title: "点赞数",
        dataIndex: "likeCount",
        ellipsis: true,
        width: 80,
        align: "center",
        render: (_text, record) => {
          return this.createTableItem(
            record,
            "likeCount",
            "点赞数不能为空！",
            "+num"
          );
        }
      },
      {
        title: "操作",
        dataIndex: "operation",
        align: "center",
        width: 80,
        render: (_text, record) => {
          const { editId } = this.state;
          return editId === record.id ? (
            <div>
              <a onClick={() => this.saveColums(record)}>
                <SaveOutlined />
              </a>
              <Divider type="vertical" />
              <a onClick={() => this.undoColums(record)}>
                <UndoOutlined />
              </a>
            </div>
          ) : (
            <div>
              <a onClick={() => this.editColums(record)}>
                <EditOutlined />
              </a>
              <Divider type="vertical" />
              <a onClick={() => this.deleteColums(record)}>
                <DeleteOutlined />
              </a>
            </div>
          );
        }
      }
    ];

    return (
      <div className={styles.artical_manage}>
        <Table
          loading={loading}
          bordered
          dataSource={dataList}
          columns={columns}
          rowClassName="editable-row"
          key="id"
          pagination={{
            onChange: this.onTableChange,
            size: "small",
            total,
            current: pageNum,
            showTotal: () => `共${total}条`,
            pageSize
          }}
        />
      </div>
    );
  }
}

export default Home;
