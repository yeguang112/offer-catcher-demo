import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { buildResumeAudit, buildRewritePack, buildWeeklyPlan } from '../app/data'
import { useProfile } from '../app/use-profile'
import { generateResumeLabContent, type AIResumeResult } from '../app/ai-service'
import DecryptedText from '../components/interactions/DecryptedText'
import ShinyText from '../components/interactions/ShinyText'
import SpotlightSurface from '../components/interactions/SpotlightSurface'

type LabState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: AIResumeResult }
  | { status: 'error'; message: string }

export function ResumeLabPage() {
  const { profile, selectedJob } = useProfile()
  const [labState, setLabState] = useState<LabState>({ status: 'idle' })
  const [useAI, setUseAI] = useState(true)

  const runAI = useCallback(async () => {
    setLabState({ status: 'loading' })
    try {
      const data = await generateResumeLabContent(
        {
          name: profile.name,
          grade: profile.grade,
          major: profile.major,
          targetCity: profile.targetCity,
          targetRole: profile.targetRole,
          strengths: profile.strengths,
          interests: profile.interests,
          experienceTags: profile.experienceTags,
          resumeSignals: profile.resumeSignals,
          summary: profile.summary,
        },
        {
          id: selectedJob.id,
          title: selectedJob.title,
          company: selectedJob.company,
          city: selectedJob.city,
          type: selectedJob.type,
          salary: selectedJob.salary,
          tags: selectedJob.tags,
          strengthsWanted: selectedJob.strengthsWanted,
          interestsWanted: selectedJob.interestsWanted,
          experienceWanted: selectedJob.experienceWanted,
          jdKeywords: selectedJob.jdKeywords,
          challenge: selectedJob.challenge,
        },
      )
      setLabState({ status: 'success', data })
    } catch (err) {
      const message = err instanceof Error ? err.message : '未知错误'
      setLabState({ status: 'error', message })
    }
  }, [profile, selectedJob])

  useEffect(() => {
    if (useAI) {
      runAI()
    }
  }, [useAI, runAI])

  // 数据来源：AI 成功则用 AI，否则用 mock
  const audit =
    labState.status === 'success'
      ? {
          keywordCoverage: labState.data.audit.keywordCoverage,
          evidenceDensity: labState.data.audit.evidenceDensity,
          roleFocus: labState.data.audit.roleFocus,
          atsPassRate: labState.data.audit.atsPassRate,
          summary: labState.data.audit.summary,
          actions: labState.data.audit.actions,
        }
      : buildResumeAudit(profile, selectedJob)

  const rewritePack =
    labState.status === 'success'
      ? {
          before: labState.data.rewritePack.before,
          after: labState.data.rewritePack.after,
          bullets: labState.data.rewritePack.bullets,
        }
      : buildRewritePack(profile, selectedJob, audit)

  const weeklyPlan =
    labState.status === 'success'
      ? labState.data.weeklyPlan
      : buildWeeklyPlan(selectedJob, audit)

  const isAILoading = labState.status === 'loading'
  const isAIError = labState.status === 'error'
  const isAISuccess = labState.status === 'success'

  return (
    <main>
      {/* Hero 区域 */}
      <section className="section page-hero results-hero">
        <div className="page-hero-copy">
          <span className="section-kicker">
            <ShinyText text={isAISuccess ? 'AI 简历实验室' : '简历实验室'} />
          </span>
          <h1>
            <DecryptedText
              text={
                isAISuccess
                  ? 'AI 已为你定制简历优化方案'
                  : '先把简历改到像这个岗位的人，再去投递。'
              }
              revealDirection="center"
            />
          </h1>
          <p>
            当前目标岗位是 {selectedJob.company} 的 {selectedJob.title}。
            {isAISuccess
              ? '以下分析由 AI 根据你的画像和岗位 JD 实时生成。'
              : '这一页会把抽象建议翻译成具体表达、关键词动作和一周投递节奏。'}
          </p>

          <div className="hero-actions" style={{ gap: 12, flexWrap: 'wrap' as const }}>
            <Link to={`/jobs/${selectedJob.id}`} className="secondary-action">
              返回 JD 分析
            </Link>

            {!isAILoading && (
              <button
                className={`secondary-action ${useAI ? 'active' : ''}`}
                onClick={() => {
                  if (!useAI) {
                    setUseAI(true)
                  } else {
                    runAI()
                  }
                }}
                style={{
                  border: `1px solid ${useAI ? 'var(--accent)' : 'rgba(255,255,255,0.2)'}`,
                }}
              >
                {isAISuccess ? '🔄 重新生成 AI 方案' : '🤖 AI 定制分析'}
              </button>
            )}

            {isAIError && (
              <span style={{ fontSize: 12, color: '#ff8888', maxWidth: 280, display: 'inline-block' }}>
                AI 调用失败：{(labState as { status: 'error'; message: string }).message}。已展示模拟数据。
              </span>
            )}
          </div>
        </div>

        {/* ATS 命中率面板 */}
        <SpotlightSurface className="hero-panel compact-panel cursor-target">
          {isAILoading ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div className="ai-spinner small" style={{ margin: '0 auto' }} />
              <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 12, fontSize: 14 }}>
                AI 正在分析…
              </p>
            </div>
          ) : (
            <>
              <div className="hero-panel-header">
                <span>
                  {isAISuccess ? '🤖 AI 预估 ATS 命中率' : '当前简历命中率（模拟）'}
                </span>
                <strong>{audit.atsPassRate}%</strong>
              </div>
              <div className="lab-meter">
                <span
                  style={{
                    width: `${audit.atsPassRate}%`,
                    background:
                      audit.atsPassRate >= 80
                        ? '#4ade80'
                        : audit.atsPassRate >= 60
                        ? '#facc15'
                        : '#f87171',
                  }}
                />
              </div>
              <p>{audit.summary}</p>

              {isAISuccess && (
                <div
                  style={{
                    marginTop: 12,
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.5)',
                    display: 'flex',
                    gap: 16,
                    flexWrap: 'wrap' as const,
                  }}
                >
                  <span>关键词覆盖：{labState.data.audit.keywordCoverage}%</span>
                  <span>证据密度：{labState.data.audit.evidenceDensity}%</span>
                  <span>方向聚焦：{labState.data.audit.roleFocus}%</span>
                </div>
              )}
            </>
          )}
        </SpotlightSurface>
      </section>

      {/* Loading 全屏 */}
      {isAILoading && (
        <section className="section" style={{ textAlign: 'center', padding: '60px 0' }}>
          <div className="ai-loading-container">
            <div className="ai-spinner" />
            <h3 style={{ marginTop: 24, color: 'var(--accent)' }}>
              AI 正在分析你的简历与目标岗位
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>
              正在匹配 JD 关键词、计算 ATS 通过率、生成改写方案…
            </p>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 8 }}>
              通常耗时 5~15 秒，请稍候
            </p>
          </div>
        </section>
      )}

      {/* 表达改写 + 操作清单 */}
      {!isAILoading && (
        <section className="section insight-grid">
          <SpotlightSurface as="article" className="panel cursor-target">
            <div className="panel-header">
              <div>
                <span className="section-kicker">
                  {isAISuccess ? '🤖 AI 表达改写' : '表达改写'}
                </span>
                <h3>把"做过一些事"改成"我能胜任这份岗位"。</h3>
              </div>
              <strong>{profile.targetRole}</strong>
            </div>

            <div className="rewrite-grid">
              <div className="rewrite-card">
                <label>改写前</label>
                <p style={{ opacity: 0.8 }}>{rewritePack.before}</p>
              </div>
              <div className="rewrite-card highlight-card">
                <label>改写后（AI 定制）</label>
                <p>{rewritePack.after}</p>
              </div>
            </div>
          </SpotlightSurface>

          <SpotlightSurface as="article" className="panel cursor-target">
            <div className="panel-header">
              <div>
                <span className="section-kicker">
                  {isAISuccess ? '🤖 AI 操作清单' : '操作清单'}
                </span>
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
          </SpotlightSurface>
        </section>
      )}

      {/* 一周陪跑计划 */}
      {!isAILoading && (
        <section className="section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                <ShinyText
                  text={isAISuccess ? '🤖 AI 一周陪跑计划' : '一周陪跑计划'}
                  speed={4.1}
                />
              </span>
              <h2>
                {isAISuccess
                  ? 'AI 为你定制了接下来 7 天的求职行动计划。'
                  : '改完简历之后，系统继续告诉你下一步做什么。'}
              </h2>
            </div>
            <p>让工具从"分析器"变成"陪跑器"，这是求职体验里很重要的一层。</p>
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
      )}
    </main>
  )
}
