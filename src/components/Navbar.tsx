'use client'
import { LinkButtonVariants, navigationKeys } from '@/utils/constants'
import { useThemeContext } from '@/utils/contexts/ThemeProvider'
import Link from 'next/link'
import React from 'react'
import LinkButton from './LinkButton'

import { useEffect, useState } from 'react'
import { useScrollLock } from 'usehooks-ts'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid'

export default function Navbar() {
  const { theme, toggleTheme } = useThemeContext()

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
          </ul>
        </div>
      </nav>
    </>
  )
}

type MobileNavigationToggleProps = {
  className: string
}

export const toggleNavigation = (isOpen: boolean) => {
  const menu = document.getElementById('mobile-navigation')

  if (!menu) return

  const openedClassNames = [
    'min-h-[calc(100vh-var(--navbar-height))]',
    'navbarBig:min-h-[calc(100vh-var(--navbar-height-big))]',
    'max-h-[calc(100vh-var(--navbar-height))]',
    'navbarBig:max-h-[calc(100vh-var(--navbar-height-big))]',
    'visible',
    'opacity-100',
  ]

  const closedClassNames = ['h-0', 'invisible', 'opacity-0']

  if (isOpen) {
    menu.classList.remove(...closedClassNames)
    menu.classList.add(...openedClassNames)
    menu.setAttribute('aria-hidden', 'false')
  } else {
    menu.classList.remove(...openedClassNames)
    menu.classList.add(...closedClassNames)
    menu.setAttribute('aria-hidden', 'true')
  }
}

const MobileNavigationToggle = ({ className }: MobileNavigationToggleProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { lock, unlock } = useScrollLock({
    autoLock: false,
  })

  const toggleMenu = () => {
    isOpen ? unlock() : lock()
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    toggleNavigation(isOpen)
  }, [isOpen])

  useEffect(() => {
    const menu = document.getElementById('mobile-navigation')
    if (!menu) return

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const target = mutation.target as HTMLElement
          const isCurrentlyOpen =
            target.classList.contains('visible') &&
            target.classList.contains('opacity-100') &&
            !target.classList.contains('invisible')

          if (isCurrentlyOpen !== isOpen) {
            setIsOpen(isCurrentlyOpen)
            isCurrentlyOpen ? lock() : unlock()
          }
        }
      })
    })

    observer.observe(menu, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [isOpen, lock, unlock])

  return (
    <button
      className={className}
      onClick={toggleMenu}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      aria-label="Toggle navigation menu"
    >
      <XMarkIcon className={isOpen ? '' : 'hidden'} />
      <Bars3Icon className={isOpen ? 'hidden' : ''} />
    </button>
  )
}
