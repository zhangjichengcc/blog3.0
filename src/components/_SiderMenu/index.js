/*
 * @Author: zhangjicheng
 * @Date: 2020-11-04 10:48:35
 * @LastEditTime: 2020-11-05 17:57:44
 * @LastEditors: zhangjicheng
 * @Description:
 * @FilePath: \blog3.0\src\components\_SiderMenu\index.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
import React from "react";
import { Drawer } from "antd";
import SiderMenu from "./SiderMenu";
import { getFlatMenuKeys } from "./SiderMenuUtils";

// eslint-disable-next-line react/display-name
const SiderMenuWrapper = React.memo(props => {
  const { isMobile, menuData, collapsed, onCollapse } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      onClose={() => onCollapse(true)}
      style={{
        padding: 0,
        height: "100vh"
      }}
    >
      <SiderMenu
        {...props}
        flatMenuKeys={flatMenuKeys}
        collapsed={isMobile ? false : collapsed}
      />
    </Drawer>
  ) : (
    <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />
  );
});

export default SiderMenuWrapper;
