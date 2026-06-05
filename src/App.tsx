import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import './App.css'

type CandidateProfile = {
  name: string
  grade: string
  major: string
  targetCity: string
  targetRole: string
  strengths: string[]
  interests: string[]
  experienceTags: string[]
  resumeSignals: string[]
}

type ProfilePreset = {
  id: string
  label: string
  profile: CandidateProfile
}

type JobRole = {
  id: string
  title: string
  company: string
  city: string
  type: string
  salary: string
  tags: string[]
  strengthsWanted: string[]
  interestsWanted: string[]
  experienceWanted: string[]
  jdKeywords: string[]
  challenge: string
}

type MatchResult = JobRole & {
  score: number
  matchReasons: string[]
  gapReasons: string[]
  keywordCoverage: number
}

type ResumeAudit = {
  keywordCoverage: number
  evidenceDensity: number
  roleFocus: number
  summary: string
  actions: string[]
}

const presets: ProfilePreset[] = [
  {
    id: 'pm',
    label: '产品型候选人',
    profile: {
      name: '林可',
      grade: '大四 / 2026 届',
      major: '信息管理与信息系统',
      targetCity: '深圳',
      targetRole: 'AI 产品',
      strengths: ['数据分析', '结构化表达', '跨团队协作', '用户研究'],
      interests: ['产品经理', '商业分析', 'AI 应用'],
      experienceTags: ['校园产品项目', '数据可视化作品', '社团运营', '实习经历'],
      resumeSignals: ['有量化成果', '项目职责清晰', '技能关键词覆盖中等', '教育经历完整'],
    },
  },
  {
    id: 'data',
    label: '数据分析型候选人',
    profile: {
      name: '周行',
      grade: '研一 / 2027 届',
      major: '应用统计',
      targetCity: '深圳',
      targetRole: '商业分析',
      strengths: ['SQL', '数据分析', '业务洞察', '报告撰写'],
      interests: ['商业分析', '数据产品', '策略运营'],
      experienceTags: ['商业分析实习', '竞赛获奖', '数据可视化作品'],
      resumeSignals: ['量化结果较强', '经历相关性高', '项目表达偏学术'],
    },
  },
  {
    id: 'growth',
    label: '增长运营型候选人',
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
    },
  },
]

const jobs: JobRole[] = [
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
    challenge: '需要更强的 AI 产品案例表述。',
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
    challenge: '需要把分析方法和业务结论写得更像真实业务场景。',
  },
  {
    id: 'job-03',
    title: '用户增长产品助理',
    company: '青岚内容',
    city: '广州',
    type: '校招全职',
    salary: '15K-20K x 13',
    tags: ['增长产品', '内容平台', '用户运营'],
    strengthsWanted: ['用户研究', '跨团队协作', '活动策划'],
    interestsWanted: ['增长产品', '产品经理'],
    experienceWanted: ['校园产品项目', '社团运营', '新媒体实习'],
    jdKeywords: ['A/B Test', '拉新', '留存', '用户分层', '活动策划'],
    challenge: '如果目标城市不是广州，需要证明你愿意接受异地发展。',
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
    challenge: '非常匹配，但要补一段“为什么关注 HR 场景”的动机说明。',
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
    challenge: '需要补更多面向内容和社区运营的案例证据。',
  },
]

const splitTags = (value: string) =>
  value
    .split(/[\n,，/、]/)
    .map((item) => item.trim())
    .filter(Boolean)

const roleAliases: Record<string, string[]> = {
  'AI 产品': ['AI 产品', '产品经理', '数据产品'],
  '商业分析': ['商业分析', '策略运营', '数据产品'],
  '增长产品': ['增长产品', '产品经理', '用户运营'],
}

const coverageRate = (source: string[], target: string[]) => {
  if (target.length === 0) return 100
  const hits = target.filter((item) => source.includes(item))
  return Math.round((hits.length / target.length) * 100)
}

