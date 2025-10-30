'use client'
import React, { useState } from 'react'

type Score = {
  clarity: number
  sustainability: number
  ethics: number
}

function computeScores(prompt: string): { score: Score; tips: string[] } {
  const text = prompt.trim().toLowerCase()
  // simple heuristics — replaceable by more advanced checks or models
  const clarity = Math.min(
    100,
    Math.max(0, Math.floor((text.length / 200) * 100))
  )

  // sustainability: penalize requests for heavy multimodal outputs, loops, many variations
  let sustainability = 60
  if (
    text.includes('generate image') ||
    text.includes('image') ||
    text.includes('video') ||
    text.includes('render')
  )
    sustainability -= 25
  if (
    text.includes('high resolution') ||
    text.includes('4k') ||
    text.includes('ultra')
  )
    sustainability -= 15
  if (
    text.includes('iterate') ||
    text.includes('variations') ||
    text.includes('make it blue')
  )
    sustainability -= 10
  sustainability = Math.max(0, Math.min(100, sustainability))

  // ethics: look for personal data, hate, brand/trademark usage
  let ethics = 100
  if (text.match(/personal data|address|phone|email|ssn|social security/))
    ethics -= 50
  if (text.match(/hate|violence|illegal|piracy/)) ethics -= 80
  if (
    text.includes('logo of') ||
    text.includes('brand') ||
    text.includes('trademark')
  )
    ethics -= 30
  ethics = Math.max(0, Math.min(100, ethics))

  const tips: string[] = []
  if (clarity < 50) tips.push('Füge Kontext hinzu: Wer? Was? Wann? Warum?')
  if (sustainability < 50)
    tips.push(
      'Vermeide unnötig große Multimodal-Generierungen (4K, viele Variationen). Beschreibe genau, was du brauchst.'
    )
  if (ethics < 70)
    tips.push(
      'Prüfe personenbezogene Daten und Markenrechte. Frage nach Erlaubnis für persönliche Inhalte.'
    )

  return { score: { clarity, sustainability, ethics }, tips }
}

export default function PromptAnalyzer() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState<{ score: Score; tips: string[] } | null>(
    null
  )
  const [points, setPoints] = useState(0)

  function analyze() {
    const res = computeScores(prompt)
    setResult(res)
    // gamification: award points for concise & sustainable prompts
    const gained = Math.round(
      (res.score.clarity + res.score.sustainability + res.score.ethics) / 30
    )
    setPoints(gained)
  }

  return (
    <div className="space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={6}
        className="w-full p-3 rounded border dark:border-gray-700 bg-white dark:bg-gray-900"
        placeholder="Enter your AI prompt here..."
      />
      <div className="flex gap-2">
        <button
          onClick={analyze}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Analyze
        </button>
        <div className="px-4 py-2 rounded border dark:border-gray-700">
          Points: {points}
        </div>
      </div>

      {result && (
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h4 className="font-semibold">Clarity & Specificity</h4>
            <p className="text-sm mt-2">Score: {result.score.clarity}%</p>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 mt-2 rounded">
              <div
                style={{ width: `${result.score.clarity}%` }}
                className="h-2 bg-green-500 dark:bg-green-400 rounded"
              ></div>
            </div>
          </div>

          <div className="p-4 rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h4 className="font-semibold">Sustainability Impact</h4>
            <p className="text-sm mt-2">
              Score: {result.score.sustainability}%
            </p>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 mt-2 rounded">
              <div
                style={{ width: `${result.score.sustainability}%` }}
                className="h-2 bg-yellow-500 rounded"
              ></div>
            </div>
          </div>

          <div className="p-4 rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h4 className="font-semibold">Ethical Considerations</h4>
            <p className="text-sm mt-2">Score: {result.score.ethics}%</p>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 mt-2 rounded">
              <div
                style={{ width: `${result.score.ethics}%` }}
                className="h-2 bg-red-500 rounded"
              ></div>
            </div>
          </div>

          <div className="md:col-span-3 p-4 rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h4 className="font-semibold">Improvement Tips</h4>
            <ul className="list-disc pl-5 mt-2">
              {result.tips.length === 0 ? (
                <li>Looks good — concise and responsible.</li>
              ) : (
                result.tips.map((t, i) => <li key={i}>{t}</li>)
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
