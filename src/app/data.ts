import type {
  CandidateProfile,
  CareerRole,
  JdInsight,
  JobRole,
  MatchResult,
  ProfilePreset,
  QuizQuestion,
  ResumeAudit,
  RewritePack,
} from './types'

export const workflowSteps = [
  { id: 'landing', label: '选择入口', detail: '上传简历或完成职业画像测评', to: '/' },
  { id: 'profile', label: '生成画像', detail: '提取优势、兴趣、目标方向和风险点', to: '/intake/quiz' },
  { id: 'results', label: '匹配岗位', detail: '按冲刺、主投、保底形成投递清单', to: '/results' },
  { id: 'resume', label: '优化简历', detail: '对齐 JD 关键词并输出行动计划', to: '/resume-lab' },
]

export const productModules = [
  {
    code: 'M01',
    title: '学生画像采集',
    detail: '用简历上传、文本粘贴和职业测评完成基础信息采集。',
  },
  {
    code: 'M02',
    title: '岗位目录与详情',
    detail: '像产品目录一样管理岗位卡片、JD 详情、关键词和申请策略。',
  },
  {
    code: 'M03',
    title: '匹配看板',
    detail: '将岗位分成冲刺、主投、保底，降低海投焦虑。',
  },
  {
    code: 'M04',
    title: '简历实验室',
    detail: '输出 ATS 命中率、改写示例、关键词缺口和本周行动。',
  },
]

export const presets: ProfilePreset[] = [
  {
    id: 'pm',
    label: '产品探索型',
    subtitle: '擅长拆问题、做调研、推动跨团队落地',
    profile: {
      name: '林可',
      grade: '大四 / 2026 届',
      major: '信息管理与信息系统',
      targetCity: '深圳',
      targetRole: 'AI 产品',
      strengths: ['数据分析', '结构化表达', '跨团队协作', '用户研究'],
      interests: ['产品经理', '商业分析', 'AI 应用'],
      experienceTags: ['校园产品项目', '数据可视化作品', '社团运营', '实习经历'],
      resumeSignals: ['有量化成果', '项目职责清晰', '关键词覆盖中等', '教育经历完整'],
      summary:
        '你更适合以 AI 产品 / 数据产品为主线，重点展示需求拆解、用户研究、分析判断和推进落地能力。',
    },
  },
  {
    id: 'data',
    label: '数据洞察型',
    subtitle: '适合商业分析、策略分析、数据产品等方向',
    profile: {
      name: '周行',
      grade: '研一 / 2027 届',
      major: '应用统计',
      targetCity: '深圳',
      targetRole: '商业分析',
      strengths: ['SQL', '数据分析', '业务洞察', '报告撰写'],
      interests: ['商业分析', '数据产品', '策略运营'],
      experienceTags: ['商业分析实习', '竞赛获奖', '数据可视化作品'],
      resumeSignals: ['量化结果较强', '经历相关度高', '项目表达偏学术'],
      summary:
        '你更适合以商业分析和策略支持为主线，突出 SQL、指标体系、业务洞察和报告输出能力。',
    },
  },
  {
    id: 'growth',
    label: '增长运营型',
    subtitle: '适合增长产品、内容策略、用户运营等方向',
    profile: {
      name: '沈宁',
      grade: '大三 / 2027 届',
      major: '新闻传播学',
      targetCity: '广州',
      targetRole: '增长产品',
      strengths: ['用户运营', '活动策划', '内容洞察', '跨团队协作'],
      interests: ['增长产品', '内容平台', '用户运营'],
      experienceTags: ['社团运营', '新媒体实习', '校园产品项目'],
      resumeSignals: ['执行经历丰富', '量化成果偏少', '岗位关键词覆盖一般'],
      summary:
        '你更适合以增长产品和内容平台为主线，突出用户洞察、活动策划、内容判断和执行推进能力。',
    },
  },
]

