import { Link } from 'react-router-dom'
import { buildResumeAudit, buildRewritePack, buildWeeklyPlan } from '../app/data'
import { useProfile } from '../app/use-profile'

export function ResumeLabPage() {
  const { profile, selectedJob } = useProfile()
  const audit = buildResumeAudit(profile, selectedJob)
  const rewritePack = buildRewritePack(profile, selectedJob, audit)
  const weeklyPlan = buildWeeklyPlan(selectedJob, audit)

  return (
    <main>
      <section className="section page-hero results-hero">
        <div className="page-hero-copy">
          <span className="section-kicker">简历实验室</span>
          <h1>先把简历改到像这个岗位的人，再去投递。</h1>
          <p>
            当前目标岗位是 {selectedJob.company} 的 {selectedJob.title}。这一页会把抽象建议翻译成具体表达、关键词动作和一周投递节奏。
          </p>
          <div className="hero-actions">
            <Link to={`/jobs/${selectedJob.id}`} className="secondary-action">
              返回 JD 分析
            </Link>
          </div>
        </div>
        <aside className="hero-panel compact-panel">
          <div className="hero-panel-header">
            <span>当前简历命中率</span>
            <strong>{audit.atsPassRate}%</strong>
          </div>
          <div className="lab-meter">
            <span style={{ width: `${audit.atsPassRate}%` }} />
          </div>
          <p>{audit.summary}</p>
        </aside>
      </section>

      <section className="section insight-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <span className="section-kicker">表达改写</span>
              <h3>把“做过一些事”改成“我能胜任这份岗位”。</h3>
            </div>
            <strong>{profile.targetRole}</strong>
          </div>

          <div className="rewrite-grid">
            <div className="rewrite-card">
              <label>改写前</label>
              <p>{rewritePack.before}</p>
            </div>
            <div className="rewrite-card highlight-card">
              <label>改写后</label>
              <p>{rewritePack.after}</p>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <span className="section-kicker">操作清单</span>
              <h3>今天就能开始动手。</h3>
            </div>
            <strong>可直接照做</strong>
          </div>

          <ol className="action-list no-top-gap">
            {rewritePack.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
            {audit.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ol>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">一周陪跑计划</span>
            <h2>改完简历之后，系统继续告诉你下一步做什么。</h2>
          </div>
          <p>让工具从“分析器”变成“陪跑器”，这是求职体验里很重要的一层。</p>
        </div>

        <div className="framework-grid four-grid">
          {weeklyPlan.map((item, index) => (
            <article key={item} className="framework-card">
              <span>DAY {index + 1}</span>
              <h3>行动节点</h3>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
