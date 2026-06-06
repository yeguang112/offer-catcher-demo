import type { MatchResult } from '../app/types'

export function MatchCard({
  job,
  active,
  onClick,
}: {
  job: MatchResult
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button type="button" className={`job-card ${active ? 'active' : ''}`} onClick={onClick}>
      <div className="job-card-top">
        <div>
          <h4>{job.title}</h4>
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
  )
}
