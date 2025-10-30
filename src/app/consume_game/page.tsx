'use client'
import ConsumeGame from '@/components/ConsumeGame'
import { JSX } from 'react'

export default function ConsumeGamePage(): JSX.Element {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">
        The Consume Game — Guess the Cost of AI
      </h1>
      <p className="mb-6">
        Interactive quiz: estimate the resource costs (energy, water, CO₂) of
        common AI activities.
      </p>
      <ConsumeGame />
    </section>
  )
}
