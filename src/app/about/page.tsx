'use client'

import { JSX } from 'react'

export default function About(): JSX.Element {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">About EASY_AI</h1>
      <p className="mb-4">
        EASY_AI is an Erasmus+ initiative to boost digital & AI literacy with a
        strong focus on sustainability (Green AI) and media skills. The project
        includes podcasts, interactive learning and cross-border collaboration.
      </p>
      <h2 className="text-xl font-semibold mt-6">Objectives</h2>
      <ul className="list-disc pl-5 mt-2">
        <li>
          Increase students&apos; competence in AI applications and
          sustainability impact.
        </li>
        <li>Provide hands-on media & IT experience to boost employability.</li>
        <li>
          Create a public web-resource and learning modules for educators.
        </li>
      </ul>
    </section>
  )
}
