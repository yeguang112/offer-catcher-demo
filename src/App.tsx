import { Navigate, Route, Routes } from 'react-router-dom'
import { ProfileProvider } from './app/profile-provider'
import { AppShell } from './components/AppShell'
import { JobDetailPage } from './pages/JobDetailPage'
import { LandingPage } from './pages/LandingPage'
import { QuizPage } from './pages/QuizPage'
import { QuestSimulatorPage } from './pages/QuestSimulatorPage'
import { ResultsPage } from './pages/ResultsPage'
import { ResumeLabPage } from './pages/ResumeLabPage'
import { UploadResumePage } from './pages/UploadResumePage'
import './App.css'

function App() {
  return (
    <ProfileProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/intake/upload" element={<UploadResumePage />} />
          <Route path="/intake/quiz" element={<QuizPage />} />
          <Route path="/quest" element={<QuestSimulatorPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailPage />} />
          <Route path="/resume-lab" element={<ResumeLabPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ProfileProvider>
  )
}

export default App
