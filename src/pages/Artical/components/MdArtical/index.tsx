import React, { FC } from "react";
import { Anchor } from "antd";
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

import styles from './index.less';

const { Link } = Anchor;

// 格式化marked文本，使其支持锚点
const addAnchor = (text: string) => {
  if (typeof text !== "string") return "";
  return text.replace(
    /#+\s+(.*)?(?=\s+)?/g,
    ($0, $1, idx) => {
      const anchor = $1.replace(/[^\u4e00-\u9fa5|\w]/g, '');
      return `<h2 id="a">aaa</h2>`;
      // return `${$0}\n[](#head)`;
    }
  );
};

// 文章导航
const MdMenus: FC<{ markdownString: string }> = ({
  markdownString
}): React.ReactElement => {
  const handleClick = (e: { preventDefault: () => void }) => {
    // params (@e, @link)
    e.preventDefault();
  };

  const options = {
    offsetTop: 86,
    onClick: handleClick,
    showInkInFixed: true
    // targetOffset: -300,
    // bounds: 1000,
  };

  const navListSource = markdownString?.match(/#+\s+(.*)?/g) || [];
  const titleObj = navListSource.map((v: any = "", idx) => {
    const level = v?.match(/^#+/g)[0]?.length;
    const title = v?.replace(/^#+\s+/, '');
    const anchor = `#${title?.replace(/[^\u4e00-\u9fa5|\w]/g, '')}`;
    // const anchor = `#head`;
    const text = v;
    return {title, level, anchor, text};
  });

  return (
    <Anchor {...options}>
      <p className={styles.menuTitle}>目录</p>
      {titleObj.map((item: any = {}, idx) => {
        const { title, level, anchor } = item;
        const keys = `key_${idx + 1}`;
        return (
          <Link
            key={keys}
            href={anchor}
            target={anchor}
            title={
              <span className={classnames(styles.anchor, styles[`h${level}`])}>
                {title}
              </span>
            }
          />
        );
      })}
    </Anchor>
  );
};

// 文章主体
const MdArtical: FC<{ children: string }> = ({
  children,
}): React.ReactElement => {
  const headDom = ({level, node, children}) => {

  }
  return (
    <ReactMarkdown
      renderers={{
        // eslint-disable-next-line react/display-name
        code: ({language, value}) => {
          return <SyntaxHighlighter style={darcula} language={language}>{value}</SyntaxHighlighter>
        },
        heading: headDom,
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

export default MdArtical;
export {
  MdMenus,
}