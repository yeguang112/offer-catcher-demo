import { Link, NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: '首页' },
  { to: '/intake/upload', label: '上传简历' },
  { to: '/intake/quiz', label: '画像测评' },
  { to: '/results', label: '匹配看板' },
  { to: '/resume-lab', label: '简历实验室' },
]

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <Link to="/" className="brand" aria-label="Offer Catcher 首页">
            <span className="brand-mark">OC</span>
            <span className="brand-copy">
              <strong>Offer Catcher</strong>
              <small>学生求职工作台</small>
            </span>
          </Link>

          <nav className="topnav" aria-label="主导航">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <Outlet />
    </div>
  )
}
