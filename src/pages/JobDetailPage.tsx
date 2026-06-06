import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buildJdInsight, buildResumeAudit } from '../app/data'
import { useProfile } from '../app/use-profile'
import { ScoreRing } from '../components/ScoreRing'

export function JobDetailPage() {
  const { jobId } = useParams()
  const { profile, rankedJobs, selectedJob, selectJob, getJdInput, setJdInput } = useProfile()
  const currentJob = rankedJobs.find((job) => job.id === jobId) ?? selectedJob
  const jdInput = getJdInput(currentJob.id)

  useEffect(() => {
    if (currentJob.id !== selectedJob.id) {
      selectJob(currentJob.id)
    }
  }, [currentJob.id, selectedJob.id, selectJob])

  const audit = buildResumeAudit(profile, currentJob)
  const insight = buildJdInsight(profile, currentJob, jdInput)

  return (
    <main>
      <section className="section page-hero results-hero">
        <div className="page-hero-copy">
          <span className="section-kicker">岗位详情 / JD 分析</span>
          <h1>{currentJob.title}</h1>
          <p>
            {currentJob.company} · {currentJob.city} · {currentJob.type} · {currentJob.salary}
          </p>
          <div className="tag-row top-gap">
            {currentJob.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <aside className="hero-panel compact-panel score-panel">
          <div className="hero-panel-header">
            <span>当前适配度</span>
            <strong>{currentJob.score} 分</strong>
          </div>
          <ScoreRing score={currentJob.score} />
        </aside>
      </section>

      <section className="section split-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <span className="section-kicker">JD 文本</span>
              <h3>粘贴岗位描述，检查简历缺口。</h3>
            </div>
            <strong>{insight.hitKeywords.length} 项已命中</strong>
          </div>

          <label className="field">
            <span>岗位描述 / JD 文本</span>
            <textarea
              rows={11}
              value={jdInput}
              onChange={(event) => setJdInput(currentJob.id, event.target.value)}
            />
          </label>

          <div className="keyword-grid">
            <div className="keyword-card">
              <h4>已命中关键词</h4>
              <div className="tag-row">
                {insight.hitKeywords.length > 0 ? (
                  insight.hitKeywords.map((keyword) => <span key={keyword}>{keyword}</span>)
                ) : (
                  <span>暂无命中</span>
                )}
              </div>
            </div>
            <div className="keyword-card warning-card">
              <h4>待补强关键词</h4>
              <div className="tag-row">
                {insight.missingKeywords.length > 0 ? (
                  insight.missingKeywords.map((keyword) => <span key={keyword}>{keyword}</span>)
                ) : (
                  <span>暂无明显缺口</span>
                )}
              </div>
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <span className="section-kicker">初筛视角</span>
              <h3>HR 可能先看到这些信号。</h3>
            </div>
            <strong>{audit.atsPassRate}% 预估通过率</strong>
          </div>

          <div className="check-grid">
            <div className="check-card">
              <div className="check-score">{audit.keywordCoverage}</div>
              <div>
                <h4>关键词覆盖</h4>
                <p>决定简历能不能先被机器和 HR 快速识别。</p>
              </div>
            </div>
            <div className="check-card">
              <div className="check-score">{audit.roleFocus}</div>
              <div>
                <h4>岗位叙事聚焦</h4>
                <p>决定你是不是像一个明确要投这份岗位的人。</p>
              </div>
            </div>
            <div className="check-card">
              <div className="check-score">{audit.evidenceDensity}</div>
              <div>
                <h4>证据密度</h4>
                <p>决定经历是否足够支撑你的岗位方向。</p>
              </div>
            </div>
          </div>

          <div className="tip-box">
            <h4>系统建议</h4>
            <p>{insight.recommendation}</p>
            <p>{currentJob.challenge}</p>
          </div>

          <div className="hero-actions">
            <Link to="/resume-lab" className="primary-action">
              进入简历实验室
            </Link>
            <Link to="/results" className="secondary-action">
              返回匹配看板
            </Link>
          </div>
        </article>
      </section>
    </main>
  )
}
