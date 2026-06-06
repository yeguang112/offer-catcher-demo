import { Link } from 'react-router-dom'
import { workflowSteps } from '../app/data'

export function StepRail({ currentStep }: { currentStep: string }) {
  return (
    <div className="flow-list">
      {workflowSteps.map((step, index) => (
        <Link
          key={step.id}
          to={step.to}
          className={`flow-item ${currentStep === step.id ? 'active' : ''}`}
        >
          <div className="flow-index">0{index + 1}</div>
          <div>
            <strong>{step.label}</strong>
            <p>{step.detail}</p>
          </div>
          <span className="flow-arrow">进入</span>
        </Link>
      ))}
    </div>
  )
}
