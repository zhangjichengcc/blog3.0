/**
 * ArticalCard
 */
import React, { Component } from 'react';
import { Icon } from 'antd';
import moment from 'js-moment';
import styles from './index.less';
import Ellipsis from '@/components/Ellipsis';
import classnames from 'classnames';
import { offset } from '@/utils/utils';

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

  componentDidMount() {
    global.offset = offset;
    window.addEventListener('scroll', this.scrollFun);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFun);
  }

  click = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(this.props);
    }
  };

  scrollFun = () => {
    if (offset(this.el).topBottom > -20) {
      this.setState({
        loading: true,
      }, () => {
        window.removeEventListener('scroll', this.scrollFun);
      });
    }
  };

  render() {
    const { title, img, look, like, tag, msgCount, message, createTime } = this.props;
    const { loading } = this.state;
    return (
      <div ref={e => this.el = e } className={classnames(styles.artical_card, loading ? styles.active : '')}>
        <div className={styles.artical_card_img} onClick={this.click}>
          <span style={loading ? { backgroundImage: `url(${img})` } : {}} />
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
