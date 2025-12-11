import React from 'react'

type BurgerMenuProps = {
  open?: boolean
  defaultOpen?: boolean
  onToggle?(open: boolean): void
  size?: number
  lineThickness?: number
  lineGap?: number
  className?: string
  lineClassName?: string
  ariaLabel?: string
  id?: string
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  open,
  defaultOpen = false,
  onToggle,
  size = 24,
  lineThickness = 2,
  lineGap = 5,
  className,
  lineClassName,
  ariaLabel = 'Toggle navigation menu',
  id,
}) => {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)

  const isOpen = isControlled ? open! : internalOpen

  const handleToggle = () => {
    const next = !isOpen
    if (!isControlled) {
      setInternalOpen(next)
    }
    onToggle?.(next)
  }

  const lineCommon = cn(
    'absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-200 ease-out',
    lineClassName ?? 'bg-current dark:bg-gray-200'
  )

  const buttonStyle: React.CSSProperties = {
    width: size,
    height: size,
  }

  const lineStyle: React.CSSProperties = {
    height: lineThickness,
    width: size * 0.7,
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      className={cn(
        'relative inline-flex items-center justify-center',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
        'rounded-md',
        className
      )}
      style={buttonStyle}
      id={id}
    >
      <span
        className={cn(lineCommon)}
        style={{
          ...lineStyle,
          top: '50%',
          transform: isOpen
            ? 'translate(-50%, -50%) rotate(45deg)'
            : `translate(-50%, calc(-50% - ${lineGap}px))`,
        }}
      />
      <span
        className={cn(lineCommon)}
        style={{
          ...lineStyle,
          top: '50%',
          opacity: isOpen ? 0 : 1,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <span
        className={cn(lineCommon)}
        style={{
          ...lineStyle,
          top: '50%',
          transform: isOpen
            ? 'translate(-50%, -50%) rotate(-45deg)'
            : `translate(-50%, calc(-50% + ${lineGap}px))`,
        }}
      />
    </button>
  )
}
