import type { CSSProperties } from 'react'
import './ShinyText.css'

type ShinyTextProps = {
  text: string
  className?: string
  speed?: number
  delay?: number
  color?: string
  shineColor?: string
  spread?: number
}

export default function ShinyText({
  text,
  className = '',
  speed = 3.2,
  delay = 0,
  color = 'rgba(46, 37, 27, 0.62)',
  shineColor = '#0f1217',
  spread = 115,
}: ShinyTextProps) {
  return (
    <span
      className={`oc-shiny-text ${className}`}
      style={{
        '--oc-shine-speed': `${speed}s`,
        '--oc-shine-delay': `${delay}s`,
        '--oc-shine-color': color,
        '--oc-shine-highlight': shineColor,
        '--oc-shine-spread': `${spread}deg`,
      } as CSSProperties}
    >
      {text}
    </span>
  )
}
