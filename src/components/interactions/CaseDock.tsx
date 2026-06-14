import { NavLink } from 'react-router-dom'
import './CaseDock.css'

const dockItems = [
  { to: '/quest', code: 'Q', label: '求职副本' },
  { to: '/intake/upload', code: 'CV', label: '上传简历' },
  { to: '/intake/quiz', code: 'MBTI', label: '画像测评' },
  { to: '/results', code: 'MATCH', label: '匹配看板' },
]

export default function CaseDock() {
  return (
    <aside className="case-dock" aria-label="求职档案抽屉">
      {dockItems.map((item) => (
        <NavLink key={item.to} to={item.to}>
          <span>{item.code}</span>
          <strong>{item.label}</strong>
        </NavLink>
      ))}
    </aside>
  )
}
