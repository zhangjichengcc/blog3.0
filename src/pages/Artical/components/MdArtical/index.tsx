import React, { FC } from "react";
import { Anchor } from "antd";
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

import styles from './index.less';

const { Link } = Anchor;

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
    showInkInFixed: true,
    affix: false,
    // targetOffset: -300,
    // bounds: 1000,
  };

  const navListSource = markdownString?.match(/#+\s+(.*)?/g) || [];
  const titleObj = navListSource.map((v: any = "") => {
    const level = v?.match(/^#+/g)[0]?.length;
    const title = v?.replace(/^#+\s+/, '');
    const anchor = `#${title?.replace(/[^\u4e00-\u9fa5|\w]/g, '')}`;
    // const anchor = `#head`;
    const text = v;
    return {title, level, anchor, text};
  });

  return (
    <div className={styles.menu}>
      <p className={styles.menuTitle}>目录</p>
      <Anchor {...options}>
        {titleObj.map((item: any = {}, idx) => {
          const { title, level, anchor } = item;
          const keys = `key_${idx + 1}`;
          return (
            <Link
              key={keys}
              href={anchor}
              target={anchor}
              title={
                <span title={title} className={classnames(styles.anchor, styles[`h${level}`])}>
                  {title}
                </span>
              }
            />
          );
        })}
      </Anchor>
    </div>
  );
};

// 文章主体
const MdArtical: FC<{ children: string }> = ({
  children,
}): React.ReactElement => {
  interface HeadDomProps {
    level: number;
    node: any;
    children: any;
  }
  const HeadDom: FC<HeadDomProps> = ({level, node, children}): any => {
    const text = node.children.reduce((prev: string, cur: { value: string; }) => prev.concat(cur?.value), '');
    const id = `${text?.replace(/[^\u4e00-\u9fa5|\w]/g, '')}`;
    const h_type = `h${level}`;
    const h_props = {id}
    const h_content = (
      <>
        <span>{children}</span>
        <a href={`#${id}`} />
      </>
    )
    return React.createElement(h_type, h_props, h_content)
  }
  return (
    <ReactMarkdown
      renderers={{
        // eslint-disable-next-line react/display-name
        code: ({language, value}) => <SyntaxHighlighter style={darcula} language={language}>{value}</SyntaxHighlighter>,
        heading: HeadDom,
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