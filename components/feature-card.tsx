import React from 'react'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  body: string
  tone: 'primary' | 'accent'
  delay?: string
}

export function FeatureCard({ icon, title, body, tone, delay }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 soft-shadow animate-fade-up',
        delay
      )}
    >
      <div
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-xl transition group-hover:scale-110 group-hover:rotate-3',
          tone === 'accent' ? 'bg-accent/40 text-accent-foreground' : 'bg-primary/20 text-primary'
        )}
      >
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  )
}
