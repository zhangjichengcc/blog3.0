/**
 * 企业图谱
 * @author zhangjicheng
 * @email zhangjc@hua-cloud.com.cn
 * @date 2019-11-12
 */

import React, { Component } from "react";
import { connect } from "dva";
import G6 from "@antv/g6";
import { CheckOutlined } from "@ant-design/icons";
import { Drawer, Spin } from "antd";
import classnames from "classnames";
// import { getDataTree } from '@/services/enterpriseDetail';
import imgURL from "@/assets/image/demo/home.png";
import styles from "./index.less";
import mockData from "./mock";

// 计算字符串的长度
const calcStrLen = str => {
  let len = 0;
  str.split("").forEach((_item, idx) => {
    len =
      str.charCodeAt(idx) > 0 && str.charCodeAt(idx) < 128 ? len + 1 : len + 2;
  });
  return len;
};

// 定义数据样式配置
const mcList = {
  dbMap: { label: "数据A", color: "#ba87f5", position: "right" },
  gdMap: { label: "数据B", color: "#fe9048", position: "left" },
  ggMap: { label: "数据C", color: "#fe6e7e", position: "right" },
  gyMap: { label: "数据D", color: "#f89c2b", position: "right" },
  tzMap: { label: "数据E", color: "#ebb41c", position: "left" }
};

// 格式化初始数据
const displayData = (data, title = "", root = "root", impPosition) => {
  const labelMaxLength = 8; // 设置label最大长度
  const pageSize = 8; // 设置分页大小
  const rootLabel = title.replace(/(.{4})/g, "$1\n");
  // 定义根目录
  const res = {
    label: rootLabel,
    id: root,
    children: [],
    level: 0,
    rootTree: root === "root"
  };
  // 格式化子元素
  // @prefix:id前缀 @key:父级label, @position: 文字走向，同父级 @all: 是否返回完整数据
  const displayChildren = (prefix, key, position, all = false) => {
    const arr = data[key];
    const childArrDef = arr.map((item, idx) => {
      const { nsrmc = "" } = item;
      return {
        ...item,
        id: `${prefix}_${idx}`,
        label:
          calcStrLen(nsrmc) > labelMaxLength
            ? `${nsrmc.slice(0, labelMaxLength)}...`
            : nsrmc,
        qlabel: nsrmc,
        level: 2,
        position: impPosition || position,
        rootTree: root === "root"
      };
    });
    // 初始化过滤条数
    const childArr = childArrDef.filter((_item, idx) => idx < pageSize);
    if (all) return childArrDef;
    return arr.length > pageSize
      ? [
          ...childArr,
          {
            id: `${prefix}_btn`,
            label: `更多（${arr.length - pageSize}）`,
            type: "btn",
            position: impPosition || position,
            level: 2
          }
        ]
      : childArr;
  };
  // 格式化父元素
  Object.keys(data).forEach(key => {
    const { label, color, position } = mcList[key];
    const id = `${root}_${key}`;
    res.children.push({
      id,
      label,
      name: key,
      level: 1,
      color,
      position: impPosition || position,
      children: displayChildren(id, key, position),
      _children: displayChildren(id, key, position, 1), // 写入完整数据，用于处理加载更多操作
      pageNum: 1, // 默认第一页
      pageSize,
      rootTree: root === "root"
    });
  });
  return res;
};

