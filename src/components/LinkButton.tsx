import Link from 'next/link'
import { JSX } from 'react'
import cn from 'clsx'
import { LinkButtonVariants } from '@/utils/constants'

interface LinkButtonType {
  href: string
  type: LinkButtonVariants
  text: string
  className?: string
}

export default function LinkButton({
  href,
  type,
  text,
  className,
}: LinkButtonType): JSX.Element {
  function returnStylingFromType(type: LinkButtonVariants): string {
    switch (type) {
      case LinkButtonVariants.nav:
        return 'px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700'
      case LinkButtonVariants.blank:
        return 'px-4 py-2 rounded hover:underline'
      case LinkButtonVariants.filled:
        return 'px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white'
    }
  }
  return (
    <Link href={href} className={cn(returnStylingFromType(type), className)}>
      {text}
    </Link>
  )
}