const scoreJob = (profile: CandidateProfile, job: JobRole): MatchResult => {
  let score = 35
  const matchReasons: string[] = []
  const gapReasons: string[] = []

  if (profile.targetCity === job.city) {
    score += 14
    matchReasons.push(`目标城市与岗位城市一致：${job.city}`)
  } else {
    gapReasons.push(`目标城市为 ${profile.targetCity}，岗位位于 ${job.city}`)
  }

  const roleKeywords = roleAliases[profile.targetRole] ?? [profile.targetRole]
  const roleMatched = job.tags.some((tag) => roleKeywords.includes(tag)) || roleKeywords.includes(job.title)
  if (roleMatched) {
    score += 14
    matchReasons.push(`目标方向与岗位标签贴合：${profile.targetRole}`)
  } else {
    gapReasons.push(`目标方向为 ${profile.targetRole}，需要补充岗位转向理由`)
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

  const experienceHits = job.experienceWanted.filter((item) =>
    profile.experienceTags.includes(item),
  )
  score += experienceHits.length * 5
  if (experienceHits.length > 0) {
    matchReasons.push(`经历证据能支撑 JD：${experienceHits.join('、')}`)
  }

  if (experienceHits.length < job.experienceWanted.length) {
    const missing = job.experienceWanted.filter((item) => !profile.experienceTags.includes(item))
    gapReasons.push(`仍缺少 ${missing.join('、')} 的直接证明`)
  }

  const keywordCoverage = coverageRate(profile.strengths.concat(profile.experienceTags), job.jdKeywords)
  if (keywordCoverage < 50) {
    gapReasons.push('简历对 JD 关键词的覆盖还偏低，需要定制化补强')
  } else {
    matchReasons.push(`JD 关键词覆盖率较好：${keywordCoverage}%`)
  }

  return {
    ...job,
    score: Math.min(score, 98),
    matchReasons,
    gapReasons,
    keywordCoverage,
  }
}

const buildResumeAudit = (profile: CandidateProfile, job: MatchResult): ResumeAudit => {
  const evidenceDensity = Math.min(profile.resumeSignals.length * 18 + profile.experienceTags.length * 8, 95)
  const roleFocus = Math.min(
    45 +
      (profile.interests.filter((item) => job.interestsWanted.includes(item)).length * 15) +
      (profile.targetRole === 'AI 产品' && job.tags.includes('AI 产品') ? 15 : 0),
    95,
  )

  const keywordCoverage = coverageRate(
    profile.strengths.concat(profile.interests, profile.experienceTags),
    job.jdKeywords,
  )

  const actions = [
    `把简历抬头改成“${profile.targetRole}方向”，先解决 HR 3 秒定位问题。`,
    `针对 ${job.title} 补 6-8 个关键词，优先补 ${job.jdKeywords.slice(0, 4).join('、')}。`,
    '每段经历统一改写成“场景-动作-结果-反思”四句式，减少流水账。',
    `新增“代表项目精选”模块，只保留最贴合 ${job.title} 的 2 个项目。`,
  ]

  return {
    keywordCoverage,
    evidenceDensity,
    roleFocus,
    summary:
      keywordCoverage >= 70
        ? `你对 ${job.title} 的基础匹配已经不错，当前短板主要是简历叙事还不够聚焦。`
        : `你对 ${job.title} 的潜力较强，但简历还没有把对应证据写出来，建议先做定制版简历。`,
    actions,
  }
}

function ScoreRing({ score }: { score: number }) {
  const style = { '--score': `${score}` } as CSSProperties

  return (
    <div className="score-ring" style={style}>
      <div>
        <strong>{score}</strong>
        <span>匹配度</span>
      </div>
    </div>
  )
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string
  value: number
  detail: string
}) {
  return (
    <div className="check-card">
      <div className="check-score">{value}</div>
      <div>
        <h4>{label}</h4>
        <p>{detail}</p>
      </div>
    </div>
  )
}