export const jobs: JobRole[] = [
  {
    id: 'job-01',
    title: 'AI 产品培训生',
    company: '星潮科技',
    city: '深圳',
    type: '校招全职',
    salary: '18K-25K x 14',
    tags: ['AI 产品', '校招', '增长方向'],
    strengthsWanted: ['结构化表达', '跨团队协作', '用户研究'],
    interestsWanted: ['产品经理', 'AI 应用'],
    experienceWanted: ['校园产品项目', '实习经历'],
    jdKeywords: ['PRD', '需求分析', '用户访谈', 'AI Agent', '竞品研究'],
    challenge: '需要更强的 AI 产品案例表达，最好补充一个 Agent 或 AIGC 工具拆解项目。',
  },
  {
    id: 'job-02',
    title: '商业分析实习生',
    company: '云帆互娱',
    city: '深圳',
    type: '日常实习',
    salary: '220/天',
    tags: ['商业分析', '策略', '数据驱动'],
    strengthsWanted: ['数据分析', '结构化表达', 'SQL'],
    interestsWanted: ['商业分析', '策略运营'],
    experienceWanted: ['数据可视化作品', '实习经历', '商业分析实习'],
    jdKeywords: ['SQL', 'Excel', '数据洞察', '策略支持', '报告撰写'],
    challenge: '需要把分析过程和业务结论写得更像真实业务场景，而不是课程作业。',
  },
  {
    id: 'job-03',
    title: '用户增长产品助理',
    company: '青屿内容',
    city: '广州',
    type: '校招全职',
    salary: '15K-20K x 13',
    tags: ['增长产品', '内容平台', '用户运营'],
    strengthsWanted: ['用户研究', '跨团队协作', '活动策划'],
    interestsWanted: ['增长产品', '产品经理'],
    experienceWanted: ['校园产品项目', '社团运营', '新媒体实习'],
    jdKeywords: ['A/B Test', '拉新', '留存', '用户分层', '活动策划'],
    challenge: '如果目标城市不是广州，需要证明你接受异地发展，并补强增长实验案例。',
  },
  {
    id: 'job-04',
    title: 'HR 数据产品专员',
    company: '启明组织科技',
    city: '深圳',
    type: '校招全职',
    salary: '16K-22K x 14',
    tags: ['HR Tech', '数据产品', '组织效能'],
    strengthsWanted: ['数据分析', '结构化表达', '跨团队协作'],
    interestsWanted: ['产品经理', '商业分析', '数据产品'],
    experienceWanted: ['数据可视化作品', '校园产品项目'],
    jdKeywords: ['指标体系', 'BI', '业务访谈', '需求拆解', '仪表盘'],
    challenge: '匹配度不错，但需要补一段“为什么关注 HR 场景”的动机说明。',
  },
  {
    id: 'job-05',
    title: '内容策略运营培训生',
    company: '流光社区',
    city: '上海',
    type: '校招全职',
    salary: '14K-18K x 14',
    tags: ['内容策略', '运营', '用户增长'],
    strengthsWanted: ['内容洞察', '活动策划', '跨团队协作'],
    interestsWanted: ['用户运营', '策略运营', '内容平台'],
    experienceWanted: ['社团运营', '新媒体实习'],
    jdKeywords: ['内容策划', '选题', '增长转化', '用户分层', '社区氛围'],
    challenge: '需要补更多面向内容和社区运营的案例证据，并把结果量化。',
  },
  {
    id: 'job-06',
    title: '前端开发工程师',
    company: '棱镜云',
    city: '深圳',
    type: '校招全职',
    salary: '20K-30K x 14',
    tags: ['技术岗', '前端开发', '工程能力'],
    strengthsWanted: ['代码实现', '系统学习', '工程协作'],
    interestsWanted: ['技术研发', '前端开发'],
    experienceWanted: ['开源项目', '课程项目', '实习经历'],
    jdKeywords: ['React', 'TypeScript', '组件化', '性能优化', '工程化'],
    challenge: '需要把项目写成技术方案，而不是只写页面功能，最好补充性能、工程化或协作细节。',
  },
  {
    id: 'job-07',
    title: 'HR 校园招聘专员',
    company: '星河互娱',
    city: '广州',
    type: '校招全职',
    salary: '12K-18K x 14',
    tags: ['HR职能', '校园招聘', '沟通协调'],
    strengthsWanted: ['沟通表达', '活动组织', '同理心'],
    interestsWanted: ['人力资源', '校园招聘'],
    experienceWanted: ['社团运营', '校园活动', '实习经历'],
    jdKeywords: ['招聘流程', '候选人沟通', '宣讲会', '数据复盘', '雇主品牌'],
    challenge: '需要突出你如何与人建立信任，以及如何把活动组织、候选人沟通和数据复盘串起来。',
  },
  {
    id: 'job-08',
    title: '软件测试工程师',
    company: '松塔科技',
    city: '上海',
    type: '校招全职',
    salary: '15K-22K x 14',
    tags: ['测试岗', '质量保障', '逻辑验证'],
    strengthsWanted: ['逻辑推理', '细节敏感', '风险意识'],
    interestsWanted: ['软件测试', '质量保障'],
    experienceWanted: ['课程项目', '测试用例', '实习经历'],
    jdKeywords: ['测试用例', '缺陷定位', '接口测试', '自动化测试', '回归测试'],
    challenge: '需要把“细心”转译成测试方法论：边界条件、复现路径、缺陷优先级和回归验证。',
  },
]

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'root',
    prompt: '如果把一次实习比作一场副本，你最想站在哪个位置？',
    helper: '先别想“哪个岗位更赚钱”，想想哪种工作会让你愿意反复打磨。',
    dimension: 'orientation',
    options: [
      {
        label: '技术达人',
        detail: '我享受把想法写成代码，能跑起来就很有成就感。',
        value: 'tech',
        next: 'tech-depth',
        roleScore: { 技术岗: 4 },
      },
      {
        label: '人群连接者',
        detail: '我擅长和人打交道，能把关系、节奏和气氛照顾好。',
        value: 'people',
        next: 'people-scene',
        roleScore: { HR职能: 4 },
      },
      {
        label: '产品搭桥人',
        detail: '我喜欢定义问题、排优先级，再把团队拉到同一张图上。',
        value: 'product',
        next: 'product-scope',
        roleScore: { 产品经理: 4 },
      },
      {
        label: '质量守门员',
        detail: '我会本能地找漏洞、看边界条件，不太放心“差不多”。',
        value: 'quality',
        next: 'quality-instinct',
        roleScore: { 测试岗: 4 },
      },
    ],
  },
  {
    id: 'tech-depth',
    prompt: '如果给你一个周末做项目，你会先把时间花在哪里？',
    helper: '技术岗不只是“会写代码”，还要看你更偏实现、架构还是调试。',
    dimension: 'tech',
    options: [
      {
        label: '先搭核心功能，哪怕粗糙也要先跑通',
        detail: '偏工程落地，适合前端/后端/客户端开发。',
        value: 'ship-code',
        next: 'tech-debug',
        roleScore: { 技术岗: 3, 产品经理: 1 },
      },
      {
        label: '先研究技术方案和目录结构，后面少返工',
        detail: '偏系统思维，适合工程化、平台、后端方向。',
        value: 'architecture',
        next: 'tech-debug',
        roleScore: { 技术岗: 4 },
      },
      {
        label: '先做交互原型，确认用户真的看得懂',
        detail: '技术和产品之间的桥梁型选手。',
        value: 'prototype',
        next: 'product-scope',
        roleScore: { 技术岗: 2, 产品经理: 2 },
      },
    ],
  },
  {
    id: 'tech-debug',
    prompt: '代码线上出问题了，你的第一反应更像哪一种？',
    helper: '这题用来区分开发冲刺型和质量验证型。',
    dimension: 'tech',
    options: [
      {
        label: '看报错、查日志、复现路径，一层层定位',
        detail: '你适合技术岗，也有测试岗需要的排障耐心。',
        value: 'log-first',
        next: 'workstyle',
        roleScore: { 技术岗: 3, 测试岗: 2 },
      },
      {
        label: '先确认影响范围，判断要不要回滚',
        detail: '你有上线风险意识，适合技术/测试交界场景。',
        value: 'risk-first',
        next: 'quality-instinct',
        roleScore: { 测试岗: 3, 技术岗: 2 },
      },
      {
        label: '先跟相关同学同步，让信息别乱飞',
        detail: '你也许不只适合技术，协同型职能也值得看。',
        value: 'sync-first',
        next: 'people-scene',
        roleScore: { HR职能: 2, 产品经理: 1, 技术岗: 1 },
      },
    ],
  },
  {
    id: 'people-scene',
    prompt: '一场校园宣讲会现场突然冷场，你会怎么救？',
    helper: 'HR 职能岗看重连接人、组织场、处理突发状况的能力。',
    dimension: 'people',
    options: [
      {
        label: '主动破冰，先让大家愿意开口',
        detail: '偏候选人沟通、校园招聘、员工体验。',
        value: 'warm-up',
        next: 'people-data',
        roleScore: { HR职能: 4 },
      },
      {
        label: '快速调整流程，把重点信息讲清楚',
        detail: '偏活动组织、项目推进，也有产品经理影子。',
        value: 'run-agenda',
        next: 'people-data',
        roleScore: { HR职能: 3, 产品经理: 1 },
      },
      {
        label: '记录大家的问题，结束后复盘为什么冷场',
        detail: '偏数据复盘和体验优化，适合 HR Tech / 运营型 HR。',
        value: 'collect-feedback',
        next: 'people-data',
        roleScore: { HR职能: 2, 产品经理: 1, 测试岗: 1 },
      },
    ],
  },
  {
    id: 'people-data',
    prompt: '你怎么看 HR 里的“数据”？',
    helper: '好的 HR 不只是会聊天，也要能用数据判断招聘漏斗和体验问题。',
    dimension: 'people',
    options: [
      {
        label: '很重要，沟通之后还得看转化率和候选人反馈',
        detail: '适合 HR 数据、招聘运营、雇主品牌增长。',
        value: 'hr-analytics',
        next: 'workstyle',
        roleScore: { HR职能: 3, 产品经理: 1 },
      },
      {
        label: '有帮助，但我更相信面对面的真实感受',
        detail: '适合校园招聘、员工关系、培训发展。',
        value: 'human-first',
        next: 'workstyle',
        roleScore: { HR职能: 3 },
      },
      {
        label: '我更想把流程做成系统，让问题被提前发现',
        detail: '这会把你推向 HR Tech / 产品经理方向。',
        value: 'systemize',
        next: 'product-scope',
        roleScore: { 产品经理: 2, HR职能: 2 },
      },
    ],
  },
  {
    id: 'product-scope',
    prompt: '需求池里突然塞进 20 个需求，你会先做什么？',
    helper: '产品经理的核心不是点子多，而是能把混乱变成优先级。',
    dimension: 'product',
    options: [
      {
        label: '先问目标：这轮到底要解决什么业务问题？',
        detail: '很产品经理，问题定义意识强。',
        value: 'goal-first',
        next: 'product-conflict',
        roleScore: { 产品经理: 4 },
      },
      {
        label: '先按用户影响、投入成本、风险做排序',
        detail: '逻辑缜密，适合产品经理，也适合测试管理思维。',
        value: 'priority-matrix',
        next: 'product-conflict',
        roleScore: { 产品经理: 3, 测试岗: 1 },
      },
      {
        label: '先找数据，看哪个问题真的最严重',
        detail: '偏数据产品/商业分析型产品。',
        value: 'data-product',
        next: 'product-conflict',
        roleScore: { 产品经理: 3, 技术岗: 1 },
      },
    ],
  },
  {
    id: 'product-conflict',
    prompt: '研发说做不了，业务说必须做，你会怎么推进？',
    helper: '这题看你是否能在冲突里保持清楚，而不是只会传话。',
    dimension: 'product',
    options: [
      {
        label: '拆最小可行版本，先交付核心价值',
        detail: '典型产品经理打法。',
        value: 'mvp',
        next: 'workstyle',
        roleScore: { 产品经理: 4 },
      },
      {
        label: '拉齐约束和风险，让双方对成本有共识',
        detail: '项目推进能力强，适合产品/HR 项目岗。',
        value: 'align-risk',
        next: 'workstyle',
        roleScore: { 产品经理: 3, HR职能: 1 },
      },
      {
        label: '先自己理解技术限制，再判断有没有替代方案',
        detail: '技术理解力强，适合技术产品或研发转产品。',
        value: 'learn-tech',
        next: 'tech-depth',
        roleScore: { 产品经理: 2, 技术岗: 2 },
      },
    ],
  },
  {
    id: 'quality-instinct',
    prompt: '拿到一个新功能，你最想先测哪里？',
    helper: '测试岗不是“找茬”，而是用方法证明系统可靠。',
    dimension: 'quality',
    options: [
      {
        label: '边界条件：空值、极限值、异常路径',
        detail: '测试岗信号很强，适合功能测试/自动化测试。',
        value: 'edge-case',
        next: 'quality-evidence',
        roleScore: { 测试岗: 4 },
      },
      {
        label: '主链路：用户最常走的路径能不能顺畅完成',
        detail: '兼具用户视角，适合测试/产品交界。',
        value: 'main-flow',
        next: 'quality-evidence',
        roleScore: { 测试岗: 3, 产品经理: 1 },
      },
      {
        label: '接口和数据：前后端传参是不是稳定',
        detail: '偏技术型测试或后端测试。',
        value: 'api-data',
        next: 'tech-debug',
        roleScore: { 测试岗: 3, 技术岗: 2 },
      },
    ],
  },
  {
    id: 'quality-evidence',
    prompt: '发现一个偶现 Bug，你会怎么证明它值得修？',
    helper: '这题看你是否能把“感觉不对”变成可复现证据。',
    dimension: 'quality',
    options: [
      {
        label: '记录环境、步骤、截图和日志，尽量复现',
        detail: '测试岗核心能力：证据链。',
        value: 'reproduce',
        next: 'workstyle',
        roleScore: { 测试岗: 4 },
      },
      {
        label: '评估影响范围和用户损失，给出优先级',
        detail: '质量意识 + 产品判断。',
        value: 'impact',
        next: 'workstyle',
        roleScore: { 测试岗: 3, 产品经理: 1 },
      },
      {
        label: '直接读代码或接口，找可能的根因',
        detail: '技术型测试或开发岗都适合。',
        value: 'root-cause',
        next: 'tech-depth',
        roleScore: { 技术岗: 3, 测试岗: 2 },
      },
    ],
  },
  {
    id: 'workstyle',
    prompt: '一个高压项目里，你最稳定的工作方式是哪种？',
    helper: '最后校准你的岗位气质：独立深挖、连接协同、推进落地还是验证风险。',
    dimension: 'workstyle',
    options: [
      {
        label: '安静深挖，靠作品和结果说话',
        detail: '更偏技术岗。',
        value: 'deep-work',
        next: 'city',
        roleScore: { 技术岗: 2 },
      },
      {
        label: '把人拉齐，让信息流动起来',
        detail: '更偏 HR 职能或产品协调。',
        value: 'connect',
        next: 'city',
        roleScore: { HR职能: 2, 产品经理: 1 },
      },
      {
        label: '拆目标、排节奏、盯交付',
        detail: '更偏产品经理。',
        value: 'drive',
        next: 'city',
        roleScore: { 产品经理: 2 },
      },
      {
        label: '反复验证，直到风险闭环',
        detail: '更偏测试岗。',
        value: 'verify',
        next: 'city',
        roleScore: { 测试岗: 2 },
      },
    ],
  },
  {
    id: 'city',
    prompt: '最后一题：你最想把第一份正式机会放在哪座城市？',
    helper: '城市会影响岗位排序，但不会一票否决你的方向。',
    dimension: 'city',
    options: [
      { label: '深圳', detail: '技术、产品、硬核业务机会密集。', value: 'shenzhen', city: '深圳' },
      { label: '广州', detail: '内容、运营、校园招聘和本地业务更友好。', value: 'guangzhou', city: '广州' },
      { label: '上海', detail: '平台型公司、质量体系和职能岗位选择更多。', value: 'shanghai', city: '上海' },
    ],
  },
]

