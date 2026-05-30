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

export default function Page() {
  const { user, lang, setLang, t, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
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
      window.open("#", "_blank", "noopener,noreferrer")
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#0A0A0F] border border-white/10 rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <h2 className="text-xl font-bold tracking-tight">Пользовательское соглашение</h2>
              <Zap className="h-5 w-5 text-primary fill-primary" />
            </div>
            <div className="p-8 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed">
                {agreementText}
              </pre>
            </div>
            <div className="p-8 border-t border-white/5 bg-white/[0.02]">
              <Button 
                onClick={acceptTerms}
                className="w-full h-14 rounded-2xl text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                Принять и продолжить
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-8 py-8 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Zap className="h-6 w-6 text-white fill-white" />
          </div>
          <span className="text-xl font-black italic tracking-tighter uppercase">Kaliang</span>
        </div>

        <div className="flex items-center gap-4">
          <div
            role="group"
            className="hidden md:flex items-center rounded-2xl border border-white/5 bg-white/[0.02] p-1 text-[10px] font-black uppercase tracking-widest"
          >
            <button
              type="button"
              onClick={() => setLang("ru")}
              className={`rounded-xl px-4 py-2 transition-all ${
                lang === "ru" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-white"
              }`}
            >
              RU
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-xl px-4 py-2 transition-all ${
                lang === "en" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          {user ? (
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] pl-2 pr-5 text-sm font-bold transition-all hover:bg-white/[0.06] hover:border-primary/30"
            >
              <Avatar className="h-8 w-8 rounded-xl border border-white/10">
                <AvatarFallback className="bg-primary/20 text-[10px] font-black text-primary">
                  {user?.email?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="max-w-[120px] truncate">{user?.email}</span>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-6 py-3 text-sm font-bold text-muted-foreground hover:text-white transition-colors"
              >
                {t.sign_in}
              </Link>
              <Link
                href="/register"
                className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-2xl text-sm font-black text-white shadow-xl shadow-primary/20 transition-all transform active:scale-95"
              >
                {t.sign_up}
              </Link>
            </div>
          )}
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-4xl px-8 pb-24 pt-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-10"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          {t.badge}
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-balance font-black tracking-tighter text-5xl md:text-8xl italic leading-[0.9]"
        >
          {t.title_1} <br />
          <span className="text-primary not-italic">{t.title_2}</span>
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
            { icon: <Gamepad2 />, title: t.f1_title, body: t.f1_body, color: "#1BBE43" },
            { icon: <Zap />, title: t.f2_title, body: t.f2_body, color: "#CE422B" },
            { icon: <Shield />, title: t.f3_title, body: t.f3_body, color: "#DEA02C" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group relative bg-white/[0.02] border border-white/5 rounded-[40px] p-10 overflow-hidden transition-all hover:border-primary/30 hover:bg-white/[0.04]"
            >
              <div className="absolute top-0 left-0 w-full h-1 opacity-20 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: feature.color }} />
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 text-primary group-hover:scale-110 transition-transform">
                {React.cloneElement(feature.icon as React.ReactElement, { size: 28 })}
              </div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">{feature.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="mt-12 rounded-[40px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-12 text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
            <Shield size={120} className="text-primary" />
          </div>
          <div className="font-black text-[10px] tracking-[0.3em] text-primary uppercase mb-4">
            {t.why_tag}
          </div>
          <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase mb-6">{t.why_title}</h3>
          <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-muted-foreground">
            {t.why_body}
          </p>
        </motion.div>
      </section>

      <div className="relative z-10 mx-auto max-w-6xl px-8 pb-10">
        <div className="text-[9px] font-medium leading-relaxed text-muted-foreground/20 whitespace-pre-wrap select-none text-center">
          {agreementText}
        </div>
      </div>

      <footer className="relative z-10 border-t border-white/5 bg-black/20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-10 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
          <div className="flex items-center gap-4">
            <span>{t.footer}</span>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <Link href="/terms" className="hover:text-primary transition-colors">{t.terms}</Link>
          </div>
          <span className="font-mono bg-white/5 px-3 py-1 rounded-full">CORE_V1.0</span>
        </div>
      </footer>
    </main>
  )
}
