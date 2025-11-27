'use client'
import React, { useState } from 'react'

type Question = {
  id: number
  title: string
  options: string[]
  correctIndex: number
  explanation: string
  scoreValue?: number
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title:
      'How much water (approx.) can a single AI image generation consume (indirectly through data center cooling)?',
    options: ['1 liter', '5–10 liters', '30 liters', '100 liters'],
    correctIndex: 1,
    explanation:
      'Estimates vary but 5–10 liters is a commonly cited ballpark for a single heavy generation when accounting for infrastructure cooling and energy production.',
  },
  {
    id: 2,
    title: 'Which factor most increases the carbon footprint of an AI task?',
    options: [
      'Using higher resolution',
      'More model parameters / larger model',
      'ANSWER 3',
      'Using a laptop instead of cloud',
    ],
    correctIndex: 1,
    explanation:
      'Larger models (more parameters) and longer compute times usually dominate energy consumption.',
  },
  {
    id: 3,
    title: 'What helps reduce the environmental impact of AI?',
    options: [
      'Requesting many variations',
      'Using concise, clear prompts',
      'Always preferring high-res outputs',
      'Ignoring compute budgets',
    ],
    correctIndex: 1,
    explanation:
      'Concise prompts reduce back-and-forth and unnecessary compute.',
  },
]

export default function ConsumeGame() {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const q = QUESTIONS[index]

  function submit() {
    if (selected === null) return
    const correct = selected === q.correctIndex
    setShowAnswer(true)
    if (correct) setScore(q.scoreValue ?? 10)
  }

  function next() {
    setSelected(null)
    setShowAnswer(false)
    setIndex((i) => Math.min(QUESTIONS.length - 1, i + 1))
  }

  return (
    <div className="space-y-4">
      <div className="p-4 rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <h3 className="font-semibold">
          Question {index + 1} of {QUESTIONS.length}
        </h3>
        <p className="mt-2">{q.title}</p>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`text-left p-3 rounded border dark:border-gray-700 ${
                selected === i ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={submit}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Submit
          </button>
          <div className="px-4 py-2 rounded border dark:border-gray-700">
            Score: {score}
          </div>
        </div>

        {showAnswer && (
          <div className="mt-4 p-3 rounded bg-white dark:bg-gray-900 border dark:border-gray-700">
            <div className="font-semibold">
              Answer: {q.options[q.correctIndex]}
            </div>
            <p className="mt-2 text-sm">{q.explanation}</p>
            <div className="mt-2 text-xs">
              Tip: After answering you can press Next Question.
            </div>
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={next}
            className="px-4 py-2 rounded border dark:border-gray-700"
          >
            Next Question
          </button>
        </div>
      </div>

      <div className="p-4 text-sm text-gray-600 dark:text-gray-300">
        After finishing the quiz, students can compare scores and reflect on how
        to craft efficient prompts and reduce AI resource consumption.
      </div>
    </div>
  )
}
