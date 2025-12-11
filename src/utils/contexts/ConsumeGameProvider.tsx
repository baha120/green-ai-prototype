'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

type ConsumeGameContextValue = {
  score: number
  setScore: Dispatch<SetStateAction<number>>
}

const ConsumeGameContext = createContext<ConsumeGameContextValue | null>(null)

export function useConsumeGameContext() {
  const value = useContext(ConsumeGameContext)
  if (!value) {
    throw new Error(
      'useConsumeGameContext must be used within a ConsumeGameProvider'
    )
  }
  return value
}

export default function ConsumeGameProvider({
  children,
}: {
  children: ReactNode
}) {
  const [score, setScore] = useState<number>(0)
  const contextValue = useMemo(
    () => ({
      score,
      setScore,
    }),
    [score, setScore]
  )
  return (
    <ConsumeGameContext.Provider value={contextValue}>
      {children}
    </ConsumeGameContext.Provider>
  )
}
