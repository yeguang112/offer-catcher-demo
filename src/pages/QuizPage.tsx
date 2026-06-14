import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildProfileFromQuiz, quizQuestions } from '../app/data'
import type { QuizQuestion } from '../app/types'
import { useProfile } from '../app/use-profile'
import DecryptedText from '../components/interactions/DecryptedText'
import ShinyText from '../components/interactions/ShinyText'
import SpotlightSurface from '../components/interactions/SpotlightSurface'

const questionMap = new Map(quizQuestions.map((question) => [question.id, question]))
const firstQuestionId = 'root'
const finalQuestionId = 'city'
const isQuestion = (question: QuizQuestion | undefined): question is QuizQuestion => Boolean(question)

export function QuizPage() {
  const navigate = useNavigate()
  const { applyQuizAnswers } = useProfile()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [path, setPath] = useState<string[]>([firstQuestionId])
  const [currentStep, setCurrentStep] = useState(0)

  const currentQuestion = questionMap.get(path[currentStep]) ?? quizQuestions[0]
  const selectedValue = answers[currentQuestion.id]
  const selectedOption = currentQuestion.options.find((option) => option.value === selectedValue)
  const currentPathQuestions = path.map((id) => questionMap.get(id)).filter(isQuestion)
  const previewProfile = useMemo(() => buildProfileFromQuiz(answers), [answers])
  const answeredCount = currentPathQuestions.filter((question) => answers[question.id]).length
  const progress = Math.round((answeredCount / Math.max(path.length, 1)) * 100)
  const isFinalAnswered = currentQuestion.id === finalQuestionId && Boolean(selectedOption)

  const chooseAnswer = (value: string) => {
    const option = currentQuestion.options.find((item) => item.value === value)
    const keptPath = path.slice(0, currentStep + 1)
    const nextPath = option?.next ? [...keptPath, option.next] : keptPath
    const validIds = new Set(nextPath)

    setAnswers((current) => {
      const nextAnswers = Object.fromEntries(
        Object.entries(current).filter(([questionId]) => validIds.has(questionId)),
      )
      nextAnswers[currentQuestion.id] = value
      return nextAnswers
    })
    setPath(nextPath)
  }

  const goNext = () => {
    if (!selectedOption) return

    if (isFinalAnswered || !selectedOption.next) {
      applyQuizAnswers(answers)
      navigate('/results')
      return
    }

    setCurrentStep((step) => Math.min(step + 1, path.length - 1))
  }

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0))
  }

  return (
    <main>
      <section className="quiz-shell section">
        <SpotlightSurface as="article" className="quiz-focus panel cursor-target">
          <div className="quiz-progress-line">
            <span>
              决策树第 {currentStep + 1} 步 · 已回答 {answeredCount} 题
            </span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="quiz-question-block">
            <span className="section-kicker"><ShinyText text="职业方向决策树" /></span>
            <h1>
              <DecryptedText key={currentQuestion.id} text={currentQuestion.prompt} revealDirection="center" />
            </h1>
            <p>{currentQuestion.helper ?? '选一个最像你的答案，系统会继续追问更关键的问题。'}</p>
          </div>

          <div className="option-list option-list-large">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`option-card ${selectedValue === option.value ? 'selected' : ''}`}
                onClick={() => chooseAnswer(option.value)}
              >
                <strong>{option.label}</strong>
                {option.detail ? <span>{option.detail}</span> : null}
              </button>
            ))}
          </div>

          <div className="quiz-actions">
            <button type="button" className="secondary-action button-reset" disabled={currentStep === 0} onClick={goBack}>
              上一步
            </button>
            <button type="button" className="primary-action button-reset" disabled={!selectedOption} onClick={goNext}>
              {isFinalAnswered ? '生成画像并查看岗位' : '继续追问'}
            </button>
          </div>
        </SpotlightSurface>

        <SpotlightSurface className="panel quiz-side cursor-target">
          <span className="section-kicker"><ShinyText text="画像预览" speed={4} /></span>
          <h3>{previewProfile.targetRole}</h3>
          <p>{previewProfile.summary}</p>

          <div className="profile-mini-grid">
            <div>
              <label>目标城市</label>
              <strong>{previewProfile.targetCity}</strong>
            </div>
            <div>
              <label>当前倾向</label>
              <strong>{previewProfile.targetRole}</strong>
            </div>
          </div>

          <div className="decision-note">
            <strong>这不是固定问卷</strong>
            <p>每次选择都会决定下一题。偏技术会追问调试与工程，偏 HR 会追问沟通和数据，偏产品会追问优先级，偏测试会追问证据链。</p>
          </div>

          <div className="answer-stack">
            {currentPathQuestions.map((question, index) => {
              const selected = question.options.find((option) => option.value === answers[question.id])
              return (
                <button
                  key={question.id}
                  type="button"
                  className={`answer-dot ${index === currentStep ? 'active' : ''} ${selected ? 'done' : ''}`}
                  onClick={() => setCurrentStep(index)}
                >
                  <span>Q{index + 1}</span>
                  <strong>{selected?.label ?? question.prompt}</strong>
                </button>
              )
            })}
          </div>
        </SpotlightSurface>
      </section>
    </main>
  )
}
