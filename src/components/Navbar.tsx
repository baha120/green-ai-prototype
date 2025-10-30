'use client'
import { navigationKeys } from '@/utils/constants'
import { useThemeContext } from '@/utils/contexts/ThemeProvider'
import Link from 'next/link'
import React from 'react'

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
            <Link
              href={navigationKeys.consume_game}
              className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Consume Game
            </Link>
            <Link
              href={navigationKeys.prompt_analyser}
              className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Prompt Analyzer
            </Link>
            <Link
              href={navigationKeys.about}
              className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="px-3 py-2 rounded border dark:border-gray-700"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </header>
  )
}
