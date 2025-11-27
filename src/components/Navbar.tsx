'use client'
import { LinkButtonVariants, navigationKeys } from '@/utils/constants'
import { useThemeContext } from '@/utils/contexts/ThemeProvider'
import Link from 'next/link'
import React from 'react'
import LinkButton from './LinkButton'

export default function Navbar() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <header className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="container-max flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-xl">
            EASY_AI
          </Link>
          <nav className="hidden md:flex gap-3">
            <LinkButton
              type={LinkButtonVariants.nav}
              text="Consume Game"
              href={navigationKeys.consume_game}
            />
            <LinkButton
              type={LinkButtonVariants.nav}
              text="Prompt Analyzer"
              href={navigationKeys.prompt_analyser}
            />
            <LinkButton
              type={LinkButtonVariants.nav}
              text="About"
              href={navigationKeys.about}
            />
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="px-3 py-2 rounded"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </header>
  )
}