@connect(() => ({}))
class EnterPriseMap extends Component {
  state = {
    treeDataList: {},
    loading: false
  };

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState(
        {
          treeDataList: displayData(mockData.data),
          loading: false
        },
        this.initCharts
      );
    }, 1500);
  };

  // 初始化图表
  initCharts = () => {
    const { treeDataList } = this.state;
    const dom = document.getElementById("mountNode_enterprise_map");
    const that = this;
    // 自定义边
    G6.registerEdge(
      "step-line",
      {
        getControlPoints: cfg => {
          const { startPoint, endPoint } = cfg;
          return [
            {
              x: startPoint.x,
              y: endPoint.y
            }
          ];
        }
      },
      "polyline"
    );

    const graph = new G6.TreeGraph({
      container: "mountNode_enterprise_map",
      animate: true,
      animateCfg: {
        duration: 300
      },
      width: dom.offsetWidth,
      height: dom.offsetHeight,
      pixelRatio: 2,
      fitView: true, // 是否开启自适应
      fitViewPadding: 50, // 四周留白
      modes: {
        default: [
          {
            type: "collapse-expand",
            onChange: function onChange(item, collapsed) {
              const data = item.get("model");
              const { level = 2 } = data;
              if (level === 1) {
                data.collapsed = collapsed;
              } else {
                data.collapsed = !collapsed;
              }
              return false;
            }
          },
          {
            type: "tooltip",
            formatText: model => {
              const { qlabel = "" } = model;
              return (
                qlabel &&
                `<span style="display: inline-bloc; padding: 2px 8px; color: #666; font-size: 12px; background-color: #fff; border-radius: 3px; -webkit-box-shadow: 0 2px 8px rgba(0,0,0,0.15); box-shadow: 0 2px 8px rgba(0,0,0,0.15);">${qlabel}</span>`
              );
            }
          },
          "drag-canvas",
          "zoom-canvas"
        ]
      },
      defaultNode: {
        anchorPoints: [
          [0.5, 0.5],
          [0.5, 0.5]
        ]
      },
      defaultEdge: {
        shape: "step-line",
        color: "#eee"
      },
      layout: {
        type: "mindmap",
        direction: "H",
        getHeight: () => 20,
        getWidth: () => 100,
        getVGap: () => 4,
        getHGap: () => 40,
        // 设置节点走向，只对根节点直连节点有效并作用于所有子孙节点
        getSide: node => {
          const {
            data: { position }
          } = node;
          return position;
        }
      }
    });
    // 节点设置
    graph.node(node => {
      const {
        label = "",
        color = null,
        type,
        position,
        id,
        level,
        cgbl,
        children
      } = node;
      const nodeOpt = {
        size: level === 1 || level === 0 ? 45 : 0.1,
        icon:
          id === "root"
            ? {
                show: true,
                width: 35,
                height: 35,
                img: imgURL
              }
            : null,
        label: cgbl ? `${label}${cgbl}%` : label,
        style: {
          fill: id === "root" ? "#40a9ff" : color,
          stroke: color || null
        },
        labelCfg: (() => {
          if (id === "root") {
            // root label样式
            return {
              position: "bottom",
              offset: 10,
              refX: 10,
              style: {
                fill: "#3c8dce",
                stroke: "#3c8dce",
                lineWidth: 0.3
              }
            };
          }
          if (level === 1) {
            return {
              position: "center",
              style: {
                cursor: "pointer",
                fill: "#fff",
                stroke: "#fff",
                lineWidth: 0.3,
                fontSize: 12
              }
            };
          }
          if (level === 2 && children) {
            return {
              position: "center",
              style: {
                cursor: "pointer",
                fill: "#fff",
                stroke: "#fff",
                lineWidth: 0.3,
                fontSize: 12
              }
            };
          }
          return {
            position,
            // 设置更多按钮样式
            style:
              type === "btn"
                ? {
                    cursor: "pointer",
                    fill: "#3c8dce",
                    stroke: "#3c8dce",
                    lineWidth: 0.3
                  }
                : {
                    cursor: "pointer",
                    fill: "#ccc",
                    stroke: "#ccc",
                    lineWidth: 0.1
                  }
          };
        })()
      };
      return nodeOpt;
    });
    // graph.edge(edge => {
    //   const { target } = edge;
    //   // const { bboxCache = {} } = target;
    //   const { cgbl = '', x, y } = target.getModel();
    //   return {
    //     label: cgbl ? `${cgbl}%` : '',
    //     labelCfg: {
    //       refY: 20,
    //       style: {
    //         fill: '#ccc',
    //         // fontSize: 10,
    //         textAlign: 'left',
    //         textBaseline: 'bottom',
    //         x,
    //         y,
    //       },
    //     },
    //   };
    // });
    graph.on("node:click", e => {
      const { item } = e;
      const { level, type } = item.getModel();
      if (level === 2) {
        if (type === "btn") {
          that.loadMore(item);
        } else {
          that.otherMore(item);
        }
      }
    });
    graph.data(treeDataList);
    graph.render();
    this.setState({ graph });
  };

  // 展示更多
  loadMore = child => {
    const { graph } = this.state;
    // eslint-disable-next-line no-underscore-dangle
    const { parent, model } = child._cfg;
    // parent.lock();
    // eslint-disable-next-line no-underscore-dangle
    const {
      _children: children,
      pageSize,
      pageNum,
      id: pid
    } = parent.getModel();
    const newPageNum = pageNum + 1;
    const addChildLsit = children.slice(0, pageSize * newPageNum);
    const parentData = graph.findDataById(pid);
    const label = `更多（${children.length - pageSize * newPageNum}）`;
    const childData = {
      // id: model.id,
      id: `${model.id}_${newPageNum}`, // 更新id, 强制渲染节点
      position: model.position,
      type: "btn",
      level: 2,
      depth: model.depth,
      label
    };
    const btn = children.length > pageSize * newPageNum ? childData : false;
    parentData.children = btn ? [...addChildLsit, btn] : addChildLsit;
    parentData.pageNum = newPageNum;
    // graph.refreshItem(graph.findById(model.id));
    graph.refreshLayout();
  };

  // 深度展示链条-此时开始加载数据
  otherMore = child => {
    const model = child.getModel();
    const { qlabel, id, position } = model;
    const { graph } = this.state;
    const targetData = graph.findDataById(id);
    // eslint-disable-next-line no-underscore-dangle
    const { _children = false } = targetData;
    this.setState(
      {
        drawerVisiable: true,
        selectedModel: model
      },
      () => {
        if (!_children) {
          // 数据未加载过,请求数据
          this.setState({ loadingLink: true });
          setTimeout(() => {
            const data = displayData(mockData.data, qlabel, id, position);
            const { children } = data;
            // eslint-disable-next-line no-underscore-dangle
            targetData._children = children;
            this.setState({
              loadingLink: false,
              canUseBtn: children
                .filter(item => item.children && item.children.length)
                .map(item => item.name)
            });
          }, 500);
        } else {
          this.setState({
            loadingLink: false,
            canUseBtn: _children
              .filter(item => item.children && item.children.length)
              .map(item => item.name)
          });
        }
      }
    );
  };

  // 选择展示的链条数据
  chooseLink = key => {
    const { selectedModel, graph } = this.state;
    const { id } = selectedModel;
    const targetData = graph.findDataById(id);
    // eslint-disable-next-line no-underscore-dangle
    const { _children = false, selectedLink = [] } = targetData;
    targetData.selectedLink = selectedLink.includes(key) ? [] : [key];
    targetData.children = selectedLink.includes(key)
      ? []
      : _children.filter(v => v.name === key);
    graph.refreshLayout();
    this.setState({ drawerVisiable: false });
  };

  render() {
    const {
      drawerVisiable = false,
      selectedModel = {},
      loading = false,
      loadingLink = false,
      canUseBtn = []
    } = this.state;
    const {
      qlabel: modelTitle = "企业信息",
      selectedLink = []
    } = selectedModel;
    return (
      <div className={styles.pageView}>
        <div
          id="mountNode_enterprise_map"
          style={{ width: "100%", height: "100%" }}
        />
        <Drawer
          title={modelTitle}
          placement="left"
          closable={false}
          onClose={() => {
            this.setState({ drawerVisiable: false });
          }}
          visible={drawerVisiable}
          getContainer={false}
          style={{ position: "absolute" }}
          // mask={false}
          className={styles.Drawer}
        >
          {Object.keys(mcList).map(key => {
            const { color, label } = mcList[key];
            const selected = selectedLink.includes(key);
            const disable = !canUseBtn.includes(key);
            return (
              <div
                className={classnames(
                  styles.drawerBtn,
                  selected && styles.active,
                  disable && styles.disable
                )}
                style={{ backgroundColor: color, marginBottom: 24 }}
                onClick={() => {
                  if (!disable) this.chooseLink(key);
                }}
              >
                <span>{label}</span>
                <CheckOutlined />
              </div>
            );
          })}
          {loadingLink && (
            <div className={styles.drawerLoading}>
              <Spin />
            </div>
          )}
        </Drawer>
        {loading && (
          <div className={styles.spinBox}>
            <div className={styles.lineContent}>
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <p>图谱生成中...</p>
          </div>
        )}
      </div>
    );
  }
}

export default EnterPriseMap;