const roleAliases: Record<string, string[]> = {
  技术岗: ['技术岗', '前端开发', '工程能力', '技术研发'],
  HR职能: ['HR职能', '校园招聘', '沟通协调', '人力资源'],
  产品经理: ['产品经理', 'AI 产品', '数据产品', '增长产品'],
  测试岗: ['测试岗', '质量保障', '逻辑验证', '软件测试'],
  'AI 产品': ['AI 产品', '产品经理', '数据产品'],
  商业分析: ['商业分析', '策略运营', '数据产品'],
  增长产品: ['增长产品', '产品经理', '用户运营'],
}

const coverageRate = (source: string[], target: string[]) => {
  if (target.length === 0) return 100
  const hits = target.filter((item) => source.includes(item))
  return Math.round((hits.length / target.length) * 100)
}

export const getPresetByRole = (role: string) =>
  presets.find((preset) => preset.profile.targetRole === role) ?? presets[0]

const buildCareerProfile = (role: CareerRole, city: string): CandidateProfile => {
  const profileByRole: Record<CareerRole, CandidateProfile> = {
    技术岗: {
      name: '测评候选人',
      grade: '在校生 / 校招准备期',
      major: '计算机 / 软件工程 / 信息类相关',
      targetCity: city,
      targetRole: '技术岗',
      strengths: ['代码实现', '系统学习', '工程协作', '逻辑推理'],
      interests: ['技术研发', '前端开发', '软件测试'],
      experienceTags: ['课程项目', '开源项目', '实习经历'],
      resumeSignals: ['项目可展示', '技术关键词待补强', '工程细节需要量化'],
      summary:
        '你的决策路径更像“技术达人”：喜欢把问题落到实现、调试和系统方案上。建议优先投技术岗，并把项目写成技术方案、性能优化和工程协作证据。',
    },
    HR职能: {
      name: '测评候选人',
      grade: '在校生 / 校招准备期',
      major: '人力资源 / 管理 / 心理 / 传播类相关',
      targetCity: city,
      targetRole: 'HR职能',
      strengths: ['沟通表达', '活动组织', '同理心', '跨团队协作'],
      interests: ['人力资源', '校园招聘', '用户运营'],
      experienceTags: ['社团运营', '校园活动', '实习经历'],
      resumeSignals: ['人群连接信号强', '活动经历可迁移', '数据复盘需要补强'],
      summary:
        '你的决策路径更像“人群连接者”：擅长组织场域、理解他人、让信息流动起来。建议优先看 HR 职能、校园招聘、员工体验或招聘运营方向。',
    },
    产品经理: {
      name: '测评候选人',
      grade: '在校生 / 校招准备期',
      major: '不限专业 / 产品与业务兴趣强',
      targetCity: city,
      targetRole: '产品经理',
      strengths: ['结构化表达', '用户研究', '跨团队协作', '数据分析'],
      interests: ['产品经理', 'AI 应用', '数据产品'],
      experienceTags: ['校园产品项目', '数据可视化作品', '实习经历'],
      resumeSignals: ['问题拆解较强', '项目叙事可塑性高', '业务结果需要前置'],
      summary:
        '你的决策路径更像“产品搭桥人”：能在用户、业务和研发之间拆问题、排优先级、推落地。建议优先投产品经理、AI 产品或数据产品方向。',
    },
    测试岗: {
      name: '测评候选人',
      grade: '在校生 / 校招准备期',
      major: '计算机 / 软件工程 / 信息类相关',
      targetCity: city,
      targetRole: '测试岗',
      strengths: ['逻辑推理', '细节敏感', '风险意识', '数据分析'],
      interests: ['软件测试', '质量保障', '技术研发'],
      experienceTags: ['测试用例', '课程项目', '实习经历'],
      resumeSignals: ['风险意识强', '验证思路清晰', '测试方法论需要显性化'],
      summary:
        '你的决策路径更像“求证派”：会主动寻找边界、复现路径和风险闭环。建议优先投软件测试、质量保障、自动化测试方向。',
    },
  }

  return profileByRole[role]
}

