import React, { Component } from 'react';
import styles from './index.less';
import EnterPriseMap from '../components/EnterPriseMap';

// const { TagCloud } = Charts;

class Plates extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className={styles.pageView}>
        <EnterPriseMap />
      </div>
    );
  }
}

export default Plates;
