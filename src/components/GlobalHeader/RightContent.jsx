import { Icon, Tooltip } from 'antd';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import React, { useCallback } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';

const GlobalHeaderRight = props => {
  const { className = {}, dispatch } = props;

  const onSearch = (value, callBack) => {
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

export default connect(GlobalHeaderRight);
