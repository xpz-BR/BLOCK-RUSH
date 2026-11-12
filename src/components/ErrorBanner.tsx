import { AlertTriangle, X } from 'lucide-react'

interface ErrorBannerProps {
  message: string
  onDismiss: () => void
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="error-banner" role="alert">
      <AlertTriangle size={18} aria-hidden="true" />
      <span>{message}</span>
      <button
        type="button"
        className="error-banner__close"
        onClick={onDismiss}
        aria-label="Fechar aviso de erro"
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
