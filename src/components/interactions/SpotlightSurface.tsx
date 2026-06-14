import type { CSSProperties, FormEventHandler, PointerEvent, ReactNode } from 'react'
import './SpotlightSurface.css'

type SpotlightSurfaceProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'section' | 'form'
  onSubmit?: FormEventHandler<HTMLFormElement>
}

type SpotlightStyle = CSSProperties & {
  '--oc-spot-x': string
  '--oc-spot-y': string
}

export default function SpotlightSurface({ children, className = '', as = 'div', onSubmit }: SpotlightSurfaceProps) {
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--oc-spot-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--oc-spot-y', `${event.clientY - rect.top}px`)
  }

  const style = { '--oc-spot-x': '50%', '--oc-spot-y': '50%' } as SpotlightStyle
  const classes = `oc-spotlight-surface ${className}`

  if (as === 'form') {
    return (
      <form className={classes} style={style} onPointerMove={handlePointerMove} onSubmit={onSubmit}>
        {children}
      </form>
    )
  }

  if (as === 'section') {
    return (
      <section className={classes} style={style} onPointerMove={handlePointerMove}>
        {children}
      </section>
    )
  }

  if (as === 'article') {
    return (
      <article className={classes} style={style} onPointerMove={handlePointerMove}>
        {children}
      </article>
    )
  }

  return (
    <div className={classes} style={style} onPointerMove={handlePointerMove}>
      {children}
    </div>
  )
}
