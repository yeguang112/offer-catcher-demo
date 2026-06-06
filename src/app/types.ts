export type CandidateProfile = {
  name: string
  grade: string
  major: string
  targetCity: string
  targetRole: string
  strengths: string[]
  interests: string[]
  experienceTags: string[]
  resumeSignals: string[]
  summary: string
}

export type CareerRole = '技术岗' | 'HR职能' | '产品经理' | '测试岗'

export type ProfilePreset = {
  id: string
  label: string
  subtitle: string
  profile: CandidateProfile
}

export type JobRole = {
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

export type MatchResult = JobRole & {
  score: number
  matchReasons: string[]
  gapReasons: string[]
  keywordCoverage: number
}

export type ResumeAudit = {
  keywordCoverage: number
  evidenceDensity: number
  roleFocus: number
  atsPassRate: number
  summary: string
  actions: string[]
}

export type JdInsight = {
  activeKeywords: string[]
  hitKeywords: string[]
  missingKeywords: string[]
  recommendation: string
}

export type RewritePack = {
  before: string
  after: string
  bullets: string[]
}

export type QuizQuestion = {
  id: string
  prompt: string
  helper?: string
  dimension: 'orientation' | 'tech' | 'people' | 'product' | 'quality' | 'city' | 'workstyle'
  options: Array<{
    label: string
    detail?: string
    value: string
    next?: string
    roleScore?: Partial<Record<CareerRole, number>>
    city?: string
  }>
}
