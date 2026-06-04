"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 mx-auto max-w-6xl px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FooterCard
          title="Funpay"
          description="Официальный Funpay для покупки ключей"
          buttonText="Перейти"
          link="https://funpay.com/users/19751070/"
        />
        <FooterCard
          title="Поддержка"
          description="Telegram"
          buttonText="Перейти"
          link="https://t.me/Kaliang_Support"
        />
        <div className="md:col-span-3">
          <FooterCard
            title="Rezidenz-Famq"
            description="Лучшая фама на Grapeseed, Партнеры проекта - Kaliang"
            buttonText="Перейти"
            link="https://discord.gg/9GTZmNmd7k"
          />
        </div>
      </div>
    </footer>
  )
}

function FooterCard({ title, description, buttonText, link }: { title: string, description: string, buttonText: string, link: string }) {
  return (
    <Card className="rounded-3xl border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-sm transition-all hover:border-primary/30">
      <CardContent className="p-8 flex flex-col gap-5">
        <h3 className="text-xl font-black italic uppercase tracking-tighter">{title}</h3>
        <p className="text-muted-foreground text-sm font-bold leading-relaxed">{description}</p>
        <Button
          variant="secondary"
          className="w-full rounded-2xl py-6 font-black uppercase tracking-widest shadow-lg shadow-black/20 hover:bg-primary hover:text-white transition-all"
          onClick={() => window.open(link, "_blank")}
        >
          {buttonText}
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}
