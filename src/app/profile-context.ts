import { createContext } from 'react'
import type { CandidateProfile, MatchResult } from './types'

export type ProfileContextValue = {
  profile: CandidateProfile
  rankedJobs: MatchResult[]
  selectedJobId: string
  selectedJob: MatchResult
  getJdInput: (jobId: string) => string
  setProfile: (profile: CandidateProfile) => void
  selectPreset: (presetId: string) => void
  parseResumeText: (resumeText: string) => void
  applyQuizAnswers: (answers: Record<string, string>) => void
  selectJob: (jobId: string) => void
  setJdInput: (jobId: string, value: string) => void
}

export const ProfileContext = createContext<ProfileContextValue | undefined>(undefined)
