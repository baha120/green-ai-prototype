'use client'
import { LinkButtonVariants, navigationKeys } from '@/utils/constants'
import { useThemeContext } from '@/utils/contexts/ThemeProvider'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import LinkButton from './LinkButton'
import { BurgerMenu } from './BurgerMenu'

import { useEffect, useState } from 'react'
import { useScrollLock } from 'usehooks-ts'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'

export default function Navbar() {
  const { theme, toggleTheme } = useThemeContext()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const menu = document.getElementById('mobile-navigation')
      const burger = document.getElementById('burger-menu-btn')
      if (!menu || !burger) return
      if (
        !menu.contains(e.target as Node) &&
        !burger.contains(e.target as Node)
      ) {
        setMobileOpen(false)
      }
    }
    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileOpen])

  return (
    <>
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
          <MobileNavigationToggle className="size-8 focus:outline-none md:size-10 xl:hidden" />
        </div>
      </header>
      <nav
        id="mobile-navigation"
        aria-label="mobile navigation"
        className="invisible mt-16 fixed left-0 top-0 z-30 mt-navbarHeight h-0 w-full overflow-auto bg-white opacity-0 transition-all duration-300 ease-in-out navbarBig:mt-navbarHeightBig"
        aria-hidden="true"
      >
        <div className="relative size-full min-h-[calc(100vh-var(--navbar-height))] px-6 py-4 navbarBig:min-h-[calc(100vh-var(--navbar-height-big))] md:px-14 md:py-6 xl:hidden">
          <span className="typo-body-2 text-gray-400">Menü</span>
          <ul className="flex flex-col gap-5 pt-6">
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
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="px-3 py-2 rounded"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        <BurgerMenu
          className="size-8 focus:outline-none md:size-10 md:hidden"
          open={mobileOpen}
          onToggle={setMobileOpen}
          id="burger-menu-btn"
        />
      </div>
      {mobileOpen ? (
        <div
          id="mobile-navigation"
          className="md:hidden absolute inset-x-0 top-full border-t border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-lg"
          aria-hidden={!mobileOpen}
        >
          <nav className="flex flex-col gap-2 px-4 py-4">
            <LinkButton
              type={LinkButtonVariants.nav}
              text="Consume Game"
              href={navigationKeys.consume_game}
              className="w-full text-left"
              onClick={() => setMobileOpen(!mobileOpen)}
            />
            <LinkButton
              type={LinkButtonVariants.nav}
              text="Prompt Analyzer"
              href={navigationKeys.prompt_analyser}
              className="w-full text-left"
              onClick={() => setMobileOpen(!mobileOpen)}
            />
            <LinkButton
              type={LinkButtonVariants.nav}
              text="About"
              href={navigationKeys.about}
              className="w-full text-left"
              onClick={() => setMobileOpen(!mobileOpen)}
            />
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="mt-2 w-full px-3 py-2 rounded text-left"
            >
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