export const buildProfileFromResumeText = (resumeText: string) => {
  const text = resumeText.toLowerCase()

  if (text.includes('sql') || text.includes('分析') || text.includes('strategy')) {
    return {
      ...presets[1].profile,
      name: '解析候选人',
      summary:
        '系统从简历中识别到较强的数据分析和商业支持信号，建议优先走商业分析 / 数据产品路径。',
    }
  }

  if (text.includes('活动') || text.includes('运营') || text.includes('内容')) {
    return {
      ...presets[2].profile,
      name: '解析候选人',
      summary:
        '系统从简历中识别到较强的增长、内容和用户运营信号，建议优先走增长产品 / 内容策略路径。',
    }
  }

  return {
    ...presets[0].profile,
    name: '解析候选人',
    summary:
      '系统从简历中识别到较强的产品潜力，建议优先走 AI 产品 / 数据产品路径，并补强项目结果量化。',
  }
}

export const buildProfileFromQuiz = (answers: Record<string, string>) => {
  const roleScores: Record<CareerRole, number> = {
    技术岗: 0,
    HR职能: 0,
    产品经理: 0,
    测试岗: 0,
  }

  let city = '深圳'

  quizQuestions.forEach((question) => {
    const selectedValue = answers[question.id]
    const option = question.options.find((item) => item.value === selectedValue)
    if (!option) return

    if (option.roleScore) {
      ;(Object.keys(option.roleScore) as Array<keyof typeof roleScores>).forEach((role) => {
        roleScores[role] += option.roleScore?.[role] ?? 0
      })
    }

    if (option.city) {
      city = option.city
    }
  })

  const topRole = (Object.entries(roleScores).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    '产品经理') as CareerRole

  return buildCareerProfile(topRole, city)
}

