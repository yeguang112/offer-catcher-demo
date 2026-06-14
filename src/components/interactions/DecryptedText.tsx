import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './DecryptedText.css'

type DecryptedTextProps = {
  text: string
  speed?: number
  maxIterations?: number
  sequential?: boolean
  revealDirection?: 'start' | 'end' | 'center'
  characters?: string
  className?: string
  encryptedClassName?: string
  animateOn?: 'view' | 'hover' | 'click'
}

function buildOrder(length: number, direction: 'start' | 'end' | 'center') {
  if (direction === 'end') return Array.from({ length }, (_, index) => length - index - 1)
  if (direction === 'center') {
    const middle = Math.floor(length / 2)
    const order: number[] = []
    for (let offset = 0; order.length < length; offset += 1) {
      const right = middle + offset
      const left = middle - offset - 1
      if (right < length) order.push(right)
      if (left >= 0) order.push(left)
    }
    return order
  }
  return Array.from({ length }, (_, index) => index)
}

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 9,
  sequential = true,
  revealDirection = 'start',
  characters = 'OFFERAI求职岗位简历面试匹配1234567890',
  className = '',
  encryptedClassName = 'oc-encrypted',
  animateOn = 'view',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLSpanElement | null>(null)
  const orderRef = useRef<number[]>([])
  const pointerRef = useRef(0)
  const iterationRef = useRef(0)
  const revealedRef = useRef(new Set<number>())
  const characterList = useMemo(() => Array.from(characters), [characters])

  const scramble = useCallback(
    (revealed: Set<number>) => {
      return Array.from(text)
        .map((char, index) => {
          if (char.trim() === '') return char
          if (revealed.has(index)) return char
          return characterList[Math.floor(Math.random() * characterList.length)] ?? char
        })
        .join('')
    },
    [characterList, text],
  )

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsAnimating(false)
  }, [])

  const start = useCallback(() => {
    if (isAnimating) return
    stop()
    orderRef.current = buildOrder(text.length, revealDirection)
    pointerRef.current = 0
    iterationRef.current = 0
    revealedRef.current = new Set()
    setIsAnimating(true)

    intervalRef.current = window.setInterval(() => {
      if (sequential) {
        const next = orderRef.current[pointerRef.current]
        if (typeof next === 'number') {
          revealedRef.current.add(next)
          pointerRef.current += 1
          setDisplayText(scramble(revealedRef.current))
          return
        }
      } else if (iterationRef.current < maxIterations) {
        iterationRef.current += 1
        setDisplayText(scramble(revealedRef.current))
        return
      }

      setDisplayText(text)
      setHasAnimated(true)
      stop()
    }, speed)
  }, [isAnimating, maxIterations, revealDirection, scramble, sequential, speed, stop, text])

  useEffect(() => stop, [stop])

  useEffect(() => {
    if (animateOn !== 'view') return undefined
    const element = containerRef.current
    if (!element) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) start()
      },
      { threshold: 0.35 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [animateOn, hasAnimated, start])

  const eventProps =
    animateOn === 'hover'
      ? { onMouseEnter: start, onFocus: start }
      : animateOn === 'click'
        ? { onClick: start }
        : {}

  return (
    <span className="oc-decrypted-text" ref={containerRef} {...eventProps}>
      <span className="oc-sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(displayText).map((character, index) => (
          <span className={character === text[index] ? className : encryptedClassName} key={`${character}-${index}`}>
            {character}
          </span>
        ))}
      </span>
    </span>
  )
}
