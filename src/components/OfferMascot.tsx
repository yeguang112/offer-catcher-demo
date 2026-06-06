import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import offerCat from '../assets/offer-cat.svg'

type CatClickEffect = {
  id: number
  x: number
  y: number
  originX: number
  originY: number
  tailPath: string
  interactive: boolean
}

type Point = {
  x: number
  y: number
}

const point = (x: number, y: number): Point => ({ x, y })

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const add = (a: Point, b: Point) => point(a.x + b.x, a.y + b.y)

const subtract = (a: Point, b: Point) => point(a.x - b.x, a.y - b.y)

const multiply = (item: Point, value: number) => point(item.x * value, item.y * value)

const normalize = (item: Point, fallback = point(1, 0)) => {
  const length = Math.hypot(item.x, item.y)

  if (length < 0.001) return fallback

  return point(item.x / length, item.y / length)
}

const perpendicular = (item: Point) => point(-item.y, item.x)

const formatPoint = (item: Point) => `${item.x.toFixed(1)} ${item.y.toFixed(1)}`

const curveThrough = (items: Point[], shouldMove: boolean) => {
  if (items.length === 0) return ''
  if (items.length === 1) return shouldMove ? `M ${formatPoint(items[0])}` : ''

  const commands = shouldMove ? [`M ${formatPoint(items[0])}`] : []
  const tension = 0.16

  for (let index = 0; index < items.length - 1; index += 1) {
    const p0 = items[Math.max(0, index - 1)]
    const p1 = items[index]
    const p2 = items[index + 1]
    const p3 = items[Math.min(items.length - 1, index + 2)]
    const controlA = add(p1, multiply(subtract(p2, p0), tension))
    const controlB = subtract(p2, multiply(subtract(p3, p1), tension))

    commands.push(`C ${formatPoint(controlA)} ${formatPoint(controlB)} ${formatPoint(p2)}`)
  }

  return commands.join(' ')
}

