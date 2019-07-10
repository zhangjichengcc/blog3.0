/**
 * ArticalCard
 */
import React, { Component } from 'react';
// import { Icon } from 'antd';
// import moment from 'js-moment';
// import classnames from 'classnames';
import { throttle } from '@/utils/utils';
import styles from './index.less';

class Advert extends Component {
  static defaultProps = {
    title: '广告位招租',
  };

  constructor(props) {
    super(props);
    this.state = {
      clientHeight: 750,
      show: false,
      closed: false,
    };
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFun);
  }

  init = () => {
    const { clientHeight } = document.body;
    this.setState(
      {
        clientHeight,
      },
      () => {
        window.addEventListener('scroll', this.scrollFun);
      },
    );
  };

  scrollFun = () => {
    const fn = () => {
      const { clientHeight, show } = this.state;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const res = scrollTop + 10 > clientHeight;
      if (show === res) return;
      this.setState(
        {
          show: res,
        },
        () => {
          console.log(res);
        },
      );
    };
    throttle(fn);
  };

  click = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(this.props);
    }
  };

  close = () => {
    this.setState({ closed: true });
  };

  render() {
    const { show, closed } = this.state;
    const { title, position, img } = this.props;
    const style = {
      display: !closed && show ? 'block' : 'none',
      backgroundImage: `url(${img})`,
      right: position === 'right' ? 0 : 'auto',
    };

    return (
      <div
        onClick={this.click}
        style={style}
        className={styles.advert}
      >
        <span className={styles.btn} onClick={this.close}>
          关闭
        </span>
        <span>{title}</span>
      </div>
    );
  }
}

export default Advert;
