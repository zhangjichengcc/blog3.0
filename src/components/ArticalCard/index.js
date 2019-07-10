/**
 * ArticalCard
 * create by zhangjicheng 
 * email zhangjichengcc@163.com
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
    this.state = {
      likeCount: 0,
    };
  }

  componentDidMount() {
    global.offset = offset;
    this.initCard();
    window.addEventListener('scroll', this.scrollFun);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFun);
  }

  initCard = () => {
    const { like } = this.props;
    // 初始化组件直接判断当前位置决定是否加载
    this.scrollFun();
    this.setState({ likeCount: like });
  }

  click = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(this.props);
    }
  };

  onLike = () => {
    const { onLike } = this.props;
    const { likeKey, likeCount = 0 } = this.state;
    const newLikeKey = !likeKey;
    const newLikeCount = newLikeKey ? parseInt(likeCount, 10) + 1 : parseInt(likeCount, 10) - 1;
    this.setState({
      likeKey: newLikeKey,
      likeCount: newLikeCount, 
    }, () => {
      onLike && onLike(newLikeKey, newLikeCount, this.props);
    });
  }

  scrollFun = () => {
    if (offset(this.el).topBottom > -10) {
      this.setState({
        loading: true,
      }, () => {
        window.removeEventListener('scroll', this.scrollFun);
      });
    }
  };

  loadedImg = () => {
    this.setState({loaded: true});
  }

  render() {
    const { title, img, look, like, tag, msgCount, message, type, createTime } = this.props;
    const { loading, loaded = false, likeKey = false, likeCount } = this.state;
    return (
      <div ref={e => this.el = e } className={classnames(styles.artical_card, loading ? styles.active : '')}>
        <div className={styles.artical_card_img} onClick={this.click}>
          <span className={styles.artical_card_img_src}>
            {/* 滚动到可视范围内，开始加载图片 */}
            {/* 图片加载完毕，展示图片 */}
            <img src={loading ? img : ''} onLoad={this.loadedImg} style={loaded ? {opacity: 1} : {opacity: 0}}/>
          </span>
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
            ) : ''}
            <span onClick={this.onLike} className={likeKey ? styles.likeTag : ''}>
              <Icon className={styles.likeIcon} type="like" />
              <Icon style={{ marginRight: 5 }} theme={likeKey ? 'filled' : ''} type="heart" />
              {likeCount || 0}
            </span>
            {tag ? (
              <span>
                <Icon style={{ marginRight: 5 }} type="tag" />
                {tag}
              </span>
            ) : ''}
            {msgCount ? (
              <span>
                <Icon style={{ marginRight: 5 }} type="message" />
                {msgCount}
              </span>
            ) : ''}
            {
              type ? (
                <span>
                  <Icon style={{ marginRight: 5 }} type="folder-open" />
                  {type}
                </span>
              ) : ''
            }
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
