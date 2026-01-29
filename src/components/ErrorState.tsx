import React from 'react'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = 'Something went wrong. Please try again.',
  onRetry 
}) => {
  return (
    <div className="error-state">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorState
