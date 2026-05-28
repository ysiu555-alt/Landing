import React from 'react'
import { cn } from '@/lib/utils'

interface StatusChipProps {
  children: React.ReactNode
  tone?: 'primary' | 'accent'
  className?: string
}

export function StatusChip({ children, tone = 'primary', className }: StatusChipProps) {
  return (
    <span
      className={cn(
        'rounded-full border px-3 py-1 transition hover:-translate-y-0.5',
        tone === 'accent'
          ? 'border-accent/50 bg-accent/30 text-accent-foreground'
          : 'border-primary/40 bg-primary/15 text-primary-foreground/90',
        className
      )}
    >
      {children}
    </span>
  )
}
