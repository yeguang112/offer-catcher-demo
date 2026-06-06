import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import offerCat from '../assets/offer-cat.svg'

const routeMascot = [
  {
    test: (pathname: string) => pathname === '/',
    variant: 'home',
    label: '点我开副本',
    to: '/quest',
  },
  {
    test: (pathname: string) => pathname.startsWith('/quest'),
    variant: 'quest',
    label: '我在记录选择',
    to: '/intake/upload',
  },
  {
    test: (pathname: string) => pathname.startsWith('/intake/upload'),
    variant: 'upload',
    label: '简历放这里',
    to: '/intake/quiz',
  },
  {
    test: (pathname: string) => pathname.startsWith('/intake/quiz'),
    variant: 'quiz',
    label: '继续追问一下',
    to: '/results',
  },
  {
    test: (pathname: string) => pathname.startsWith('/results'),
    variant: 'results',
    label: '看优先级',
    to: '/resume-lab',
  },
  {
    test: (pathname: string) => pathname.startsWith('/resume-lab'),
    variant: 'lab',
    label: '改写更锋利',
    to: '/results',
  },
  {
    test: (pathname: string) => pathname.startsWith('/jobs'),
    variant: 'job',
    label: '拆 JD',
    to: '/resume-lab',
  },
]

export function OfferMascot() {
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)
  const [isMoving, setIsMoving] = useState(false)
  const config = routeMascot.find((item) => item.test(pathname)) ?? routeMascot[0]

  useEffect(() => {
    if (previousPath.current === pathname) return

    previousPath.current = pathname
    setIsMoving(true)
    const timer = window.setTimeout(() => setIsMoving(false), 720)

    return () => window.clearTimeout(timer)
  }, [pathname])

  return (
    <Link
      to={config.to}
      className={`offer-mascot offer-mascot--${config.variant} ${isMoving ? 'offer-mascot--moving' : ''}`}
      aria-label={config.label}
    >
      <img src={offerCat} alt="" aria-hidden="true" />
      <span>{config.label}</span>
    </Link>
  )
}
