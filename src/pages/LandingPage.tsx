import { Link } from 'react-router-dom'
import { productModules } from '../app/data'
import { useProfile } from '../app/use-profile'
import { StepRail } from '../components/StepRail'

export function LandingPage() {
  const { rankedJobs } = useProfile()

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <h1>把求职从海投，变成一张清楚的作战地图。</h1>
          <p>
            Offer Catcher 会先理解学生画像，再匹配岗位、拆解 JD、输出简历优化建议。
            你可以上传简历，也可以进入动态决策树，判断自己更偏技术岗、HR 职能、产品经理还是测试岗。
          </p>

          <div className="hero-actions">
            <Link to="/intake/upload" className="primary-action">
              上传简历开始
            </Link>
            <Link to="/intake/quiz" className="secondary-action">
              做画像测评
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <strong>2</strong>
              <span>种画像采集方式</span>
            </div>
            <div className="stat-card">
              <strong>{rankedJobs.length}</strong>
              <span>个岗位样例</span>
            </div>
            <div className="stat-card">
              <strong>4</strong>
              <span>类方向画像</span>
            </div>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="hero-panel-header">
            <span>完整体验路径</span>
            <strong>从进入到投递</strong>
          </div>
          <StepRail currentStep="landing" />
        </aside>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">产品结构</span>
            <h2>参考建站手册的模块化方法，拆成四个清晰工作区。</h2>
          </div>
          <p>
            首页只负责分流，具体动作进入独立页面完成。这样学生不会被信息淹没，也更像真实产品。
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

      <section className="section route-grid">
        <article className="route-card route-card-dark">
          <span>入口 01</span>
          <h2>已有简历？直接上传或粘贴文本。</h2>
          <p>适合已经准备过简历的学生。系统会模拟解析简历，抽取能力、经历证据和岗位方向。</p>
          <Link to="/intake/upload" className="primary-action light-action">
            进入上传页
          </Link>
        </article>

        <article className="route-card">
          <span>入口 02</span>
          <h2>还不确定方向？先做职业画像题。</h2>
          <p>不是固定问卷。你的每次选择都会决定下一题，最后生成更贴近真实岗位的方向画像。</p>
          <Link to="/intake/quiz" className="secondary-action">
            进入测评页
          </Link>
        </article>
      </section>
    </main>
  )
}
