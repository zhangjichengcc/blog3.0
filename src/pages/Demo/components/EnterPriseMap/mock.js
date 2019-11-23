const mockData = {
  code: 0,
  error: 'success',
  data: {
    dbMap: [
      {
        nsrmc: 'XXXX置业有限公司',
      },
      {
        nsrmc: 'XXX房地产开发有限公司',
      },
      {
        nsrmc: 'Gain Pioneer Limited',
      },
      {
        nsrmc: 'Vanke Best Gain Holdings Limited',
      },
      {
        nsrmc: 'XXXXQQWW学校',
      },
      {
        nsrmc: '22-12JACKSON AVENUE OWNER LLC',
      },
      {
        nsrmc: 'XXXX有限公司',
      },
      {
        nsrmc: 'XXX房地产开发有限公司',
      },
      {
        nsrmc: 'Sinobird Holding Limited',
      },
      {
        nsrmc: 'XXX置业有限公司',
      },
      {
        nsrmc: 'XXX管理有限公司',
      },
      {
        nsrmc: 'XXXX限公司',
      },
      {
        nsrmc: 'Alliance Grace Limited',
      },
      {
        nsrmc: 'XXX科双语学校',
      },
      {
        nsrmc: 'XXX管理股份有限公司',
      },
      {
        nsrmc: 'XX有限公司',
      },
      {
        nsrmc: 'XXX旅游度假村有限公司',
      },
      {
        nsrmc: 'Fozter Limited',
      },
      {
        nsrmc: 'XXXX产有限公司',
      },
      {
        nsrmc: 'XXX有限公司',
      },
      {
        nsrmc: 'XXX限公司',
      },
      {
        nsrmc: 'XXXX有限公司',
      },
      {
        nsrmc: 'XXX限公司',
      },
      {
        nsrmc: 'XXXX房地产有限公司',
      },
      {
        nsrmc: 'C Plaza Co.,Ltd.',
      },
      {
        nsrmc: 'XXXXX房地产开发有限责任公司',
      },
      {
        nsrmc: 'Hybest(BVI)Company Limited',
      },
      {
        nsrmc: '物业服务(XX)有限公司',
      },
    ],
    gdMap: [
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 1.68,
        nsrmc: '中央汇金资产管理有限责任公司',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 6.19,
        nsrmc: 'XX保险股份有限公司-保守型投资组合',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 13.96,
        nsrmc: 'XX中央结算(代理人)有限公司',
      },
      {
        cgbl: 8.19,
        nsrmc: 'XXXX份有限公司',
      },
      {
        cgbl: 1.47,
        nsrmc: 'XX保险股份有限公司-自有资金',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 2.91,
        nsrmc: 'XXX专项资产管理计划',
      },
      {
        cgbl: 2.43,
        nsrmc: 'XX中央结算有限公司',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 3.04,
        nsrmc: 'XX保险股份有限公司-海利年年',
      },
      {
        cgbl: 4.04,
        nsrmc: 'XXX合资产管理计划',
      },
      {
        cgbl: 28.69,
        nsrmc: 'XXXX有限公司',
      },
    ],
    ggMap: [
      {
        nsrmc: '张三',
        zw: '非独立董事',
      },
      {
        nsrmc: '杨勇',
        zw: '副总裁',
      },
      {
        nsrmc: '张三',
        zw: '董事会主席',
      },
      {
        nsrmc: '能能',
        zw: '非独立董事',
      },
      {
        nsrmc: '勇少',
        zw: '独立董事',
      },
      {
        nsrmc: '德莱文',
        zw: '总裁',
      },
      {
        nsrmc: '哦巴马',
        zw: '非职工代表监事',
      },
      {
        nsrmc: '哦巴马',
        zw: '监事会主席',
      },
      {
        nsrmc: '杨勇',
        zw: '董事会秘书',
      },
      {
        nsrmc: '勇',
        zw: '财务负责人',
      },
      {
        nsrmc: '王石',
        zw: '董事会名誉主席',
      },
      {
        nsrmc: '寒冰',
        zw: '独立董事',
      },
      {
        nsrmc: '德玛',
        zw: '非独立董事',
      },
      {
        nsrmc: '德莱文',
        zw: '首席执行官',
      },
      {
        nsrmc: '复仇之矛',
        zw: '独立董事',
      },
      {
        nsrmc: '杨勇',
        zw: '公司秘书',
      },
      {
        nsrmc: '仰泳',
        zw: '非独立董事',
      },
      {
        nsrmc: '勇',
        zw: '非独立董事',
      },
      {
        nsrmc: '仰泳',
        zw: '执行副总裁',
      },
      {
        nsrmc: '陈军',
        zw: '非独立董事',
      },
      {
        nsrmc: '郑方形',
        zw: '非职工代表监事',
      },
      {
        nsrmc: '周星星',
        zw: '职工代表监事',
      },
      {
        nsrmc: '仰泳',
        zw: '首席运营官',
      },
      {
        nsrmc: '勇',
        zw: '执行副总裁',
      },
      {
        nsrmc: '德玛',
        zw: '董事会副主席',
      },
      {
        nsrmc: '李强',
        zw: '独立董事',
      },
    ],
    gyMap: [
      {
        nsrmc: 'QWER集团股份有限公司',
      },
      {
        nsrmc: 'XXXX工程设计股份有限公司',
      },
      {
        nsrmc: 'SSS涂料股份有限公司',
      },
      {
        nsrmc: 'XXX术股份有限公司',
      },
      {
        nsrmc: 'XXX建筑设计股份有限公司',
      },
      {
        nsrmc: 'XXXX份有限公司',
      },
      {
        nsrmc: 'XXXX股份有限公司',
      },
      {
        nsrmc: 'XXX防水技术股份有限公司',
      },
      {
        nsrmc: 'XXX计算科技股份有限公司',
      },
      {
        nsrmc: 'XXX能科技股份有限公司',
      },
      {
        nsrmc: 'QWER全程地产顾问股份有限公司',
      },
      {
        nsrmc: 'XXXX息技术股份有限公司',
      },
      {
        nsrmc: 'XXX幕墙股份有限公司',
      },
      {
        nsrmc: '666社区技术股份有限公司',
      },
      {
        nsrmc: 'XXX文化创意股份有限公司',
      },
      {
        nsrmc: 'XXX规划设计股份有限公司',
      },
      {
        nsrmc: '日立电梯(中国)有限公司',
      },
      {
        nsrmc: 'XXX装饰股份有限公司',
      },
      {
        nsrmc: '科技股份有限公司',
      },
      {
        nsrmc: 'XXXX股份有限公司',
      },
    ],
    tzMap: [
      {
        cgbl: 100,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'XEXE企业管理咨询有限公司',
      },
      {
        cgbl: 50,
        nsrmc: 'XXX投资管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW建筑技术发展(XXXX',
      },
      {
        nsrmc: 'QQWW企业集团（简称：QQWW集团）',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX份有限公司维修部',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX管理有限公司',
      },
      {
        cgbl: 15,
        nsrmc: '天津QQWW房地产有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'XXX地产有限公司',
      },
      {
        cgbl: 30.8,
        nsrmc: '666纵横资产管理有限公司',
      },
      {
        cgbl: 80,
        nsrmc: '青岛QQWW银盛泰房地产有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX份有限公司格兰玛西餐厅',
      },
      {
        cgbl: 65,
        nsrmc: '大连QQWW锦绣花城开发有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '郑州QQWW企业有限公司',
      },
      {
        cgbl: 6.6667,
        nsrmc: '沈阳万方实业股份有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '福州市QQWW发展有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '贵阳QQWW房地产有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '苏州QQWW企业有限公司',
      },
      {
        cgbl: 95,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX基金管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW（YY）企业有限公司',
      },
      {
        cgbl: 0,
        nsrmc: 'XXXX咨询有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW物流发展有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '万翼科技有限公司',
      },
      {
        cgbl: 15,
        nsrmc: '广东中建新型建筑构件有限公司',
      },
      {
        cgbl: 10,
        nsrmc: 'XXX有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '宁波QQWW企业有限公司',
      },
      {
        cgbl: 30,
        nsrmc: 'XXX滑雪有限公司',
      },
      {
        nsrmc: '安徽QQWW企业有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX推广传播有限公司',
      },
      {
        cgbl: 50,
        nsrmc: 'YY两江QQWW投资有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '莆田市QQWW投资有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '兰州QQWW企业有限公司',
      },
      {
        cgbl: 0,
        nsrmc: 'XXX股份有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW企业股份有限公司北海公司',
      },
      {
        nsrmc: 'XXX有限公司',
      },
      {
        cgbl: 8.65,
        nsrmc: 'XXX中心(有限合伙)',
      },
      {
        cgbl: 60,
        nsrmc: 'XXX科房地产开发有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '海南QQWW企业管理有限公司',
      },
      {
        cgbl: 60,
        nsrmc: 'XXXX筑技术有限公司',
      },
      {
        cgbl: 95,
        nsrmc: 'XXXXX发有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '济南QQWW企业有限公司',
      },
      {
        cgbl: 60,
        nsrmc: 'XXX科房地产开发有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '苏州QQWW企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX场',
      },
      {
        cgbl: 15,
        nsrmc: '天津QQWW房地产有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QWERW企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '大连QQWW置业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '青岛QQWW房地产有限公司',
      },
      {
        cgbl: 51,
        nsrmc: '佛山市南海区万意恒利置业有限公司',
      },
      {
        cgbl: 50,
        nsrmc: 'XXX投资管理有限公司',
      },
      {
        cgbl: 8.42,
        nsrmc: '恒大地产股份有限公司',
      },
      {
        cgbl: 90,
        nsrmc: 'XXX司',
      },
      {
        cgbl: 0,
        nsrmc: 'XXXX造有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX基金管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW（YY）企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '郑州QQWW企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW中西部投资发展有限公司',
      },
      {
        cgbl: 0,
        nsrmc: 'XXX股份有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 20,
        nsrmc: 'TTT基金管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '中山QQWW企业有限公司',
      },
      {
        cgbl: 30,
        nsrmc: 'XXXX合置地有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '徐州QQWW企业有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '贵阳QQWW房地产有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '哈尔滨QQWW企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX培训有限公司',
      },
      {
        cgbl: 28,
        nsrmc: 'XXXX施投资基金管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '无锡QQWW企业有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'XXX置业有限公司',
      },
      {
        cgbl: 65,
        nsrmc: '大连QQWW锦绣花城开发有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX技术研究有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 0,
        nsrmc: 'XXXX咨询有限公司',
      },
      {
        cgbl: 90,
        nsrmc: 'QQWW(XXX)企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '济南QQWW企业有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '万翼科技有限公司',
      },
      {
        cgbl: 65,
        nsrmc: 'XXX置业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX城市建设发展有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX色科技有限公司',
      },
      {
        cgbl: 95,
        nsrmc: '沈阳QQWW企业有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 10,
        nsrmc: 'XXX有限公司',
      },
      {
        nsrmc: 'XXX有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX管理有限公司',
      },
      {
        cgbl: 95,
        nsrmc: 'QQWW(新疆)企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '南宁市QQWW投资有限公司',
      },
      {
        cgbl: 95,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 95,
        nsrmc: 'XXXX顾问有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '海南QQWW企业管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'XEXE企业管理咨询有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX管理有限公司',
      },
      {
        cgbl: 30.8,
        nsrmc: '666纵横资产管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW建筑技术发展(XXXX',
      },
      {
        nsrmc: '安徽QQWW企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX服装公司',
      },
      {
        cgbl: 30,
        nsrmc: 'XXX服务有限公司',
      },
      {
        cgbl: 50,
        nsrmc: '江西QQWW益达置业投资有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '莆田市QQWW投资有限公司',
      },
      {
        cgbl: 95,
        nsrmc: 'XXXXX发有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX推广传播有限公司',
      },
      {
        cgbl: 80,
        nsrmc: '莆田市QQWW置业有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '东莞市QQWW建筑技术研究有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 95,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 51,
        nsrmc: '佛山市南海区QQWW乐恒置业有限公司',
      },
      {
        cgbl: 49,
        nsrmc: 'XXXX资发展有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW企业股份有限公司北海公司',
      },
      {
        cgbl: 75,
        nsrmc: '天津QQWW新湖置业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX限公司',
      },
      {
        cgbl: 80,
        nsrmc: '青岛QQWW银盛泰房地产有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '太原QQWW房地产有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 0,
        nsrmc: 'XXXX限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX易商场',
      },
      {
        cgbl: 100,
        nsrmc: '广西QQWW企业管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX份有限公司格兰玛美容店',
      },
      {
        cgbl: 100,
        nsrmc: '江苏QQWW企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '雄安QQWW企业投资有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX份有限公司格兰玛西餐厅',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '芜湖QQWW房地产有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '666展有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX份有限公司格兰玛便利店',
      },
      {
        cgbl: 100,
        nsrmc: '福州市QQWW发展有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'XXX地产有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 6.6667,
        nsrmc: '沈阳万方实业股份有限公司',
      },
      {
        cgbl: 95,
        nsrmc: 'XXXX地产有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'YY四季流辉置业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '佛山市顺德区陈村QQWW置业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW中西部企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '厦门市QQWW企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QWER企业有限公司',
      },
      {
        cgbl: 4.58,
        nsrmc: 'XXX投资管理股份有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '宁波QQWW企业有限公司',
      },
      {
        cgbl: 95,
        nsrmc: 'XXXX有限公司',
      },
      {
        nsrmc: 'XXX司',
      },
      {
        cgbl: 100,
        nsrmc: '南京QQWW企业有限公司',
      },
      {
        cgbl: 80,
        nsrmc: '杭州QQWW亚运村开发有限公司',
      },
      {
        nsrmc: 'QQWW企业集团（简称：QQWW集团）',
      },
      {
        nsrmc: 'XXXX限公司',
      },
      {
        cgbl: 100,
        nsrmc: '兰州QQWW企业有限公司',
      },
      {
        cgbl: 60,
        nsrmc: 'QQWW物业发展股份有限公司',
      },
      {
        nsrmc: 'XXXX业投资中心(有限合伙)',
      },
      {
        cgbl: 90,
        nsrmc: 'XXXX商务有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '烟台QQWW企业有限公司',
      },
      {
        cgbl: 50,
        nsrmc: 'YY两江QQWW投资有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW北方区域企业管理有限公司',
      },
      {
        cgbl: 30,
        nsrmc: 'XXX滑雪有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX管理服务有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW企业股份有限公司海南公司',
      },
      {
        cgbl: 30,
        nsrmc: 'XXX滑雪有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX份有限公司维修部',
      },
      {
        cgbl: 0,
        nsrmc: 'XXXX料有限公司[特控:93-未检]',
      },
      {
        cgbl: 100,
        nsrmc: 'XX资本有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '福州市万榕房地产开发有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX房地产有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '浙江浙南QQWW房地产有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'XEXE企业管理咨询有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW(张家口)旅游开发有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW物流发展有限公司',
      },
      {
        nsrmc: '中小企业发展基金(XXXX伙)',
      },
      {
        cgbl: 60,
        nsrmc: '无锡QQWW房地产有限公司',
      },
      {
        cgbl: 60,
        nsrmc: 'XXXQQWW梦想城建设发展有限公司',
      },
      {
        cgbl: 8.65,
        nsrmc: 'XXX中心(有限合伙)',
      },
      {
        cgbl: 60,
        nsrmc: 'XXXX筑技术有限公司',
      },
      {
        cgbl: 50,
        nsrmc: '江西QQWW青山湖房地产发展有限公司',
      },
      {
        cgbl: 15,
        nsrmc: '广东中建新型建筑构件有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX场',
      },
      {
        cgbl: 51,
        nsrmc: 'XEXE企业管理咨询有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW中西部企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX份有限公司格兰玛美容店',
      },
      {
        cgbl: 95,
        nsrmc: 'XXXX顾问有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER理有限公司',
      },
      {
        cgbl: 95,
        nsrmc: 'XXXX有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'YY四季流辉置业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '中山QQWW企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XX资本有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '福州市万榕房地产开发有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '青岛QQWW房地产有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '芜湖QQWW房地产有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '南京QQWW企业有限公司',
      },
      {
        cgbl: 90,
        nsrmc: 'XXX司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW北方区域企业管理有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '太原QQWW房地产有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX城市建设发展有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '哈尔滨QQWW企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX服装公司',
      },
      {
        cgbl: 100,
        nsrmc: '雄安QQWW企业投资有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX房地产有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX色科技有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QWER企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '东莞市QQWW建筑技术研究有限公司',
      },
      {
        cgbl: 80,
        nsrmc: '杭州QQWW亚运村开发有限公司',
      },
      {
        nsrmc: 'XXX司',
      },
      {
        cgbl: 100,
        nsrmc: '浙江浙南QQWW房地产有限公司',
      },
      {
        cgbl: 95,
        nsrmc: 'QQWW(新疆)企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '烟台QQWW企业有限公司',
      },
      {
        cgbl: 0,
        nsrmc: 'XXXX限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        nsrmc: 'XXXX业投资中心(有限合伙)',
      },
      {
        cgbl: 100,
        nsrmc: '广西QQWW企业管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '厦门市QQWW企业有限公司',
      },
      {
        cgbl: 20,
        nsrmc: 'TTT基金管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '无锡QQWW企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX管理有限公司',
      },
      {
        cgbl: 90,
        nsrmc: 'XXXX商务有限公司',
      },
      {
        cgbl: 50,
        nsrmc: '江西QQWW益达置业投资有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '大连QQWW置业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '佛山市顺德区陈村QQWW置业有限公司',
      },
      {
        cgbl: 0,
        nsrmc: 'XXXX造有限公司',
      },
      {
        cgbl: 80,
        nsrmc: '莆田市QQWW置业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW(张家口)旅游开发有限公司',
      },
      {
        cgbl: 51,
        nsrmc: '佛山市南海区万意恒利置业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX易商场',
      },
      {
        cgbl: 4.58,
        nsrmc: 'XXX投资管理股份有限公司',
      },
      {
        cgbl: 51,
        nsrmc: '佛山市南海区QQWW乐恒置业有限公司',
      },
      {
        cgbl: 95,
        nsrmc: 'XXXX地产有限公司',
      },
      {
        cgbl: 60,
        nsrmc: 'QQWW物业发展股份有限公司',
      },
      {
        cgbl: 50,
        nsrmc: '江西QQWW青山湖房地产发展有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '徐州QQWW企业有限公司',
      },
      {
        cgbl: 30,
        nsrmc: 'XXX滑雪有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'XXX置业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXX技术研究有限公司',
      },
      {
        cgbl: 95,
        nsrmc: '沈阳QQWW企业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QWERW企业有限公司',
      },
      {
        cgbl: 30,
        nsrmc: 'XXX服务有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'QWER管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '南宁市QQWW投资有限公司',
      },
      {
        cgbl: 0,
        nsrmc: 'XXXX料有限公司[特控:93-未检]',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX份有限公司格兰玛便利店',
      },
      {
        cgbl: 95,
        nsrmc: 'XXXX有限公司',
      },
      {
        nsrmc: 'XXXX限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX管理服务有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'XEXE企业管理咨询有限公司',
      },
      {
        cgbl: 30,
        nsrmc: 'XXXX合置地有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '666展有限公司',
      },
      {
        cgbl: 51,
        nsrmc: 'XEXE企业管理咨询有限公司',
      },
      {
        cgbl: 49,
        nsrmc: 'XXXX资发展有限公司',
      },
      {
        cgbl: 60,
        nsrmc: 'XXXQQWW梦想城建设发展有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW企业股份有限公司海南公司',
      },
      {
        cgbl: 100,
        nsrmc: 'QQWW中西部投资发展有限公司',
      },
      {
        cgbl: 60,
        nsrmc: '无锡QQWW房地产有限公司',
      },
      {
        cgbl: 8.42,
        nsrmc: '恒大地产股份有限公司',
      },
      {
        cgbl: 65,
        nsrmc: 'XXX置业有限公司',
      },
      {
        cgbl: 100,
        nsrmc: 'XXXX培训有限公司',
      },
      {
        cgbl: 90,
        nsrmc: 'QQWW(XXX)企业有限公司',
      },
      {
        cgbl: 28,
        nsrmc: 'XXXX施投资基金管理有限公司',
      },
      {
        cgbl: 100,
        nsrmc: '江苏QQWW企业有限公司',
      },
      {
        cgbl: 75,
        nsrmc: '天津QQWW新湖置业有限公司',
      },
      {
        nsrmc: '中小企业发展基金（XXXX伙）',
      },
    ],
  },
};

export default mockData;
