import React, { FC } from "react";
import styles from "./index.less";

const Footer: FC<any> = (): React.ReactElement => {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; 2016-2020 Veigar</p>
      <p>坑位招租 坑位招租 坑位招租 赞助提供</p>
    </footer>
  );
};

export default Footer;
