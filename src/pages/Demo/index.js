import React, { Component } from "react";
import { Menu, Tabs } from "antd";
import classnames from "classnames";
import styles from "./index.less";
import Plates from "./Plates";
import Bar3d from "./Bar3d";

const { SubMenu, Item: MenuItem } = Menu;
const { TabPane } = Tabs;

const routes = [
  {
    pathname: "/demo/plates",
    name: "无限延伸图谱",
    key: "plates",
    icon: "apartment",
    components: <Plates />
  },
  {
    pathname: "/demo/bar3d",
    name: "3d柱状图",
    key: "bar3d",
    icon: "apartment",
    components: <Bar3d />
  },
  {
    name: "算法集合",
    key: "sfhj",
    icon: "calculator",
    children: [
      {
        name: "数据合并",
        key: "sjhb",
        icon: "pushpin",
        components: <span>暂无数据</span>
      },
      {
        name: "解析树结构",
        key: "jxsjg",
        icon: "pushpin",
        components: <span>暂无数据</span>
      }
    ]
  }
];

class Demo extends Component {
  state = {
    inlineCollapsed: true,
    selectedTab: "plates",
    mainTitle: "无限延伸图谱"
  };

  componentDidMount() {
    global.that = this;
  }

  changeTab = (key, name) => {
    this.setState({
      selectedTab: key,
      mainTitle: name
    });
  };

  // 生成组件tab
  displayTabs = routers => {
    const res = [];
    const travel = arr => {
      arr.forEach(item => {
        const { children, key, name, components } = item;
        if (children && children.length) {
          travel(children);
        } else {
          res.push({ key, name, components });
        }
      });
    };
    travel(routers);
    return res.map(item => (
      <TabPane tab={item.name} key={item.key}>
        {item.components}
      </TabPane>
    ));
  };

  render() {
    const { inlineCollapsed, mainTitle, selectedTab } = this.state;
    // 生成导航
    const displayMenus = routers => {
      const travel = arr => {
        return arr.map(item => {
          const { icon, name, key } = item;
          if (item.children && item.children.length) {
            return (
              <SubMenu
                key={key}
                title={
                  <span>
                    {/* {icon && <LegacyIcon type={icon} />} */}
                    <span>{name}</span>
                  </span>
                }
              >
                {travel(item.children)}
              </SubMenu>
            );
          }
          return (
            <MenuItem key={key} onClick={() => this.changeTab(key, name)}>
              {/* {icon && <LegacyIcon type={icon} />} */}
              <span>{name}</span>
            </MenuItem>
          );
        });
      };
      return travel(routers);
    };

    return (
      <div className={styles.pageView}>
        <div
          className={classnames(
            styles.menuBox,
            inlineCollapsed && styles.inlineCollapsed
          )}
        >
          <span
            className={styles.collapsed}
            onClick={() => {
              this.setState({ inlineCollapsed: !inlineCollapsed });
            }}
          >
            {/* <LegacyIcon type={inlineCollapsed ? "menu-unfold" : "menu-fold"} /> */}
          </span>
          <Menu
            selectedKeys={selectedTab}
            theme="dark"
            mode="inline"
            inlineCollapsed={inlineCollapsed}
          >
            {displayMenus(routes)}
          </Menu>
        </div>
        <div
          className={classnames(
            styles.pageMain,
            inlineCollapsed && styles.inlineCollapsed
          )}
        >
          <span className={styles.mainTitle}>{mainTitle}</span>
          <div className={styles.mainContent}>
            <Tabs activeKey={selectedTab}>{this.displayTabs(routes)}</Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default Demo;
