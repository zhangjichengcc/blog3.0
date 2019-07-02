/**
 * ArticalCard
 */
import React, { Component } from 'react';
import { Icon } from 'antd';
import moment from 'js-moment';
import styles from './index.less';
import Ellipsis from '@/components/Ellipsis';

class InputForm extends Component {
  static defaultProps = {
    title: '',
    img: null,
    look: 0,
    like: 0,
    tag: null,
    msgCount: 0,
    message: '',
    createTime: null,
    onClick: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  // componentWillUnmount() {
  // }

  click = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(this.props);
    }
  };

  render() {
    const { title, img, look, like, tag, msgCount, message, createTime } = this.props;
    return (
      <div className={styles.artical_card}>
        <div className={styles.artical_card_img} onClick={this.click}>
          <span style={{ backgroundImage: `url(${img})` }} />
        </div>
        <div className={styles.artical_card_content}>
          <Ellipsis className={styles.artical_card_title} lines={2}>
            <span onClick={this.click}>{title}</span>
          </Ellipsis>
          <div className={styles.artical_card_tag}>
            {look ? (
              <span>
                <Icon style={{ marginRight: 5 }} type="eye" />
                {look}
              </span>
            ) : (
              ''
            )}
            {like ? (
              <span>
                <Icon style={{ marginRight: 5 }} type="heart" />
                {like}
              </span>
            ) : (
              ''
            )}
            {tag ? (
              <span>
                <Icon style={{ marginRight: 5 }} type="tag" />
                {tag}
              </span>
            ) : (
              ''
            )}
            {msgCount ? (
              <span>
                <Icon style={{ marginRight: 5 }} type="message" />
                {msgCount}
              </span>
            ) : (
              ''
            )}
          </div>
          <span className={styles.artical_card_createTime}>
            发布于{moment(createTime).format('YYYY年MM月DD日')}
          </span>
          <div className={styles.artical_card_message}>
            <Ellipsis lines={4}>{message}</Ellipsis>
          </div>
        </div>
      </div>
    );
  }
}

export default InputForm;
