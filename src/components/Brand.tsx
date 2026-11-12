import './Brand.css'

interface BrandProps {
  compact?: boolean
  inverted?: boolean
}

export function Brand({ compact = false, inverted = false }: BrandProps) {
  return (
    <div
      className={[
        'brand',
        compact ? 'brand--compact' : '',
        inverted ? 'brand--inverted' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="BLOCK RUSH"
    >
      <span className="brand__word">BLOCK</span>
      <span className="brand__slash" aria-hidden="true">
        //
      </span>
      <span className="brand__word brand__word--rush">RUSH</span>
    </div>
  )
}
