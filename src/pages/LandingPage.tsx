import { Link } from 'react-router-dom'
import { useProfile } from '../app/use-profile'
import { StepRail } from '../components/StepRail'

const productModules = [
  {
    code: 'M01',
    title: '求职副本诊断',
    detail: '用剧情选择捕捉岗位理解、简历证据、HR沟通和面试表达短板。',
  },
  {
    code: 'M02',
    title: '学生画像采集',
    detail: '支持简历上传、文本粘贴和动态职业测评，形成可解释求职画像。',
  },
  {
    code: 'M03',
    title: '岗位匹配看板',
    detail: '把岗位分成冲刺、主投、保底，展示匹配理由、缺口和关键词。',
  },
  {
    code: 'M04',
    title: '简历实验室',
    detail: '围绕目标 JD 输出 ATS 命中、改写样例和本周行动计划。',
  },
]

export function LandingPage() {
  const { rankedJobs } = useProfile()

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <h1>把求职从海投，变成一场有策略的通关副本。</h1>
          <p>
            Offer Catcher 会先理解你的求职画像，再匹配岗位、拆解 JD、输出简历优化建议。
            你可以上传简历，也可以进入剧情式求职副本，在选择中看见自己的初筛风险和行动优先级。
          </p>

          <div className="hero-actions">
            <Link to="/quest" className="primary-action">
              进入求职副本
            </Link>
            <Link to="/intake/upload" className="secondary-action">
              上传简历开始
            </Link>
            <Link to="/intake/quiz" className="secondary-action">
              做画像测评
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <strong>7</strong>
              <span>幕剧情关卡</span>
            </div>
            <div className="stat-card">
              <strong>{rankedJobs.length}</strong>
              <span>个岗位样例</span>
            </div>
            <div className="stat-card">
              <strong>4</strong>
              <span>项求职能力</span>
            </div>
          </div>
        </div>

        <aside className="hero-panel quest-entry-panel">
          <div className="hero-panel-header">
            <span>新增玩法</span>
            <strong>求职副本模拟器</strong>
          </div>
          <p>
            从“看到心动 JD”开始，经历岗位侦察、简历急救、作品证据包、HR 私信、模拟面试和投递策略。
            每次选择都会掉落标签、改变能力值，最后生成结局卡和专业建议。
          </p>
          <div className="quest-mini-map">
            {['JD来了', '岗位侦察', '简历急救', '作品证据包', 'HR私信', '模拟面试', '投递策略'].map((item, index) => (
              <Link to="/quest" key={item} className="quest-mini-node">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="section route-grid">
        <article className="route-card route-card-dark">
          <span>入口 01</span>
          <h2>想先体验一下？从剧情副本开始。</h2>
          <p>适合还没准备好简历、但想知道自己求职短板的学生。通过选择剧情生成结局卡，再进入岗位匹配。</p>
          <Link to="/quest" className="primary-action light-action">
            开始副本
          </Link>
        </article>

        <article className="route-card">
          <span>入口 02</span>
          <h2>已有简历？直接上传或粘贴文本。</h2>
          <p>适合已经准备过简历的学生。系统会模拟解析简历，抽取能力、经历证据和岗位方向。</p>
          <Link to="/intake/upload" className="secondary-action">
            进入上传页
          </Link>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">产品结构</span>
            <h2>娱乐性负责让学生愿意点下去，专业性负责让每次选择都有求职价值。</h2>
          </div>
          <p>
            副本模拟器不是独立小游戏，而是求职工作台的前置诊断入口。它把抽象能力变成场景选择，
            再把结果回流到岗位匹配和简历优化。
          </p>
        </div>

        <div className="module-grid">
          {productModules.map((module) => (
            <article key={module.code} className="module-card">
              <span>{module.code}</span>
              <h3>{module.title}</h3>
              <p>{module.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="hero-panel">
          <div className="hero-panel-header">
            <span>完整体验路径</span>
            <strong>从进入到投递</strong>
          </div>
          <StepRail currentStep="landing" />
        </div>
      </section>
    </main>
  )
}