function App() {
  const [profile, setProfile] = useState<CandidateProfile>(presets[0].profile)
  const [selectedJobId, setSelectedJobId] = useState(jobs[0].id)

  const rankedJobs = useMemo(
    () => jobs.map((job) => scoreJob(profile, job)).sort((a, b) => b.score - a.score),
    [profile],
  )

  const selectedJob = rankedJobs.find((job) => job.id === selectedJobId) ?? rankedJobs[0]
  const resumeAudit = useMemo(() => buildResumeAudit(profile, selectedJob), [profile, selectedJob])

  const updateField = (field: keyof CandidateProfile, value: string) => {
    if (
      field === 'strengths' ||
      field === 'interests' ||
      field === 'experienceTags' ||
      field === 'resumeSignals'
    ) {
      setProfile((current) => ({
        ...current,
        [field]: splitTags(value),
      }))
      return
    }

    setProfile((current) => ({
      ...current,
      [field]: value,
    }))
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Offer 捕手 · 学生求职匹配智能体</div>
          <h1>先帮学生找对岗位，再帮学生把简历改到能过筛。</h1>
          <p>
            当前版本已经支持候选人信息输入、岗位实时排序、岗位差距诊断和定制化简历建议，
            适合作为作业 Demo 直接演示“从输入到输出”的完整闭环。
          </p>
          <div className="hero-actions">
            <a href="#workspace" className="primary-action">
              进入交互区
            </a>
            <a href="#delivery" className="secondary-action">
              看部署步骤
            </a>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-header">
            <span>当前推荐结果</span>
            <strong>{rankedJobs[0].title}</strong>
          </div>
          <ul className="signal-list">
            <li>
              <label>候选人</label>
              <span>
                {profile.name} · {profile.grade}
              </span>
            </li>
            <li>
              <label>目标方向</label>
              <span>
                {profile.targetRole} · {profile.targetCity}
              </span>
            </li>
            <li>
              <label>推荐公司</label>
              <span>
                {rankedJobs[0].company} · {rankedJobs[0].salary}
              </span>
            </li>
            <li>
              <label>系统建议</label>
              <span>{resumeAudit.summary}</span>
            </li>
          </ul>
        </div>
      </header>

      <main id="workspace">
        <section className="section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">操作区</span>
              <h2>先切换候选人，再看岗位排序如何变化</h2>
            </div>
            <p>为了答辩更顺滑，我把典型学生场景做成了预设卡片，也支持手动改信息。</p>
          </div>

          <div className="preset-row">
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`preset-chip ${profile.name === preset.profile.name ? 'active' : ''}`}
                onClick={() => {
                  setProfile(preset.profile)
                  setSelectedJobId(jobs[0].id)
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="workspace-grid">
            <article className="panel form-panel">
              <div className="panel-header">
                <div>
                  <span className="section-kicker">候选人画像</span>
                  <h3>可编辑输入</h3>
                </div>
                <strong>支持现场改参演示</strong>
              </div>

              <div className="form-grid">
                <label className="field">
                  <span>姓名</span>
                  <input
                    value={profile.name}
                    onChange={(event) => updateField('name', event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>学历阶段</span>
                  <input
                    value={profile.grade}
                    onChange={(event) => updateField('grade', event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>专业</span>
                  <input
                    value={profile.major}
                    onChange={(event) => updateField('major', event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>目标城市</span>
                  <input
                    value={profile.targetCity}
                    onChange={(event) => updateField('targetCity', event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>目标岗位方向</span>
                  <select
                    value={profile.targetRole}
                    onChange={(event) => updateField('targetRole', event.target.value)}
                  >
                    <option value="AI 产品">AI 产品</option>
                    <option value="商业分析">商业分析</option>
                    <option value="增长产品">增长产品</option>
                  </select>
                </label>
              </div>

              <div className="field-stack">
                <label className="field">
                  <span>优势标签</span>
                  <textarea
                    rows={3}
                    value={profile.strengths.join('、')}
                    onChange={(event) => updateField('strengths', event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>职业兴趣</span>
                  <textarea
                    rows={2}
                    value={profile.interests.join('、')}
                    onChange={(event) => updateField('interests', event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>经历证据</span>
                  <textarea
                    rows={3}
                    value={profile.experienceTags.join('、')}
                    onChange={(event) => updateField('experienceTags', event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>简历现状信号</span>
                  <textarea
                    rows={3}
                    value={profile.resumeSignals.join('、')}
                    onChange={(event) => updateField('resumeSignals', event.target.value)}
                  />
                </label>
              </div>
            </article>

            <article className="panel summary-panel">
              <div className="panel-header">
                <div>
                  <span className="section-kicker">系统摘要</span>
                  <h3>当前候选人最适合先投什么</h3>
                </div>
                <ScoreRing score={rankedJobs[0].score} />
              </div>

              <div className="summary-card">
                <h4>
                  推荐主投：{rankedJobs[0].title} · {rankedJobs[0].company}
                </h4>
                <p>{resumeAudit.summary}</p>
              </div>

              <div className="tag-panel">
                <label>优势标签</label>
                <div className="tag-row">
                  {profile.strengths.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="tag-panel">
                <label>经历证据</label>
                <div className="tag-row">
                  {profile.experienceTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section dashboard-grid">
          <article className="panel job-list-panel">
            <div className="panel-header">
              <div>
                <span className="section-kicker">岗位匹配</span>
                <h3>推荐岗位排行榜</h3>
              </div>
              <strong>根据输入实时重排</strong>
            </div>

            <div className="job-list">
              {rankedJobs.map((job, index) => (
                <button
                  key={job.id}
                  type="button"
                  className={`job-card ${selectedJob.id === job.id ? 'active' : ''}`}
                  onClick={() => setSelectedJobId(job.id)}
                >
                  <div className="job-card-top">
                    <div>
                      <h4>
                        TOP {index + 1} · {job.title}
                      </h4>
                      <p>
                        {job.company} · {job.city} · {job.type}
                      </p>
                    </div>
                    <span className="score-pill">{job.score}</span>
                  </div>
                  <p className="job-salary">{job.salary}</p>
                  <div className="tag-row">
                    {job.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </article>

          <article className="panel analysis-panel">
            <div className="panel-header">
              <div>
                <span className="section-kicker">岗位诊断</span>
                <h3>{selectedJob.title}</h3>
              </div>
              <ScoreRing score={selectedJob.score} />
            </div>

            <div className="analysis-meta">
              <div>
                <label>公司</label>
                <strong>{selectedJob.company}</strong>
              </div>
              <div>
                <label>城市</label>
                <strong>{selectedJob.city}</strong>
              </div>
              <div>
                <label>关键词覆盖</label>
                <strong>{selectedJob.keywordCoverage}%</strong>
              </div>
            </div>

            <div className="analysis-columns">
              <div>
                <h4>为什么推荐</h4>
                <ul>
                  {selectedJob.matchReasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>仍需补强</h4>
                <ul>
                  {selectedJob.gapReasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                  <li>{selectedJob.challenge}</li>
                </ul>
              </div>
            </div>
          </article>
        </section>

        <section className="section resume-grid">
          <article className="panel resume-panel">
            <div className="panel-header">
              <div>
                <span className="section-kicker">简历命中率</span>
                <h3>围绕目标岗位的简历健康度</h3>
              </div>
              <strong>输出适合直接做 PDF / 答辩展示</strong>
            </div>

            <div className="check-grid">
              <MetricCard
                label="岗位关键词覆盖"
                value={resumeAudit.keywordCoverage}
                detail={`当前对 ${selectedJob.title} 的 JD 关键词覆盖率为 ${resumeAudit.keywordCoverage}%，建议定制版改写。`}
              />
              <MetricCard
                label="经历证据密度"
                value={resumeAudit.evidenceDensity}
                detail="系统优先判断你的经历是否能直接证明岗位要求，而不是只看技能词。"
              />
              <MetricCard
                label="岗位叙事聚焦"
                value={resumeAudit.roleFocus}
                detail="如果你的兴趣、目标岗位和项目表述不一致，初筛命中率会明显下降。"
              />
            </div>
          </article>

          <article className="panel action-panel">
            <div className="panel-header">
              <div>
                <span className="section-kicker">行动清单</span>
                <h3>AI 可输出的定制化建议</h3>
              </div>
              <strong>适合后续接入大模型自动改写</strong>
            </div>

            <ol className="action-list">
              {resumeAudit.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ol>

            <div className="tip-box">
              <h4>面试准备提示</h4>
              <ul>
                <li>先解释为什么你适合这个岗位，再解释你为什么喜欢这个方向。</li>
                <li>准备 1 个最贴近 {selectedJob.title} 的项目案例，突出量化结果。</li>
                <li>准备 1 段“为什么选择 {selectedJob.company}”的动机说明。</li>
              </ul>
            </div>
          </article>
        </section>

        <section className="section architecture-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">方案结构</span>
              <h2>这版 Demo 已经覆盖作业答辩最关键的 4 个问题</h2>
            </div>
            <p>既能解释“为什么有价值”，也能演示“它到底怎么帮学生”。</p>
          </div>

          <div className="framework-grid">
            <div className="framework-card">
              <h3>问题诊断</h3>
              <ul>
                <li>学生不会筛岗位，海投成本高。</li>
                <li>学生不会判断自己与目标岗位的差距。</li>
                <li>学生知道要改简历，但不知道优先改哪里。</li>
              </ul>
            </div>
            <div className="framework-card">
              <h3>AI 能力切口</h3>
              <ul>
                <li>解析简历和求职意向，抽取画像。</li>
                <li>将 JD 要求转成可解释的匹配判断。</li>
                <li>输出定制化简历改写与面试准备建议。</li>
              </ul>
            </div>
            <div className="framework-card">
              <h3>MVP 边界</h3>
              <ul>
                <li>先做岗位匹配与简历优化，不做真实投递。</li>
                <li>先证明决策价值，再考虑接入上传解析与生成式简历。</li>
                <li>答辩时重点展示闭环，而不是功能堆砌。</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section delivery-section" id="delivery">
          <div className="section-heading">
            <div>
              <span className="section-kicker">交付路径</span>
              <h2>从本地项目到 GitHub 与公网部署</h2>
            </div>
            <p>这些步骤我也会继续帮你准备，本地已经具备直接初始化仓库的条件。</p>
          </div>

          <div className="delivery-grid">
            <div className="delivery-card">
              <h3>GitHub 路径</h3>
              <ol>
                <li>在项目根目录执行 `git init`。</li>
                <li>执行 `git add .`。</li>
                <li>执行 `git commit -m "feat: launch offer catcher demo"`。</li>
                <li>在 GitHub 创建仓库，例如 `offer-catcher-demo`。</li>
                <li>执行 `git remote add origin your-repository-url`。</li>
                <li>执行 `git branch -M main && git push -u origin main`。</li>
              </ol>
            </div>

            <div className="delivery-card">
              <h3>公网部署路径</h3>
              <ol>
                <li>推荐 Vercel：直接导入 GitHub 仓库。</li>
                <li>Framework 选择 `Vite`。</li>
                <li>Build Command 保持 `npm run build`。</li>
                <li>Output Directory 设置为 `dist`。</li>
                <li>部署完成后拿到公网链接用于作业提交。</li>
              </ol>
            </div>

            <div className="delivery-card">
              <h3>提交物补齐</h3>
              <ol>
                <li>Demo：当前网页就是可运行交付物。</li>
                <li>方案说明：`docs/offer-catcher-solution.md` 可继续转 PDF。</li>
                <li>演示视频：按“问题-输入-分析-建议-价值”录 2-3 分钟即可。</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
