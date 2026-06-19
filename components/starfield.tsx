"use client"

import { useEffect, useState } from "react"

type Star = {
  top: string
  left: string
  size: number
  opacity: number
}

export function Starfield({ count = 60 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generated = Array.from({ length: count }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() < 0.85 ? 1 : 2,
      opacity: 0.15 + Math.random() * 0.45,
    }))
    setStars(generated)
  }, [count])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}
