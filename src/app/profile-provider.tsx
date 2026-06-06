import { useMemo, useState } from 'react'
import { buildProfileFromQuiz, buildProfileFromResumeText, getDefaultJd, jobs, presets, scoreJob } from './data'
import { ProfileContext } from './profile-context'
import type { CandidateProfile, MatchResult } from './types'

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<CandidateProfile>(presets[0].profile)
  const [selectedJobId, setSelectedJobId] = useState(jobs[0].id)
  const [jdByJob, setJdByJob] = useState<Record<string, string>>(
    Object.fromEntries(jobs.map((job) => [job.id, getDefaultJd(job)])),
  )

  const rankedJobs = useMemo<MatchResult[]>(
    () => jobs.map((job) => scoreJob(profile, job)).sort((a, b) => b.score - a.score),
    [profile],
  )

  const selectedJob = rankedJobs.find((job) => job.id === selectedJobId) ?? rankedJobs[0]

  const selectJob = (jobId: string) => {
    setSelectedJobId(jobId)
  }

  const getJdInput = (jobId: string) => jdByJob[jobId] ?? getDefaultJd(jobs[0])

  const setJdInput = (jobId: string, value: string) => {
    setJdByJob((current) => ({
      ...current,
      [jobId]: value,
    }))
  }

  const selectPreset = (presetId: string) => {
    const preset = presets.find((item) => item.id === presetId)
    if (!preset) return
    setProfile(preset.profile)
    selectJob(jobs[0].id)
  }

  const parseResumeText = (resumeText: string) => {
    setProfile(buildProfileFromResumeText(resumeText))
    selectJob(jobs[0].id)
  }

  const applyQuizAnswers = (answers: Record<string, string>) => {
    setProfile(buildProfileFromQuiz(answers))
    selectJob(jobs[0].id)
  }

  const value = {
    profile,
    rankedJobs,
    selectedJobId,
    selectedJob,
    getJdInput,
    setProfile,
    selectPreset,
    parseResumeText,
    applyQuizAnswers,
    selectJob,
    setJdInput,
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}
