// 精细化工安全环保法规标准数据库
const regulationDB = {
  version: "1.0.0",
  lastUpdate: "2026-03-04",
  standards: [
    {
      id: "GB-45673-2025",
      code: "GB 45673-2025",
      name: "危险化学品企业安全生产标准化通用规范",
      category: "安全",
      subcategory: "综合",
      type: "强制性国标",
      effectiveDate: "2025-11-01",
      status: "即将实施",
      keywords: ["安全生产标准化", "设备完整性", "全流程自动化", "重大危险源", "特殊作业"],
      summary: "整合7项行业标准，新增设备完整性管理、信息化智能化建设要求",
      keyPoints: [
        "高危工艺（硝化/氯化/氟化/重氮化/过氧化）全流程自动化改造",
        "设备完整性全生命周期管理（采购-分级-检测-维护-报废）",
        "2024年底前重大危险源企业建成特殊作业许可与人员定位系统",
        "建立设备完整性数据库，打破信息孤岛"
      ],
      checkItems: [
        { item: "高危工艺全流程自动化改造评估", required: true, deadline: "2024-2026" },
        { item: "设备完整性数据库建立", required: true, deadline: "2025-11-01" },
        { item: "特殊作业许可系统建设", required: true, deadline: "2024-12-31" },
        { item: "人员定位系统（含聚集风险预警）", required: true, deadline: "2024-12-31" },
        { item: "重大危险源三类包保责任人明确", required: true, deadline: "持续" }
      ],
      relatedFiles: ["安委〔2024〕2号", "应急〔2024〕49号"],
      url: ""
    },
    {
      id: "GB-T-42300-2022",
      code: "GB/T 42300-2022",
      name: "精细化工反应安全风险评估规范",
      category: "安全",
      subcategory: "工艺",
      type: "推荐性国标",
      effectiveDate: "已实施",
      status: "现行有效",
      keywords: ["反应安全风险评估", "工艺危险度", "绝热温升", "TMRad", "HAZOP"],
      summary: "将原指导意见上升为国家标准，建立量化的反应工艺危险度等级评估体系（1-5级）",
      keyPoints: [
        "四个温度参数：Tp（工艺温度）、MTSR（失控最高温度）、MTT（技术最高温度）、TD24",
        "危险度分级：1级（常规控制）→5级（爆炸风险高，需工艺改变）",
        "严重度评估：绝热温升ΔTad（50K/200K/400K为界）",
        "可能性评估：TMRad最大反应速率到达时间（24h/8h/1h为界）"
      ],
      checkItems: [
        { item: "高危工艺全流程反应安全风险评估报告", required: true, deadline: "新工艺/变更时" },
        { item: "热力学和动力学测试数据", required: true, deadline: "评估时" },
        { item: "工艺危险度3级及以上替代方案", required: true, deadline: "评估后" },
        { item: "化学品相容性矩阵建立", required: true, deadline: "持续" }
      ],
      dangerLevels: [
        { level: 1, condition: "Tp < MTSR < MTT < TD24", desc: "危险性较低", control: "常规DCS/PLC" },
        { level: 2, condition: "Tp < MTSR < TD24 < MTT", desc: "潜在分解风险", control: "报警联锁+泄放+SIS" },
        { level: 3, condition: "Tp ≤ MTT < MTSR < TD24", desc: "冲料和分解风险", control: "紧急冷却+微通道/管式替代" },
        { level: 4, condition: "Tp ≤ MTT < TD24 < MTSR", desc: "冲料分解风险高", control: "工艺优化+隔离措施" },
        { level: 5, condition: "Tp < TD24 < MTSR < MTT", desc: "爆炸风险高", control: "工艺路线改变+区域隔离" }
      ],
      url: ""
    },
    {
      id: "AQ-3062-2025",
      code: "AQ 3062-2025",
      name: "精细化工企业安全管理规范",
      category: "安全",
      subcategory: "管理",
      type: "行业标准",
      effectiveDate: "即将实施",
      status: "待实施",
      keywords: ["安全管理", "本质安全", "微通道反应器", "HAZOP", "高危工艺"],
      summary: "明确高危工艺全流程反应安全风险评估要求，危险度3级及以上优先采用微通道/管式反应器",
      keyPoints: [
        "本质安全四原则：最小化、替代、缓和、简化",
        "优先选用连续化生产技术（微通道、管式、环流反应）",
        "高危工艺必须完成全流程评估（原料预处理→分离精制）",
        "建设项目基础工程设计阶段必须开展HAZOP+LOPA分析"
      ],
      checkItems: [
        { item: "建设项目工艺技术来源明确", required: true, deadline: "设计阶段" },
        { item: "HAZOP分析报告", required: true, deadline: "基础设计阶段" },
        { item: "LOPA保护层分析", required: true, deadline: "基础设计阶段" },
        { item: "微通道/管式反应器替代方案（3级及以上）", required: false, deadline: "具备条件时" }
      ],
      url: ""
    },
    {
      id: "GB-51283-2020",
      code: "GB 51283-2020",
      name: "精细化工企业工程设计防火标准",
      category: "安全",
      subcategory: "设计",
      type: "强制性国标",
      effectiveDate: "已实施",
      status: "现行有效",
      keywords: ["防火间距", "车间储罐", "厂房布置", "消防设计", "防爆"],
      summary: "规定精细化工企业总平面布置、生产设施防火间距、厂房设计等要求",
      keyPoints: [
        "与居住区防火间距：90-140m",
        "车间储罐储量≤1天需求量，可燃气体≤1000m³，液化烃≤100m³",
        "甲/乙类厂房不得设置办公室/休息室（确需贴邻用3h防爆墙）",
        "变配电所不应在甲/乙类厂房内或贴邻"
      ],
      checkItems: [
        { item: "总平面布置防火间距复核", required: true, deadline: "新建/变更时" },
        { item: "车间储罐储量合规性", required: true, deadline: "持续" },
        { item: "甲/乙类厂房办公区设置合规", required: true, deadline: "持续" },
        { item: "变配电所位置合规", required: true, deadline: "新建时" }
      ],
      url: ""
    },
    {
      id: "GB-17681-2024",
      code: "GB 17681-2024",
      name: "危险化学品重大危险源安全监控技术规范",
      category: "安全",
      subcategory: "监控",
      type: "强制性国标",
      effectiveDate: "已实施",
      status: "现行有效",
      keywords: ["重大危险源", "SIS", "安全仪表系统", "HAZOP", "监控"],
      summary: "涉及两重点一重大的装置应开展HAZOP分析，设置SIS安全仪表系统",
      keyPoints: [
        "重大危险源必须开展HAZOP分析",
        "必须设置SIS安全仪表系统",
        "监控数据接入应急管理部门平台"
      ],
      checkItems: [
        { item: "重大危险源HAZOP分析", required: true, deadline: "3年/变更时" },
        { item: "SIS安全仪表系统设置", required: true, deadline: "持续" },
        { item: "监控数据平台接入", required: true, deadline: "持续" },
        { item: "重大危险源备案", required: true, deadline: "年度" }
      ],
      url: ""
    },
    {
      id: "GB-37823-2019",
      code: "GB 37823-2019",
      name: "制药工业大气污染物排放标准",
      category: "环保",
      subcategory: "大气",
      type: "强制性国标",
      effectiveDate: "已实施",
      status: "现行有效",
      keywords: ["VOCs", "大气排放", "NMHC", "TVOC", "恶臭"],
      summary: "医药中间体参照执行，规定有组织排放和无组织排放限值",
      keyPoints: [
        "NMHC有组织排放≤60mg/m³（特别排放≤50mg/m³）",
        "TVOC≤100mg/m³",
        "厂界NMHC≤6mg/m³（1h平均）",
        "废气分类收集、分质处理，含药物成分废气净化处理"
      ],
      checkItems: [
        { item: "排气筒污染物达标监测", required: true, deadline: "季度" },
        { item: "厂区内VOCs无组织排放监测", required: true, deadline: "季度" },
        { item: "VOCs治理设施运行台账", required: true, deadline: "每日" },
        { item: "LDAR泄漏检测与修复", required: true, deadline: "按频次" }
      ],
      limits: {
        organized: { NMHC: 60, TVOC: 100, benzene: 2, toluene: 15 },
        unorganized: { NMHC_1h: 6, NMHC_any: 20 },
        special: { NMHC: 50, TVOC: 80 }
      },
      url: ""
    },
    {
      id: "GB-37822-2019",
      code: "GB 37822-2019",
      name: "挥发性有机物无组织排放控制标准",
      category: "环保",
      subcategory: "大气",
      type: "强制性国标",
      effectiveDate: "已实施",
      status: "现行有效",
      keywords: ["VOCs无组织排放", "LDAR", "储罐", "泄漏检测", "密闭收集"],
      summary: "规定VOCs物料储存、转移、工艺过程、敞开液面无组织排放控制要求",
      keyPoints: [
        "储罐应采用压力罐、内浮顶罐或固定顶罐+密闭收集",
        "物料转移采用密闭管道或底部装载+气相平衡",
        "泵、阀门、法兰等密封点开展LDAR检测",
        "废水集输系统应密闭"
      ],
      checkItems: [
        { item: "储罐类型合规性检查", required: true, deadline: "年度" },
        { item: "LDAR制度建立与实施", required: true, deadline: "按频次" },
        { item: "物料转移密闭性检查", required: true, deadline: "月度" },
        { item: "废水处理设施废气收集", required: true, deadline: "持续" }
      ],
      url: ""
    },
    {
      id: "GB-18597-2023",
      code: "GB 18597-2023",
      name: "危险废物贮存污染控制标准",
      category: "环保",
      subcategory: "固废",
      type: "强制性国标",
      effectiveDate: "已实施",
      status: "现行有效",
      keywords: ["危废", "贮存", "防渗", "视频监控", "台账"],
      summary: "规定危废贮存设施选址、污染控制、运行管理要求",
      keyPoints: [
        "地面防渗：渗透系数≤1×10⁻¹⁰cm/s或2mm厚HDPE膜",
        "24小时视频监控",
        "电子管理台账",
        "危废分类分区贮存，不相容危废分开存放",
        "贮存期限≤1年"
      ],
      checkItems: [
        { item: "危废库防渗合规性", required: true, deadline: "年度" },
        { item: "24小时视频监控运行", required: true, deadline: "持续" },
        { item: "电子管理台账", required: true, deadline: "每次出入库" },
        { item: "危废标识标签规范", required: true, deadline: "持续" },
        { item: "超期危废清理", required: true, deadline: "月度" },
        { item: "危废转移处置记录", required: true, deadline: "每次转移" }
      ],
      url: ""
    }
  ],
  
  policies: [
    {
      id: "ANWEI-2024-2",
      code: "安委〔2024〕2号",
      name: "化工和危险化学品安全生产治本攻坚三年行动方案（2024-2026年）",
      publishDate: "2024年",
      keyPoints: [
        "2024年底前：硝化工艺率先完成全流程自动化改造",
        "2026年底前：重氮化、过氧化、氟化、氯化工艺完成改造",
        "持续推动：反应安全风险评估工艺危险度3级及以上企业应用微通道、管式反应器",
        "20年以上老旧装置安全风险评估"
      ],
      milestones: [
        { date: "2024-12-31", task: "硝化工艺完成改造", status: "应已完成" },
        { date: "2026-12-31", task: "氯化/氟化/重氮化/过氧化完成改造", status: "进行中" }
      ]
    },
    {
      id: "YINGJI-2024-49",
      code: "应急〔2024〕49号",
      name: "化工老旧装置淘汰退出和更新改造工作方案",
      publishDate: "2024年",
      keyPoints: [
        "建成20年以上的化工装置开展安全风险评估",
        "涉及两重点一重大的优先评估",
        "分类处置：淘汰退出、更新改造、严格管控"
      ]
    }
  ],
  
  checklists: [
    {
      id: "daily-safety",
      name: "日常安全检查清单",
      items: [
        { id: "ds-1", standard: "GB 45673-2025", item: "高危工艺自动化运行状态", method: "现场检查", frequency: "每日" },
        { id: "ds-2", standard: "GB 45673-2025", item: "设备完整性数据库数据录入", method: "系统检查", frequency: "每日" },
        { id: "ds-3", standard: "GB 18597-2023", item: "危废库视频监控运行", method: "查看录像", frequency: "每日" },
        { id: "ds-4", standard: "GB 37823-2019", item: "VOCs治理设施运行参数", method: "台账核对", frequency: "每日" }
      ]
    },
    {
      id: "monthly-safety",
      name: "月度安全检查清单",
      items: [
        { id: "ms-1", standard: "GB 18597-2023", item: "危废管理台账完整性", method: "台账审查", frequency: "月度" },
        { id: "ms-2", standard: "GB 18597-2023", item: "超期贮存危废清理", method: "现场检查", frequency: "月度" },
        { id: "ms-3", standard: "GB 37822-2019", item: "LDAR检测进度", method: "记录核对", frequency: "月度" },
        { id: "ms-4", standard: "GB 51283-2020", item: "车间储罐储量合规性", method: "现场检查", frequency: "月度" }
      ]
    },
    {
      id: "quarterly-env",
      name: "季度环保检查清单",
      items: [
        { id: "qe-1", standard: "GB 37823-2019", item: "排气筒污染物达标排放", method: "监测报告", frequency: "季度" },
        { id: "qe-2", standard: "GB 37822-2019", item: "厂区内VOCs无组织排放", method: "监测报告", frequency: "季度" },
        { id: "qe-3", standard: "GB 37823-2019", item: "储罐呼吸阀检测", method: "检测记录", frequency: "季度" }
      ]
    },
    {
      id: "annual-safety",
      name: "年度安全检查清单",
      items: [
        { id: "as-1", standard: "GB/T 42300-2022", item: "反应安全风险评估复核", method: "报告审查", frequency: "年度/变更" },
        { id: "as-2", standard: "GB 17681-2024", item: "HAZOP分析更新", method: "报告审查", frequency: "3年/变更" },
        { id: "as-3", standard: "GB 17681-2024", item: "重大危险源备案", method: "备案回执", frequency: "年度" },
        { id: "as-4", standard: "GB 17681-2024", item: "SIS系统维护测试", method: "维护记录", frequency: "年度" },
        { id: "as-5", standard: "GB 51283-2020", item: "防火间距合规性复核", method: "图纸核对", frequency: "变更时" }
      ]
    }
  ]
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = regulationDB;
}
