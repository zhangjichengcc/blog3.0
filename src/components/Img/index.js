/**
 * Img
 * create by zhangjicheng 
 * email zhangjichengcc@163.com
 */
import React, { Component } from 'react';
import styles from './index.less';
import defaultImg from '@/assets/image/default-bgimg.jpg';
import loadingImg from '@/assets/image/img-loding.gif';
import errorImg from '@/assets/image/img-error.jpg';

class InputForm extends Component {
  static defaultProps = {
    src: undefined,
    alt: 'image',
    loading: true,    // 开始加载，默认true
    style: {},        // 扩展样式
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,  // 是否加载完毕
      error: false,
    };
  }

  componentDidMount() {
    const { props } = this;
    this.init(props);
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps);
  }

  init = (props) => { 
    const { src, loading } = props;
    this.setState({
      imgSrc: loading ? src || defaultImg : null,
    })
  }
  
  loadedImg = () => {
    this.setState({
      loaded: true,
    })
  }

  loadError = (e) => {
    const { imgSrc } = this.state;
    if(!imgSrc) return;
    this.setState({
      error: true,
      loaded: true,
    })
  }

  render() {
    const { 
      loaded = false,
      error = false,
      imgSrc = null,
    } = this.state;
    const { src, alt, style = {}, loading = true, key } = this.props;
    
    const ImgStyle = {
      ...style,
      backgroundImage: loaded ? '' : `url(${loadingImg}) `,
    }
    const imgStyle = {
      opacity: loading && loaded ? 1 : 0,
    }
    return (
      <div key={key} className={styles.Img} style={ImgStyle}>
        {
          error ? <div className={styles.errorArea}><span>图片无法显示</span></div> : <img src={imgSrc} alt={alt} onLoad={this.loadedImg} onError={this.loadError} style={imgStyle} />
        }
      </div>
    );
  }
}

export default InputForm;
