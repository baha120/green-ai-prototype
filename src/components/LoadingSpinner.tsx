import React from 'react'

interface LoadingSpinnerProps {
  size?: number
  color?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  color = 'text-blue-500',
}) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className={`animate-spin rounded-full border-4 border-gray-300 ${color}`}
        style={{
          width: size,
          height: size,
          borderTopColor: 'transparent',
        }}
      ></div>
    </div>
  )
}

export default LoadingSpinner
