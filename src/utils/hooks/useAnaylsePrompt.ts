import { useState } from 'react'
import { api_response_type } from '../type/api_response'

interface UseAnalysePromptReturn {
  analysePrompt: (prompt: string) => Promise<api_response_type>
  isLoading: boolean
}

const useAnalysePrompt = (): UseAnalysePromptReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const analysePrompt = async (prompt: string) => {
    const baseUrl = process.env.BASE_URL
    setIsLoading(true)
    const res = await fetch(baseUrl + '/api/analyse_prompt', {
      method: 'POST',
      body: JSON.stringify(prompt),
    })
    setIsLoading(false)
    const response = await res.json()
    return response
  }
  return { analysePrompt, isLoading }
}

export default useAnalysePrompt