export const getDefaultJd = (job: JobRole) =>
  [
    `岗位名称：${job.title}`,
    `公司：${job.company}`,
    `地点：${job.city}`,
    `岗位类型：${job.type}`,
    `核心能力：${job.strengthsWanted.join('、')}`,
    `偏好兴趣：${job.interestsWanted.join('、')}`,
    `经历要求：${job.experienceWanted.join('、')}`,
    `关键词：${job.jdKeywords.join('、')}`,
  ].join('\n')

export const scoreJob = (profile: CandidateProfile, job: JobRole): MatchResult => {
  let score = 35
  const matchReasons: string[] = []
  const gapReasons: string[] = []

  if (profile.targetCity === job.city) {
    score += 14
    matchReasons.push(`目标城市与岗位城市一致：${job.city}`)
  } else {
    gapReasons.push(`目标城市为 ${profile.targetCity}，岗位位于 ${job.city}，需要准备异地动机`)
  }

  const roleKeywords = roleAliases[profile.targetRole] ?? [profile.targetRole]
  const roleMatched = job.tags.some((tag) => roleKeywords.includes(tag))
  if (roleMatched) {
    score += 14
    matchReasons.push(`目标方向与岗位标签贴合：${profile.targetRole}`)
  } else {
    gapReasons.push(`目标方向为 ${profile.targetRole}，需要补充转向该岗位的理由`)
  }

  const strengthHits = job.strengthsWanted.filter((item) => profile.strengths.includes(item))
  score += strengthHits.length * 7
  if (strengthHits.length > 0) {
    matchReasons.push(`能力项命中 ${strengthHits.length} 项：${strengthHits.join('、')}`)
  }

  const interestHits = job.interestsWanted.filter((item) => profile.interests.includes(item))
  score += interestHits.length * 6
  if (interestHits.length > 0) {
    matchReasons.push(`职业兴趣贴合：${interestHits.join('、')}`)
  }

  const experienceHits = job.experienceWanted.filter((item) => profile.experienceTags.includes(item))
  score += experienceHits.length * 5
  if (experienceHits.length > 0) {
    matchReasons.push(`经历证据可支撑 JD：${experienceHits.join('、')}`)
  }

  if (experienceHits.length < job.experienceWanted.length) {
    const missing = job.experienceWanted.filter((item) => !profile.experienceTags.includes(item))
    gapReasons.push(`仍缺少 ${missing.join('、')} 的直接证据`)
  }

  const keywordCoverage = coverageRate(
    profile.strengths.concat(profile.interests, profile.experienceTags),
    job.jdKeywords,
  )

  if (keywordCoverage < 50) {
    gapReasons.push('简历对 JD 关键词覆盖偏低，需要做岗位定制版')
  } else {
    matchReasons.push(`JD 关键词覆盖较好：${keywordCoverage}%`)
  }

  return {
    ...job,
    score: Math.min(score, 98),
    matchReasons,
    gapReasons,
    keywordCoverage,
  }
}

