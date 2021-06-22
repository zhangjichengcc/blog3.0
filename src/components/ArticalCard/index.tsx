/**
 * ArticalCard
 * create by zhangjicheng
 * email zhangjichengcc@163.com
 */
import React, { Component } from "react";

import {
  EyeOutlined,
  FolderOpenOutlined,
  LikeOutlined,
  MessageOutlined,
  TagOutlined
} from "@ant-design/icons";

import moment from "js-moment";
import styles from "./index.less";
import Ellipsis from "@/components/Ellipsis";
import Img from "@/components/Img";
import classnames from "classnames";
import { offset } from "@/utils/utils";

interface Props {
  title: string; // 文章标题
  img: any;
  look: number;
  like: number;
  tag: Array<string> | null;
  msgCount: number;
  message: string;
  createTime: Date | string;
  onLike(): void;
  onClick?: (item: any) => void;
}

interface S {
  likeKey: boolean;
  likeCount: number;
}

class InputForm extends Component<Props, S> {
  static defaultProps = {
    title: "",
    img: null,
    look: 0,
    like: 0,
    tag: null,
    msgCount: 0,
    message: "",
    createTime: null,
    onClick: null
  };

  public readonly state: Readonly<S>;

  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount(): void {
    this.initCard();
    globalThis.addEventListener("scroll", this.scrollFun);
  }

  componentWillUnmount(): void {
    globalThis.removeEventListener("scroll", this.scrollFun);
  }

  // 初始化card
  initCard = () => {
    const { like } = this.props;
    // 初始化组件直接判断当前位置决定是否加载
    this.scrollFun();
    this.setState({ likeCount: like });
  };

  // 点击卡片触发
  click = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(this.props);
    }
  };

  onLike = (): void => {
    const { onLike } = this.props;
    const { likeKey, likeCount = 0 } = this.state;
    const newLikeKey = !likeKey;
    const newLikeCount = newLikeKey
      ? parseInt(likeCount, 10) + 1
      : parseInt(likeCount, 10) - 1;
    this.setState(
      {
        likeKey: newLikeKey,
        likeCount: newLikeCount
      },
      () => {
        onLike && onLike(newLikeKey, newLikeCount, this.props);
      }
    );
  };

  scrollFun = () => {
    if (offset(this.el).topBottom > -30) {
      this.setState(
        {
          loading: true
        },
        () => {
          globalThis.removeEventListener("scroll", this.scrollFun);
        }
      );
    }
  };

  render() {
    const {
      title,
      img,
      look,
      like,
      tag,
      msgCount,
      message,
      type,
      createTime
    } = this.props;
    const { loading = false, likeKey = false, likeCount } = this.state;
    return (
      <div
        ref={e => (this.el = e)}
        className={classnames(
          styles.artical_card,
          loading ? styles.active : ""
        )}
      >
        <div className={styles.artical_card_img} onClick={this.click}>
          {/* 滚动到可视范围内，开始加载图片 */}
          {/* 图片加载完毕，展示图片 */}
          <Img
            src={img}
            alt="banner"
            loading={loading}
            style={{ borderRadius: 10 }}
          />
        </div>
        <div className={styles.artical_card_content}>
          <Ellipsis className={styles.artical_card_title} lines={2}>
            <span onClick={this.click}>{title}</span>
          </Ellipsis>
          <div className={styles.artical_card_tag}>
            {look ? (
              <span>
                <EyeOutlined style={{ marginRight: 5 }} />
                {look}
              </span>
            ) : (
              ""
            )}
            <span
              onClick={this.onLike}
              className={likeKey ? styles.likeTag : ""}
            >
              <LikeOutlined className={styles.likeIcon} />
              {/* <LegacyIcon
                style={{ marginRight: 5 }}
                theme={likeKey ? "filled" : undefined}
                type="heart"
              /> */}
              {likeCount || 0}
            </span>
            {tag ? (
              <span>
                <TagOutlined style={{ marginRight: 5 }} />
                {tag}
              </span>
            ) : (
              ""
            )}
            {msgCount ? (
              <span>
                <MessageOutlined style={{ marginRight: 5 }} />
                {msgCount}
              </span>
            ) : (
              ""
            )}
            {type ? (
              <span>
                <FolderOpenOutlined style={{ marginRight: 5 }} />
                {type}
              </span>
            ) : (
              ""
            )}
          </div>
          <span className={styles.artical_card_createTime}>
            发布于
            {moment(createTime.replace(/\-/g, "/")).format("YYYY年MM月DD日")}
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
