/*
 * @Author: zhangjicheng
 * @Date: 2019-12-04 10:59:22
 * @LastEditTime: 2019-12-04 19:31:58
 * @LastEditors: Please set LastEditors
 * @Description: 文章管理页面
 * @FilePath: \blog3.0\src\pages\ArticalManage\index.js
 */

import React, { Component } from 'react';
// import moment from 'moment';
import { Table, Form, Input, Divider, Icon, Modal, message } from 'antd';
// import router from 'umi/router';
import styles from './index.less';
import 'easymde/dist/easymde.min.css';
import { deleteArtical } from '@/services/artical';
// import { uploadImg } from '@/services/image';
// import { insertArtical, updateArtical, getArtical, deleteArtical } from '@/services/artical';
// import { pageLoading, timeout } from '@/utils/utils';

const { Item } = Form;
const { confirm } = Modal;

const data = [];
for (let i = 0; i < 100; i += 1) {
  data.push({
    id: i.toString(),
    title: `Edrward ${i}`,
    readCount: 32,
    likeCount: 32,
  });
}

class Home extends Component {
  state = {
    dataList: [], // 当前页数据
    editLine: {}, // 编辑行数据
    loading: false, // 加载状态
  };

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {}

  fetchData = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        dataList: data,
        loading: false,
      });
    }, 1000);
  };

  // 编辑行方法
  editColums = record => {
    const { id } = record;
    this.setState({
      editId: id,
      editLine: record,
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
      editId: '',
    });
  };

  // 取消行操作
  undoColums = () => {
    this.setState({ editId: '' });
  };

  // 删除行
  deleteColums = record => {
    const { id } = record;
    confirm({
      title: '确认删除该文章？',
      content: '删除操作不可逆，请谨慎操作！',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deleteArtical({ id }).then(res => {
          const { code } = res;
          if (code === 0) {
            message.success('操作完成！');
            this.fetchData();
          }
        });
      },
    });
  };

  // 编辑触发
  inputChange = (e, key, type) => {
    const { editLine } = this.state;
    const { value } = e.target;
    const resVal = v => {
      if (type === '+num') {
        return v.replace(/[^0-9]/g, '').replace(/^0.+/, '0');
      }
      return v;
    };
    this.setState({
      editLine: {
        ...editLine,
        [key]: resVal(value),
      },
    });
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
    return editId === record.id ? (
      <Item hasFeedback validateStatus={unTest ? 'error' : 'success'} help={unTest ? toast : ''}>
        <Input
          placeholder="请输入文章名称"
          style={{ paddingRight: 26 }}
          value={value}
          onChange={e => {
            this.inputChange(e, `${key}`, type);
          }}
        />
      </Item>
    ) : (
      <span>{record[key]}</span>
    );
  };

  render() {
    const { dataList = [], loading = false } = this.state;

    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        width: 60,
        align: 'center',
      },
      {
        title: '标题',
        dataIndex: 'title',
        ellipsis: true,
        render: (_text, record) => {
          return this.createTableItem(record, 'title', '文章标题不能为空！');
        },
      },
      {
        title: '阅读数',
        dataIndex: 'readCount',
        ellipsis: true,
        width: 100,
        align: 'center',
        render: (_text, record) => {
          return this.createTableItem(record, 'readCount', '阅读数量不能为空！', '+num');
        },
      },
      {
        title: '点赞数',
        dataIndex: 'likeCount',
        ellipsis: true,
        width: 100,
        align: 'center',
        render: (_text, record) => {
          return this.createTableItem(record, 'likeCount', '点赞数不能为空！', '+num');
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        width: 80,
        render: (_text, record) => {
          const { editId } = this.state;
          return editId === record.id ? (
            <div>
              <a onClick={() => this.saveColums(record)}>
                <Icon type="save" />
              </a>
              <Divider type="vertical" />
              <a onClick={() => this.undoColums(record)}>
                <Icon type="undo" />
              </a>
            </div>
          ) : (
            <div>
              <a onClick={() => this.editColums(record)}>
                <Icon type="edit" />
              </a>
              <Divider type="vertical" />
              <a onClick={() => this.deleteColums(record)}>
                <Icon type="delete" />
              </a>
            </div>
          );
        },
      },
    ];

    return (
      <div className={styles.artical_manage}>
        <Table
          loading={loading}
          bordered
          dataSource={dataList}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </div>
    );
  }
}

export default Home;
