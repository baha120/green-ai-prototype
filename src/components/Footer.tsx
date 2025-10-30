'use client'
import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800 mt-12">
      <div className="container-max py-6 text-sm text-center">
        <div>EASY_AI — Erasmus+ project • Partners: DE, IT, ES, TR</div>
        <div className="mt-2">© {new Date().getFullYear()}</div>
      </div>
    </footer>
  )
}
