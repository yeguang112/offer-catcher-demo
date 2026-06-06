import type { CSSProperties } from 'react'

export function ScoreRing({ score }: { score: number }) {
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