export const buildResumeAudit = (profile: CandidateProfile, job: MatchResult): ResumeAudit => {
  const keywordCoverage = coverageRate(
    profile.strengths.concat(profile.interests, profile.experienceTags),
    job.jdKeywords,
  )
  const evidenceDensity = Math.min(profile.resumeSignals.length * 18 + profile.experienceTags.length * 8, 95)
  const roleFocus = Math.min(
    45 +
      profile.interests.filter((item) => job.interestsWanted.includes(item)).length * 15 +
      (profile.targetRole === 'AI 产品' && job.tags.includes('AI 产品') ? 15 : 0),
    95,
  )
  const atsPassRate = Math.min(
    Math.round(keywordCoverage * 0.4 + evidenceDensity * 0.3 + roleFocus * 0.3),
    96,
  )

  return {
    keywordCoverage,
    evidenceDensity,
    roleFocus,
    atsPassRate,
    summary:
      keywordCoverage >= 70
        ? `你对 ${job.title} 的基础匹配已经不错，当前短板主要是简历叙事还不够聚焦。`
        : `你对 ${job.title} 有潜力，但简历还没有把对应证据写出来，建议先做定制版简历。`,
    actions: [
      `把简历抬头改成“${profile.targetRole}方向”，先解决 HR 3 秒定位问题。`,
      `针对 ${job.title} 补 6-8 个关键词，优先补 ${job.jdKeywords.slice(0, 4).join('、')}。`,
      '每段经历统一改写成“场景-动作-结果-复盘”四句式，减少流水账。',
      `新增“代表项目精选”模块，只保留最贴合 ${job.title} 的 2 个项目。`,
    ],
  }
}