const buildTailPath = (start: Point, end: Point) => {
  const firstVector = subtract(end, start)
  const firstLength = Math.max(Math.hypot(firstVector.x, firstVector.y), 1)
  const firstDirection = normalize(firstVector)
  const rootOverlap = clamp(firstLength * 0.04, 14, 34)
  const root = subtract(start, multiply(firstDirection, rootOverlap))
  const dx = end.x - root.x
  const dy = end.y - root.y
  const length = Math.max(Math.hypot(dx, dy), 1)
  const ux = dx / length
  const uy = dy / length
  const nx = -uy
  const ny = ux
  const side = Math.random() > 0.5 ? 1 : -1
  const bend = clamp(length * randomBetween(0.1, 0.17), 22, 126)
  const curveType = ['wide-s', 'lazy-s', 'reverse-s', 'soft-hook-s'][Math.floor(Math.random() * 4)]
  const primary = randomBetween(0.42, 0.62)
  const secondary = randomBetween(0.14, 0.28)
  const tertiary = randomBetween(0.04, 0.1)
  const smoothS = (t: number) => {
    if (curveType === 'lazy-s') {
      return Math.sin(Math.PI * 2 * t) * (primary * 0.72) + Math.sin(Math.PI * t) * secondary
    }

    if (curveType === 'reverse-s') {
      return Math.sin(Math.PI * 2 * t) * -primary + Math.sin(Math.PI * t) * (secondary * 0.68)
    }

    if (curveType === 'soft-hook-s') {
      return Math.sin(Math.PI * 2 * t) * (primary * 0.72) + Math.sin(Math.PI * t) * (secondary * 1.3)
    }

    return Math.sin(Math.PI * 2 * t) * primary + Math.sin(Math.PI * 3 * t) * tertiary
  }
  const sampleCount = clamp(Math.round(length / 20), 24, 42)
  const centerline = Array.from({ length: sampleCount + 1 }, (_, index) => {
    const t = index / sampleCount
    const lateral = side * bend * smoothS(t)

    return point(root.x + ux * length * t + nx * lateral, root.y + uy * length * t + ny * lateral)
  })

  const left: Point[] = []
  const right: Point[] = []
  const widths: number[] = []
  const startWidth = clamp(length * 0.018, 7, 12)
  const endWidth = clamp(length * 0.058, 26, 52)

  centerline.forEach((center, index) => {
    const t = index / Math.max(centerline.length - 1, 1)
    const before = centerline[Math.max(0, index - 1)]
    const after = centerline[Math.min(centerline.length - 1, index + 1)]
    const tangent = normalize(subtract(after, before), point(ux, uy))
    const normal = perpendicular(tangent)
    const eased = 1 - Math.pow(1 - t, 1.62)
    const width = startWidth + (endWidth - startWidth) * eased
    const half = width / 2

    widths.push(width)
    left.push(point(center.x + normal.x * half, center.y + normal.y * half))
    right.push(point(center.x - normal.x * half, center.y - normal.y * half))
  })

  const leftPath = curveThrough(left, true)
  const endIndex = centerline.length - 1
  const endCenter = centerline[endIndex]
  const endTangent = normalize(subtract(centerline[endIndex], centerline[Math.max(0, endIndex - 1)]), point(ux, uy))
  const endNormal = perpendicular(endTangent)
  const endHalf = widths[endIndex] / 2
  const capRatio = 0.5522847498
  const endTip = add(endCenter, multiply(endTangent, endHalf))
  const leftEnd = left[endIndex]
  const rightEnd = right[right.length - 1]
  const endCap = [
    `C ${formatPoint(add(leftEnd, multiply(endTangent, endHalf * capRatio)))} ${formatPoint(add(endTip, multiply(endNormal, endHalf * capRatio)))} ${formatPoint(endTip)}`,
    `C ${formatPoint(subtract(endTip, multiply(endNormal, endHalf * capRatio)))} ${formatPoint(add(rightEnd, multiply(endTangent, endHalf * capRatio)))} ${formatPoint(rightEnd)}`,
  ].join(' ')
  const rightPath = curveThrough([rightEnd, ...right.slice(0, -1).reverse()], false)
  const rootCenter = centerline[0]
  const rootTangent = normalize(subtract(centerline[1] ?? end, centerline[0]), point(ux, uy))
  const rootNormal = perpendicular(rootTangent)
  const rootHalf = widths[0] / 2
  const rootBack = subtract(rootCenter, multiply(rootTangent, rootHalf))
  const rightRoot = right[0]
  const leftRoot = left[0]
  const rootCap = [
    `C ${formatPoint(subtract(rightRoot, multiply(rootTangent, rootHalf * capRatio)))} ${formatPoint(subtract(rootBack, multiply(rootNormal, rootHalf * capRatio)))} ${formatPoint(rootBack)}`,
    `C ${formatPoint(add(rootBack, multiply(rootNormal, rootHalf * capRatio)))} ${formatPoint(subtract(leftRoot, multiply(rootTangent, rootHalf * capRatio)))} ${formatPoint(leftRoot)}`,
  ].join(' ')

  return `${leftPath} ${endCap} ${rightPath} ${rootCap} Z`
}

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
  const mascotRef = useRef<HTMLAnchorElement>(null)
  const previousPath = useRef(pathname)
  const clickEffectId = useRef(0)
  const [isMoving, setIsMoving] = useState(false)
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(() => window.scrollY > 260)
  const [clickEffects, setClickEffects] = useState<CatClickEffect[]>([])
  const config = routeMascot.find((item) => item.test(pathname)) ?? routeMascot[0]
  const isHome = config.variant === 'home'
  const isDocked = isHome && hasScrolledPastHero

  useEffect(() => {
    if (previousPath.current === pathname) return

    previousPath.current = pathname
    setClickEffects([])
    setIsMoving(true)
    const timer = window.setTimeout(() => setIsMoving(false), 720)

    return () => window.clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    const updateDock = () => {
      setHasScrolledPastHero(window.scrollY > 260)
    }

    window.addEventListener('scroll', updateDock, { passive: true })

    return () => window.removeEventListener('scroll', updateDock)
  }, [])

  useEffect(() => {
    const isInteractiveTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false

      return Boolean(
        target.closest(
          'a, button, input, textarea, select, [role="button"], .primary-action, .secondary-action, .option-card, .quest-choice, .quest-mini-node, .answer-dot, .job-card, .sample-card, .route-card',
        ),
      )
    }

    const isRouteTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false

      return Boolean(target.closest('.topbar, .topnav, a[href]'))
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return

      const mascotBox = mascotRef.current?.getBoundingClientRect()
      if (!mascotBox) return
      if (event.target instanceof Node && mascotRef.current?.contains(event.target)) return
      if (isRouteTarget(event.target)) {
        setClickEffects([])
        return
      }

      const startX = mascotBox.left + mascotBox.width * 0.52
      const startY = mascotBox.top + mascotBox.height * 0.58
      const endX = event.clientX
      const endY = event.clientY
      const id = clickEffectId.current + 1
      clickEffectId.current = id

      const effect: CatClickEffect = {
        id,
        x: endX,
        y: endY,
        originX: startX,
        originY: startY,
        tailPath: buildTailPath(point(startX, startY), point(endX, endY)),
        interactive: isInteractiveTarget(event.target),
      }

      setClickEffects((current) => [...current.slice(-4), effect])
      window.setTimeout(() => {
        setClickEffects((current) => current.filter((item) => item.id !== id))
      }, 760)
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  return (
    <>
      <Link
        ref={mascotRef}
        to={config.to}
        className={`offer-mascot offer-mascot--${config.variant} ${isMoving ? 'offer-mascot--moving' : ''} ${
          isDocked ? 'offer-mascot--docked' : ''
        }`}
        aria-label={config.label}
      >
        <img src={offerCat} alt="" aria-hidden="true" />
        <span>{config.label}</span>
      </Link>

      <div className="cat-click-layer" aria-hidden="true">
        <svg className="cat-click-svg" viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`} preserveAspectRatio="none">
          {clickEffects.map((effect) => (
            <path
              key={`tail-${effect.id}`}
              className="cat-tail-strike"
              d={effect.tailPath}
              style={{ transformOrigin: `${effect.originX}px ${effect.originY}px` }}
            />
          ))}
        </svg>
        {clickEffects.map((effect) => (
          <span
            key={`hit-${effect.id}`}
            className={`cat-hit-mark ${effect.interactive ? 'cat-hit-mark--interactive' : ''}`}
            style={{ left: effect.x, top: effect.y }}
          />
        ))}
      </div>
    </>
  )
}
