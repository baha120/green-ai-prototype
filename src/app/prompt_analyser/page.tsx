'use client'
import PromptAnalyzer from '@/components/PromptAnalyser'
import { JSX } from 'react'

export default function PromptAnalyzerPage(): JSX.Element {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Test your AI Prompt</h1>
      <p className="mb-6">
        Enter an AI prompt and get feedback about clarity, sustainability impact
        and ethical considerations.
      </p>
      <PromptAnalyzer />
    </section>
  )
}
