/*
 * @Author: zhangjicheng
 * @Date: 2020-08-25 16:23:14
 * @LastEditTime: 2020-08-28 17:28:14
 * @LastEditors: Please set LastEditors
 * @Description: 3d柱状图
 */

import React, { FC, useState, useEffect, useRef } from 'react';

import echarts from 'echarts';
import 'echarts-gl';
import styles from './index.less';

const hours = [
  '12AM',
  '1AM',
  '2AM',
  '3AM',
  '4AM',
  '5AM',
  '6AM',
  '7AM',
  '8AM',
  '9AM',
  '10AM',
  '11AM',
  '12PM',
  '1PM',
  '2PM',
  '3PM',
  '4PM',
  '5PM',
  '6PM',
  '7PM',
  '8PM',
  '9PM',
  '10PM',
  '11PM',
];
const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const mock = [
  [0, 0, 5],
  [0, 1, 1],
  [0, 2, 0],
  [0, 3, 0],
  [0, 4, 0],
  [0, 5, 0],
  [0, 6, 0],
  [0, 7, 0],
  [0, 8, 0],
  [0, 9, 0],
  [0, 10, 0],
  [0, 11, 2],
  [0, 12, 4],
  [0, 13, 1],
  [0, 14, 1],
  [0, 15, 3],
  [0, 16, 4],
  [0, 17, 6],
  [0, 18, 4],
  [0, 19, 4],
  [0, 20, 3],
  [0, 21, 3],
  [0, 22, 2],
  [0, 23, 5],
  [1, 0, 7],
  [1, 1, 0],
  [1, 2, 0],
  [1, 3, 0],
  [1, 4, 0],
  [1, 5, 0],
  [1, 6, 0],
  [1, 7, 0],
  [1, 8, 0],
  [1, 9, 0],
  [1, 10, 5],
  [1, 11, 2],
  [1, 12, 2],
  [1, 13, 6],
  [1, 14, 9],
  [1, 15, 11],
  [1, 16, 6],
  [1, 17, 7],
  [1, 18, 8],
  [1, 19, 12],
  [1, 20, 5],
  [1, 21, 5],
  [1, 22, 7],
  [1, 23, 2],
  [2, 0, 1],
  [2, 1, 1],
  [2, 2, 0],
  [2, 3, 0],
  [2, 4, 0],
  [2, 5, 0],
  [2, 6, 0],
  [2, 7, 0],
  [2, 8, 0],
  [2, 9, 0],
  [2, 10, 3],
  [2, 11, 2],
  [2, 12, 1],
  [2, 13, 9],
  [2, 14, 8],
  [2, 15, 10],
  [2, 16, 6],
  [2, 17, 5],
  [2, 18, 5],
  [2, 19, 5],
  [2, 20, 7],
  [2, 21, 4],
  [2, 22, 2],
  [2, 23, 4],
  [3, 0, 7],
  [3, 1, 3],
  [3, 2, 0],
  [3, 3, 0],
  [3, 4, 0],
  [3, 5, 0],
  [3, 6, 0],
  [3, 7, 0],
  [3, 8, 1],
  [3, 9, 0],
  [3, 10, 5],
  [3, 11, 4],
  [3, 12, 7],
  [3, 13, 14],
  [3, 14, 13],
  [3, 15, 12],
  [3, 16, 9],
  [3, 17, 5],
  [3, 18, 5],
  [3, 19, 10],
  [3, 20, 6],
  [3, 21, 4],
  [3, 22, 4],
  [3, 23, 1],
  [4, 0, 1],
  [4, 1, 3],
  [4, 2, 0],
  [4, 3, 0],
  [4, 4, 0],
  [4, 5, 1],
  [4, 6, 0],
  [4, 7, 0],
  [4, 8, 0],
  [4, 9, 2],
  [4, 10, 4],
  [4, 11, 4],
  [4, 12, 2],
  [4, 13, 4],
  [4, 14, 4],
  [4, 15, 14],
  [4, 16, 12],
  [4, 17, 1],
  [4, 18, 8],
  [4, 19, 5],
  [4, 20, 3],
  [4, 21, 7],
  [4, 22, 3],
  [4, 23, 0],
  [5, 0, 2],
  [5, 1, 1],
  [5, 2, 0],
  [5, 3, 3],
  [5, 4, 0],
  [5, 5, 0],
  [5, 6, 0],
  [5, 7, 0],
  [5, 8, 2],
  [5, 9, 0],
  [5, 10, 4],
  [5, 11, 1],
  [5, 12, 5],
  [5, 13, 10],
  [5, 14, 5],
  [5, 15, 7],
  [5, 16, 11],
  [5, 17, 6],
  [5, 18, 0],
  [5, 19, 5],
  [5, 20, 3],
  [5, 21, 4],
  [5, 22, 2],
  [5, 23, 0],
  [6, 0, 1],
  [6, 1, 0],
  [6, 2, 0],
  [6, 3, 0],
  [6, 4, 0],
  [6, 5, 0],
  [6, 6, 0],
  [6, 7, 0],
  [6, 8, 0],
  [6, 9, 0],
  [6, 10, 1],
  [6, 11, 0],
  [6, 12, 2],
  [6, 13, 1],
  [6, 14, 3],
  [6, 15, 4],
  [6, 16, 0],
  [6, 17, 0],
  [6, 18, 0],
  [6, 19, 0],
  [6, 20, 1],
  [6, 21, 2],
  [6, 22, 2],
  [6, 23, 6],
];

