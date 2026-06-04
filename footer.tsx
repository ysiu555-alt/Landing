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
          link="https://funpay.com/users/17795957/"
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
    <Card className="rounded-3xl border-white/5 bg-white/[0.02]">
      <CardContent className="p-6 flex flex-col gap-4">
        <h3 className="text-lg font-black italic uppercase">{title}</h3>
        <p className="text-muted-foreground text-sm font-bold">{description}</p>
        <Button
          variant="outline"
          className="w-full rounded-xl"
          onClick={() => window.open(link, "_blank")}
        >
          {buttonText}
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}
