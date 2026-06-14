import { Link, useNavigate } from 'react-router-dom'
import { buildResumeAudit } from '../app/data'
import { useProfile } from '../app/use-profile'
import DecryptedText from '../components/interactions/DecryptedText'
import ShinyText from '../components/interactions/ShinyText'
import SpotlightSurface from '../components/interactions/SpotlightSurface'
import { MatchCard } from '../components/MatchCard'
import { ScoreRing } from '../components/ScoreRing'

export function ResultsPage() {
  const navigate = useNavigate()
  const { profile, rankedJobs, selectedJob, selectJob } = useProfile()
  const audit = buildResumeAudit(profile, selectedJob)

  const boardGroups = {
    sprint: rankedJobs.filter((job) => job.score >= 80),
    core: rankedJobs.filter((job) => job.score >= 65 && job.score < 80),
    backup: rankedJobs.filter((job) => job.score < 65),
  }

  return (
    <main>
      <section className="section dashboard-hero">
        <div>
          <span className="section-kicker"><ShinyText text="匹配看板" /></span>
          <h1><DecryptedText text="岗位已经按你的画像重新排序。" revealDirection="center" /></h1>
          <p>{profile.summary}</p>
        </div>
        <SpotlightSurface className="profile-summary-card cursor-target">
          <div>
            <label>候选人</label>
            <strong>{profile.name}</strong>
          </div>
          <div>
            <label>目标方向</label>
            <strong>{profile.targetRole}</strong>
          </div>
          <div>
            <label>目标城市</label>
            <strong>{profile.targetCity}</strong>
          </div>
          <div>
            <label>ATS 预估</label>
            <strong>{audit.atsPassRate}%</strong>
          </div>
        </SpotlightSurface>
      </section>

      <section className="section dashboard-grid">
        <SpotlightSurface as="article" className="panel cursor-target">
          <div className="panel-header">
            <div>
              <span className="section-kicker"><ShinyText text="岗位目录" speed={4.1} /></span>
              <h3>优先级排序后的投递清单</h3>
            </div>
            <strong>{rankedJobs.length} 个岗位</strong>
          </div>

          <div className="job-list">
            {rankedJobs.map((job) => (
              <MatchCard
                key={job.id}
                job={job}
                active={selectedJob.id === job.id}
                onClick={() => selectJob(job.id)}
              />
            ))}
          </div>
        </SpotlightSurface>

        <SpotlightSurface as="article" className="panel detail-panel cursor-target">
          <div className="panel-header">
            <div>
              <span className="section-kicker"><ShinyText text="当前岗位" speed={4.3} /></span>
              <h3>{selectedJob.title}</h3>
              <p>
                {selectedJob.company} · {selectedJob.city} · {selectedJob.salary}
              </p>
            </div>
            <ScoreRing score={selectedJob.score} />
          </div>

          <div className="analysis-meta">
            <div>
              <label>岗位类型</label>
              <strong>{selectedJob.type}</strong>
            </div>
            <div>
              <label>关键词覆盖</label>
              <strong>{selectedJob.keywordCoverage}%</strong>
            </div>
            <div>
              <label>投递建议</label>
              <strong>{selectedJob.score >= 80 ? '优先投递' : selectedJob.score >= 65 ? '定制后投递' : '先补证据'}</strong>
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
              </ul>
            </div>
          </div>

          <div className="tip-box">
            <h4>下一步建议</h4>
            <p>{audit.summary}</p>
          </div>

          <div className="hero-actions top-gap">
            <button
              type="button"
              className="primary-action button-reset"
              onClick={() => navigate(`/jobs/${selectedJob.id}`)}
            >
              查看 JD 详情
            </button>
            <Link to="/resume-lab" className="secondary-action">
              优化这版简历
            </Link>
          </div>
        </SpotlightSurface>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="section-kicker"><ShinyText text="投递节奏" speed={4.2} /></span>
            <h2>把“我该投哪个”变成三个优先级队列。</h2>
          </div>
          <p>参考 B 端看板思路：结果不只是推荐列表，而是能直接指导行动的工作台。</p>
        </div>

        <div className="board-grid">
          <BoardColumn title="冲刺岗位" jobs={boardGroups.sprint} empty="当前暂无冲刺岗位" />
          <BoardColumn title="主投岗位" jobs={boardGroups.core} empty="当前暂无主投岗位" />
          <BoardColumn title="保底岗位" jobs={boardGroups.backup} empty="当前暂无保底岗位" />
        </div>
      </section>
    </main>
  )
}

function BoardColumn({
  title,
  jobs,
  empty,
}: {
  title: string
  jobs: Array<{ id: string; title: string; company: string; score: number }>
  empty: string
}) {
  return (
    <SpotlightSurface as="article" className="board-column cursor-target">
      <div className="board-head">
        <h3>{title}</h3>
        <span>{jobs.length} 个</span>
      </div>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.id} className="board-card">
            <strong>{job.title}</strong>
            <p>
              {job.company} · {job.score} 分
            </p>
          </div>
        ))
      ) : (
        <div className="board-card empty-card">{empty}</div>
      )}
    </SpotlightSurface>
  )
}
