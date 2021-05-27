export default [
  {
    pagename: '首页',
    componentname: "rghxmangehome",
    path: "home",
    icon: "el-icon-pie-chart",
  },
  {
    pagename: '客户资料',
    icon: "el-icon-user",
    Child: [
      {
        pagename: '店铺资料',
        path: "shop/shop",
      },
      {
        pagename: '店铺指标',
        path: "shop/shoptarget",
      },
      {
        pagename: '店铺折扣',
        path: "shop/shopdiscount",
      },
      {
        pagename: '总代指标',
        path: "shop/agenttarget",
      },
      {
        pagename: '总代折扣',
        path: "shop/agentdiscount",
      },
      {
        pagename: '订货指引',
        path: "shop/orderguide",
      },
      {
        pagename: '订金管理',
        path: "shop/orderdeposit",
      },
    ],
  },
  {
    pagename: '货品资料',
    icon: "el-icon-goods",
    Child: [
      {
        pagename: '商品资料',
        path: "product/product",
      },
      {
        pagename: '尺码配置',
        path: "product/sizeConfigure",
      },
      {
        pagename: '商品属性',
        path: "product/prodData",
      },
      {
        pagename: '搭配资料',
        path: "product/prodShow",
      },
      {
        pagename: '陈列资料',
        path: "product/prodDisplay",
      },
      {
        pagename: '推演资料',
        path: "product/prodGuess",
      },
      {
        pagename: '配码资料',
        path: "product/prodMatch",
      },
      {
        pagename: '库存资料',
        path: "product/prodInventory",
      },
      {
        pagename: '预设订单',
        path: "product/prodPreorder",
      },
    ],
  },
  {
    pagename: '场控管理',
    icon: "el-icon-more-outline",
    Child: [
      {
        pagename: '会务管理',
        path: "meeting/conference",
      },
      {
        pagename: '会场通知',
        path: "meeting/msg",
      },
      {
        pagename: '参会指南',
        path: "meeting/book",
      },
      {
        pagename: '截屏解封',
        path: "meeting/screenshot",
      },
      {
        pagename: '调查管理',
        path: "meeting/survey",
      },
      {
        pagename: '调查分析',
        path: "meeting/surveyAnalyse",
      },
      {
        pagename: '行为分析',
        path: "meeting/behavior",
      },
      {
        pagename: '推演中心',
        path: "meeting/infer",
      },
      {
        pagename: '跟随投影',
        path: "meeting/followShadow",
      },
    ],
  },
   {
    pagename: '直播管理',
    icon: "el-icon-video-play",
    Child: [
      {
        pagename: '直播管理',
        path: "live/live",
      },
      {
        pagename: '直播推送',
        path: "live/pushProd",
      },
      {
        pagename: '直播投影',
        path: "live/liveShadow",
      },
      {
        pagename: '在线店铺',
        path: "live/onlineShop",
      },
    ],
  },
  {
    pagename: '订货分析',
    icon: "el-icon-tickets",
    Child: [
      {
        pagename: '报表中心',
        path: "analysis/reportCenter",
      },
      {
        pagename: '结构分析',
        path: "analysis/structAnalysis",
      },
      {
        pagename: '订单透视',
        path: "analysis/perspectivity",
      },
      {
        pagename: '货品排行',
        path: "analysis/rankProduct",
      },
      {
        pagename: '客户排行',
        path: "analysis/rankClient",
      },
      {
        pagename: '组合排行',
        path: "analysis/rankGuess",
      },
      {
        pagename: '货品建议',
        path: "analysis/prodChat",
      },
      {
        pagename: '店铺取消款',
        path: "analysis/shopCancelProd",
      },
      {
        pagename: '同期数据对比',
        path: "analysis/history",
      },
    ]
  },
  {
    pagename: '订货进度',
    icon: "el-icon-time",
    Child: [
      {
        pagename: '交单统计',
        path: "progress/submit",
      },
      {
        pagename: '店铺指标完成率',
        path: "progress/shoprate",
      },
      {
        pagename: '总代指标完成率',
        path: "progress/agentrate",
      },
    ]
  },
  {
    pagename: '订单中心',
    icon: "el-icon-takeaway-box",
    Child: [
      {
        pagename: '订单管理',
        path: "order/manage",
      },
      {
        pagename: '改单神器',
        path: "order/update",
      },
      {
        pagename: '订单回收站',
        path: "order/recycle",
      },
      {
        pagename: 'ERP订单导出',
        path: "order/erpExport",
      },
    ]
  },
  {
    pagename: '系统设置',
    icon: "el-icon-setting",
    Child: [
      {
        pagename: '系统配置',
        path: "system/setting",
      },
      {
        pagename: '权限管理',
        path: "system/auth",
      },
      {
        pagename: '系统日志',
        path: "system/log",
      },
      {
        pagename: '菜单日志',
        path: "system/memuLog",
      },
    ]
  },
]