'use client'
import LinkButton from '@/components/LinkButton'
import { LinkButtonVariants, navigationKeys } from '@/utils/constants'
import { JSX } from 'react'

export default function Home(): JSX.Element {
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h1 className="text-4xl font-extrabold mb-4">
            EASY_AI — Green & Responsible AI for Vocational Students
          </h1>
          <p className="mb-6 max-w-prose">
            Learn how AI impacts the environment, practice crafting efficient
            prompts, and explore resource-aware AI through interactive games and
            student-produced media.
          </p>
          <div className="flex gap-3">
            <LinkButton
              type={LinkButtonVariants.filled}
              text="Try Prompt Analyzer"
              href={navigationKeys.prompt_analyser}
            />
            <LinkButton
              type={LinkButtonVariants.blank}
              text="Play Consume Game"
              href={navigationKeys.consume_game}
            />
          </div>
        </div>
        <div>
          <div className="p-6 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <h3 className="font-semibold mb-2">Project Outputs</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Podcast series on Green AI (3–4 episodes)</li>
              <li>Consume Game — resource-estimation quiz</li>
              <li>Prompt Analyzer — feedback & improvement tips</li>
              <li>Web platform & student workshops</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Student Projects & Mobility</h2>
        <p className="max-w-prose">
          Cross-border media and IT collaborations between partner institutions
          in Germany, Italy, Spain and Turkey. Students produce podcasts, build
          tools and run workshops.
        </p>
      </section>
    </section>
  )
}
