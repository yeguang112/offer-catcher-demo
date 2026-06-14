import { useEffect, useMemo, useRef, useState } from 'react'
import './TextType.css'

type TextTypeProps = {
  text: string | string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  initialDelay?: number
  loop?: boolean
  className?: string
  cursorCharacter?: string
}

export default function TextType({
  text,
  typingSpeed = 42,
  deletingSpeed = 22,
  pauseDuration = 1350,
  initialDelay = 220,
  loop = true,
  className = '',
  cursorCharacter = '_',
}: TextTypeProps) {
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text])
  const [displayedText, setDisplayedText] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const currentText = textArray[currentTextIndex] ?? ''
    const delay = currentCharIndex === 0 && !isDeleting && displayedText === '' ? initialDelay : isDeleting ? deletingSpeed : typingSpeed

    timeoutRef.current = window.setTimeout(() => {
      if (isDeleting) {
        if (displayedText.length === 0) {
          setIsDeleting(false)
          setCurrentTextIndex((index) => (index + 1) % textArray.length)
          setCurrentCharIndex(0)
          return
        }
        setDisplayedText((value) => value.slice(0, -1))
        return
      }

      if (currentCharIndex < currentText.length) {
        setDisplayedText((value) => value + currentText[currentCharIndex])
        setCurrentCharIndex((index) => index + 1)
        return
      }

      if (loop || currentTextIndex < textArray.length - 1) {
        timeoutRef.current = window.setTimeout(() => setIsDeleting(true), pauseDuration)
      }
    }, delay)

    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    }
  }, [currentCharIndex, currentTextIndex, deletingSpeed, displayedText, initialDelay, isDeleting, loop, pauseDuration, textArray, typingSpeed])

  return (
    <span className={`case-text-type ${className}`}>
      <span>{displayedText}</span>
      <i aria-hidden="true">{cursorCharacter}</i>
    </span>
  )
}