export const buildJdInsight = (
  profile: CandidateProfile,
  job: MatchResult,
  jdInput: string,
): JdInsight => {
  const requirementPool = Array.from(
    new Set([...job.jdKeywords, ...job.strengthsWanted, ...job.interestsWanted, ...job.experienceWanted]),
  )

  const activeKeywords = requirementPool.filter((item) => jdInput.includes(item))
  const sourcePool = profile.strengths
    .concat(profile.interests)
    .concat(profile.experienceTags)
    .concat(profile.targetRole)
  const hitKeywords = activeKeywords.filter((item) => sourcePool.includes(item))
  const missingKeywords = activeKeywords.filter((item) => !sourcePool.includes(item))

  return {
    activeKeywords,
    hitKeywords,
    missingKeywords,
    recommendation:
      missingKeywords.length > 0
        ? `建议优先把 ${missingKeywords.slice(0, 3).join('、')} 写进简历标题、项目描述和技能区。`
        : '当前 JD 关键词命中不错，可以继续强化成果量化和岗位动机。',
  }
}

export const buildRewritePack = (
  profile: CandidateProfile,
  job: MatchResult,
  audit: ResumeAudit,
): RewritePack => {
  const strongest = profile.strengths[0] ?? '结构化表达'
  const project = profile.experienceTags[0] ?? '校园项目'

  return {
    before: `参与${project}，负责一些调研和分析工作，和团队一起推进项目落地，积累了产品相关经验。`,
    after: `在${project}中，围绕${job.title}相关场景主导${strongest}工作，结合${job.jdKeywords
      .slice(0, 2)
      .join('、')}完成问题拆解，输出可执行方案并推动跨团队落地，使项目更贴近${profile.targetRole}岗位要求。`,
    bullets: [
      `ATS 初筛预计通过率：${audit.atsPassRate}%`,
      `建议把“${job.jdKeywords[0]}”“${job.jdKeywords[1]}”前置到经历首句`,
      `优先保留与 ${job.title} 最相关的 2 段经历，其余内容压缩到一行`,
    ],
  }
}

export const buildWeeklyPlan = (job: MatchResult, audit: ResumeAudit) => [
  `今天：定制 ${job.title} 版本简历，先补 ${job.jdKeywords.slice(0, 3).join('、')}`,
  `明天：重写 2 段核心经历，把成果量化口径补完整，目标 ATS 通过率提升到 ${Math.min(
    audit.atsPassRate + 8,
    99,
  )}%`,
  `48 小时内：准备一段“为什么投 ${job.company}”的 60 秒口头答案`,
  '本周内：完成主投岗位 3 个、冲刺岗位 2 个、保底岗位 2 个的投递节奏',
]
