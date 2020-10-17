// import { Icon, Tooltip } from 'antd';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import React, { useCallback, ReactNode } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';


const GlobalHeaderRight = props => {
  const { className = {}, dispatch, currentUser } = props;
  console.log(currentUser)

  const onSearch = (value: string, callBack) => {
    dispatch({
      type: 'artical/fetchArticalSearchList',
      payload: { name: value },
    });
  };

  return (
    <div className={className}>
      <HeaderSearch onSearch={onSearch} />
      <Avatar menu />
    </div>
  );
};

export default connect(({artical}) => ({
  currentUser: artical,
}))(GlobalHeaderRight);
