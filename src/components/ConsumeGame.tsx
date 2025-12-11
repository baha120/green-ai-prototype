'use client'
import React, { useEffect, useState } from 'react'
import cn from 'clsx'
import { CrossIcon } from './CrossIcon'
import { CheckmarkIcon } from './CheckmarkIcon'
import { useConsumeGameContext } from '@/utils/contexts/ConsumeGameProvider'
import shuffleArray from '@/utils/shuffleArray'

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
      'Running the model multiple times unnecessarily',
      'More model parameters / larger model',
      'Using a laptop instead of cloud',
    ],
    correctIndex: 2,
    explanation:
      'Larger models (more parameters) and longer compute times usually dominate energy consumption.',
  },
  {
    id: 3,
    title: 'What helps reduce the environmental impact of AI?',
    options: [
      'Requesting many variations',
      'Always preferring high-res outputs',
      'Ignoring compute budgets',
      'Using concise, clear prompts',
    ],
    correctIndex: 3,
    explanation:
      'Concise prompts reduce back-and-forth and unnecessary compute.',
  },
  {
    id: 4,
    title: 'Which action reduces energy usage when generating AI images?',
    options: [
      'Using fewer inference steps',
      'Using the maximum quality settings',
      'Running the model repeatedly to compare results',
      'Using unnecessarily large canvas sizes',
    ],
    correctIndex: 0,
    explanation:
      'Fewer inference steps shorten compute time and reduce energy consumption.',
  },
  {
    id: 5,
    title: 'What is a good practice when prompting large language models?',
    options: [
      'Adding irrelevant details to be safe',
      'Repeating the same instruction multiple times',
      'Keeping prompts concise and focused',
      'Combining many unrelated tasks into one prompt',
    ],
    correctIndex: 2,
    explanation:
      'Clear, focused prompts improve efficiency and reduce unnecessary compute.',
  },
  {
    id: 6,
    title: 'Which scenario likely consumes the most compute?',
    options: [
      'Generating a short text summary',
      'Classifying a short sentence',
      'Correcting a small typo',
      'Running a large model for multi-step reasoning',
    ],
    correctIndex: 3,
    explanation:
      'Complex multi-step reasoning requires more inference time and thus more compute.',
  },
  {
    id: 7,
    title: 'How can developers reduce the energy impact of AI applications?',
    options: [
      'Increasing model size constantly',
      'Ignoring latency constraints',
      'Using model distillation or smaller models',
      'Running all tasks on maximum settings',
    ],
    correctIndex: 2,
    explanation:
      'Smaller or distilled models are more compute-efficient with similar performance.',
  },
  {
    id: 8,
    title: 'What is an example of unnecessary compute overhead?',
    options: [
      'Batching repeated tasks',
      'Caching results for reuse',
      'Regenerating the same output multiple times without need',
      'Optimizing preprocessing pipelines',
    ],
    correctIndex: 2,
    explanation: 'Regenerating unchanged outputs wastes compute and energy.',
  },
  {
    id: 9,
    title: 'Which factor most affects the energy cost of training a model?',
    options: [
      'The color theme of your code editor',
      'Whether the code editor is in fullscreen mode',
      'The number of training epochs and dataset size',
      'The developer’s operating system',
    ],
    correctIndex: 2,
    explanation:
      'Training cost scales strongly with dataset size and number of epochs.',
  },
  {
    id: 10,
    title: 'What is an eco-friendly strategy for deploying AI systems?',
    options: [
      'Running the largest model available for all tasks',
      'Avoiding resource usage monitoring',
      'Choosing servers powered by renewable energy',
      'Running all workloads locally regardless of efficiency',
    ],
    correctIndex: 2,
    explanation:
      'Renewable-energy-powered infrastructure reduces carbon footprint significantly.',
  },
]

export default function ConsumeGame() {
  const { score, setScore } = useConsumeGameContext()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const q = QUESTIONS[index]

  const [shuffledOptions, setShuffledOptions] = React.useState<
    { text: string; originalIndex: number }[]
  >(() => {
    return shuffleArray(
      q.options.map((opt, i) => ({
        text: opt,
        originalIndex: i,
      }))
    )
  })

  useEffect(() => {
    setShuffledOptions(
      shuffleArray(
        q.options.map((opt, i) => ({
          text: opt,
          originalIndex: i,
        }))
      )
    )
  }, [index])

  const newCorrectIndex = shuffledOptions.findIndex(
    (o) => o.originalIndex === q.correctIndex
  )

  function submit() {
    if (selected === null) return
    const correct = selected === newCorrectIndex
    setShowAnswer(true)
    if (correct) setScore((score) => score + 1)
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
          {shuffledOptions.map((option, i) => {
            const isCorrect = i === newCorrectIndex
            const isSelected = selected === i
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={cn(
                  'flex flex-row justify-between text-left p-3 rounded border dark:border-gray-700',
                  isSelected ? 'ring-2 ring-blue-500' : '',
                  showAnswer
                    ? isCorrect
                      ? 'ring-2 ring-green-500'
                      : 'ring-2 ring-red-500'
                    : ''
                )}
                disabled={showAnswer}
              >
                {option.text}
                {showAnswer && isSelected && !isCorrect && (
                  <CrossIcon className="text-red-500" />
                )}
                {showAnswer && isCorrect && (
                  <CheckmarkIcon className="text-green-500" />
                )}
              </button>
            )
          })}
        </div>

        <div className="flex gap-2 mt-4">
          <button
            disabled={showAnswer}
            onClick={submit}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-blue-800 disabled:cursor-not-allowed cursor-pointer"
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
              Answer: {shuffledOptions[newCorrectIndex].text}
            </div>
            <p className="mt-2 text-sm">{q.explanation}</p>
            <div className="mt-2 text-xs">
              Tip: After answering you can press Next Question.
            </div>
          </div>
        )}

        {showAnswer && (
          <div className="mt-4">
            <button
              onClick={next}
              className="px-4 py-2 rounded border dark:border-gray-700"
            >
              Next Question
            </button>
          </div>
        )}
      </div>

      <div className="p-4 text-sm text-gray-600 dark:text-gray-300">
        After finishing the quiz, students can compare scores and reflect on how
        to craft efficient prompts and reduce AI resource consumption.
      </div>
    </div>
  )
}
