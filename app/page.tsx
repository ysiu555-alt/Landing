/** @jsxImportSource react */
"use client"

import * as React from "react"
import {
  Download,
  KeyRound,
  Gamepad2,
  Zap,
  Shield,
  Moon,
  Sun,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "next-themes"
import { FeatureCard } from "@/components/feature-card"
import { StatusChip } from "@/components/status-chip"
import { AppLogo } from "@/components/app-logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { SITE_CONFIG } from "@/lib/config"

export default function Page() {
  const router = useRouter()
  const { user, lang, setLang, t, logout } = useAuth()
  const [showTermsModal, setShowTermsModal] = React.useState(false)

  React.useEffect(() => {
    const accepted = localStorage.getItem('kaliang_terms_accepted')
    if (!accepted) {
      setShowTermsModal(true)
    }
  }, [])

  const acceptTerms = () => {
    localStorage.setItem('kaliang_terms_accepted', 'true')
    setShowTermsModal(false)
  }

  const openPay = () => {
    router.push("/dashboard")
  }

  const openDownload = () => {
    if (!user) {
      router.push("/login")
    } else {
      const link = document.createElement("a");
      link.href = SITE_CONFIG.downloadUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  const agreementText = `Пользовательское соглашение (Оферта)
Настоящее Соглашение является публичной офертой и регулирует использование программного обеспечения Kaliang — «ПО»
1. Предмет соглашения
1.1. ПО представляет собой утилиту для автоматизированной настройки и оптимизации параметров операционной системы Windows с целью улучшения её быстродействия.
1.2. Используя ПО, Пользователь подтверждает, что осознает характер выполняемых программой действий (внесение изменений в реестр, управление системными процессами, очистка временных файлов).
2. Права и обязанности сторон
2.1. Правообладатель: Обеспечивает доступ к функционалу ПО после успешной оплаты. Оставляет за собой право блокировать доступ к ПО в случае нарушения Пользователем условий использования.
2.2. Пользователь: Обязуется использовать ПО исключительно на устройствах, находящихся в его законном владении. Важно: Пользователь обязуется создать точку восстановления системы Windows перед запуском процедур оптимизации.
3. Отказ от ответственности 
3.1. ПО предоставляется на условиях «как есть» (as is). Правообладатель не несет ответственности за любые последствия, возникшие в результате использования ПО.
3.2. Пользователь принимает на себя все риски, связанные с внесением изменений в системные параметры Windows.
4. Лицензирование и оплата
4.1. Доступ к ПО предоставляется в виде временной лицензии (подписки) или бессрочной лицензии (Lifetime).
4.2. Система лицензирования использует уникальный идентификатор оборудования (HWID).
4.3. Возврат денежных средств не производится, если технический функционал ПО исправен.
5. Конфиденциальность
5.1. ПО собирает и передает на сервер техническую информацию: HWID, версию ОС и статус подписки. Персональные данные не собираются.
6. Контакты и реквизиты: Telegram: https://t.me/Kaliang_Support`

  return (
    <main className="relative min-h-svh overflow-hidden bg-[#050508] text-[#E0E0E6]">
      {/* aggressive premium blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 -z-0 h-[600px] w-[600px] rounded-full opacity-20 blur-[120px] animate-blob will-change-transform"
        style={{ background: "oklch(0.6 0.16 250)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 -z-0 h-[500px] w-[500px] rounded-full opacity-15 blur-[120px] animate-blob-alt will-change-transform"
        style={{ background: "oklch(0.6 0.16 250)" }}
      />
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-300">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl rounded-[40px] border border-white/10 bg-[#0A0A0F] p-8 shadow-2xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-black italic uppercase tracking-tight">{t.terms}</h2>
            </div>
            <div className="mb-8 max-h-[40vh] overflow-y-auto rounded-2xl bg-white/[0.03] p-6 text-sm font-medium leading-relaxed text-muted-foreground">
              <pre className="whitespace-pre-wrap font-sans">
                {agreementText}
              </pre>
            </div>
            <Button 
              onClick={acceptTerms}
              className="w-full rounded-2xl py-8 text-lg font-black uppercase tracking-tighter transition-all hover:scale-[1.02] active:scale-95"
            >
              ПРИНЯТЬ И ПРОДОЛЖИТЬ
            </Button>
          </motion.div>
        </div>
      )}

      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-8 py-8 animate-fade-in">
        <AppLogo />
        
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-6 md:flex">
             <button
              onClick={() => setLang(lang === "ru" ? "en" : "ru")}
              className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {lang === "ru" ? "EN" : "RU"}
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="rounded-2xl gap-2 font-bold hover:bg-white/5">
                  <Avatar className="h-6 w-6 border border-white/10">
                    <AvatarFallback className="bg-primary/20 text-[10px] text-primary font-black uppercase">
                      {user.email[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{t.dashboard}</span>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="rounded-2xl font-bold px-6 uppercase tracking-tight text-sm">
                  {t.sign_in}
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-2xl font-black px-6 uppercase tracking-tight text-sm shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                  {t.sign_up}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <section className="relative z-10 mx-auto max-w-4xl px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          {t.badge}
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 text-6xl font-[1000] italic leading-[0.9] tracking-tighter uppercase sm:text-8xl md:text-9xl"
        >
          {t.title_1} <br />
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/40 bg-clip-text text-transparent">
            {t.title_2}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-8 max-w-xl text-lg font-medium leading-relaxed text-muted-foreground opacity-80"
        >
          {t.subtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            onClick={openDownload}
            className="rounded-2xl px-10 py-8 text-lg font-black uppercase tracking-tighter shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Download className="h-5 w-5" />
            {t.download}
          </Button>
          <Button
            variant="outline"
            onClick={openPay}
            className="rounded-2xl px-10 py-8 text-lg font-black uppercase tracking-tighter bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-primary/40 transition-all hover:scale-[1.02] active:scale-95"
          >
            <KeyRound className="h-5 w-5" />
            {t.buy}
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40"
        >
          <div className="flex items-center gap-2"><Shield size={14} /> {t.chip_safe}</div>
          <div className="flex items-center gap-2"><Zap size={14} /> {t.chip_revert}</div>
          <div className="flex items-center gap-2"><Gamepad2 size={14} /> {t.chip_light}</div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-8 pb-32">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: t.f1_title,
              description: t.f1_body,
              icon: "🎮",
              delay: 0
            },
            {
              title: t.f2_title,
              description: t.f2_body,
              icon: "⚡",
              delay: 0.1
            },
            {
              title: t.f3_title,
              description: t.f3_body,
              icon: "🎯",
              delay: 0.2
            }
          ].map((feature, i) => (
            <FeatureCard
              key={i}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
