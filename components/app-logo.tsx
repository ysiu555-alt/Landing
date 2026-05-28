import React from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AppLogoProps {
  className?: string
  textClassName?: string
}

export function AppLogo({ className, textClassName }: AppLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary transition group-hover:rotate-6 group-hover:scale-105">
        <Sparkles className="h-4 w-4" />
      </div>
      <span className={cn("font-sans text-base font-semibold tracking-tight", textClassName)}>
        Kaliang
      </span>
    </Link>
  )
}