// 创建动态数据
const mkData = () => {
  const arr = [];
  for (let i = 0; i <= 6; i += 1) {
    for (let j = 0; j <= 23; j += 1) {
      arr.push([i, j, Math.random() * (j + 6 - i)]);
    }
  }
  return arr;
};

const Bar3d: FC = () => {
  const chartsDom = useRef(null);
  const [myCharts, setMyCharts] = useState<any>(null);
  const [timer, setTimer] = useState<any>(null);

  // 默认设置
  const option = {
    tooltip: {},
    visualMap: {
      max: 24,
      inRange: {
        color: [
          '#f0f5ff',
          '#d6e4ff',
          '#adc6ff',
          '#85a5ff',
          '#597ef7',
          '#2f54eb',
          '#1d39c4',
          '#10239e',
          '#061178',
          '#030852',
        ],
      },
    },
    xAxis3D: {
      type: 'category',
      data: hours,
    },
    yAxis3D: {
      type: 'category',
      data: days,
    },
    zAxis3D: {
      type: 'value',
    },
    grid3D: {
      boxWidth: 200,
      boxDepth: 80,
      viewControl: {
        // projection: 'orthographic'
      },
      light: {
        main: {
          intensity: 1.2,
          shadow: true,
        },
        ambient: {
          intensity: 0.3,
        },
      },
    },
    series: [
      {
        type: 'bar3D',
        data: [],
        shading: 'lambert',
        label: {
          textStyle: {
            fontSize: 16,
            borderWidth: 1,
          },
        },
        emphasis: {
          label: {
            textStyle: {
              fontSize: 20,
              color: '#faad14',
            },
          },
          itemStyle: {
            color: '#faad14',
          },
        },
      },
    ],
  };

  // 写入配置信息
  const setOption = (data: any, charts: any) => {
    const _data = data.map((item: number[]) => ({ value: [item[1], item[0], item[2]] }));
    option.series[0].data = _data;
    charts.setOption(option);
  };

  // 获取数据
  const fetchData = (charts: any) => {
    const data = mock;
    setOption(data, charts);
  };

  // 动态图表
  const setAuto = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    } else {
      const _timer = setInterval(() => {
        const _data = mkData();
        setOption(_data, myCharts);
      }, 2000);
      setTimer(_timer);
    }
  };

  // 初始化页面
  const initPage = () => {
    const { current } = chartsDom;
    const charts = echarts.init(current);
    setMyCharts(charts);
    fetchData(charts);
  };

  useEffect(() => {
    initPage();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className={styles.view}>
      <span
        className={styles.btn}
        style={{ position: 'absolute', left: 40, top: 40, zIndex: 1000 }}
        onClick={setAuto}
      >
        {timer ? '关闭动态' : '动态图表'}
      </span>
      <div ref={chartsDom} />
    </div>
  );
};

export default Bar3d;
