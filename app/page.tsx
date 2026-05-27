"use client"

import { useEffect, useState } from "react"
import {
  Download,
  KeyRound,
  Gamepad2,
  Zap,
  Shield,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react"
import Link from "next/link"
import { apiClient } from "@/lib/api-client"

type Lang = "ru" | "en"

const dict = {
  ru: {
    nav_lang: "Язык",
    theme_toggle: "Сменить тему",
    badge: "Оптимизация Windows",
    title_1: "Больше FPS.",
    title_2: "Меньше задержек.",
    subtitle:
      "Лёгкая утилита для глубокой оптимизации Windows под популярные онлайн-игры. Один клик — стабильный FPS и минимальный пинг.",
    download: "Скачать",
    buy: "Купить ключ",
    adv_tag: "Преимущества",
    adv_title: "Создано для геймеров",
    adv_subtitle: "Программа оптимизирует систему специально под требовательные игры.",
    f1_title: "GTA 5 RP",
    f1_body: "Стабильный FPS на загруженных серверах, быстрая прогрузка текстур и плавный геймплей.",
    f2_title: "Rust",
    f2_body: "Уменьшение фризов при больших рейдах, оптимизация памяти и приоритета процесса.",
    f3_title: "CS 2",
    f3_body: "Минимальные задержки ввода, точный аим и стабильные 1% low FPS в напряжённых раундах.",
    why_tag: "Безопасно",
    why_title: "Прозрачно и обратимо",
    why_body:
      "Перед каждым изменением создаётся резервная копия. Любую настройку можно откатить в один клик.",
    chip_safe: "Резервные копии",
    chip_revert: "Откат в 1 клик",
    chip_light: "До 10 МБ ОЗУ",
    sign_in: "Войти",
    sign_up: "Регистрация",
    footer: "© Kaliang. Все права защищены.",
  },
  en: {
    nav_lang: "Language",
    theme_toggle: "Toggle theme",
    badge: "Windows Optimization",
    title_1: "More FPS.",
    title_2: "Less latency.",
    subtitle:
      "A lightweight Windows optimization utility tuned for popular online games. One click — stable FPS and minimal ping.",
    download: "Download",
    buy: "Buy a key",
    adv_tag: "Advantages",
    adv_title: "Built for gamers",
    adv_subtitle: "The app optimizes your system specifically for demanding online titles.",
    f1_title: "GTA 5 RP",
    f1_body: "Stable FPS on crowded servers, faster texture streaming and smoother gameplay.",
    f2_title: "Rust",
    f2_body: "Fewer stutters during large raids, memory optimization and process priority tuning.",
    f3_title: "CS 2",
    f3_body: "Minimal input latency, precise aim and stable 1% low FPS during intense rounds.",
    why_tag: "Safe",
    why_title: "Transparent and reversible",
    why_body: "A backup is created before every change. Any tweak can be reverted in one click.",
    chip_safe: "Auto backups",
    chip_revert: "1-click revert",
    chip_light: "Under 10 MB RAM",
    sign_in: "Sign in",
    sign_up: "Sign up",
    footer: "© Kaliang. All rights reserved.",
  },
} as const

export default function Page() {
  const [lang, setLang] = useState<Lang>("ru")
  const [dark, setDark] = useState(false)
  const t = dict[lang]

  // Auth state
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("vortex_jwt_token")
    if (token) {
      apiClient("/api/auth/me").then(({ ok, data }) => {
        if (ok) setUser(data)
        else localStorage.removeItem("vortex_jwt_token")
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add("dark")
    else root.classList.remove("dark")
  }, [dark])

  const openPay = () => {
    window.location.href = "/dashboard"
  }

  const openDownload = () => {
    if (!user) {
      window.location.href = "/login"
    } else {
      // Hook up your real download link later
      window.open("#", "_blank", "noopener,noreferrer")
    }
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
      {/* soft pastel blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 -z-0 h-[480px] w-[480px] rounded-full opacity-70 blur-3xl animate-blob"
        style={{ background: "radial-gradient(closest-side, oklch(0.88 0.07 320 / 0.7), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 -z-0 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl animate-blob-alt"
        style={{ background: "radial-gradient(closest-side, oklch(0.88 0.08 170 / 0.65), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -z-0 h-[360px] w-[640px] -translate-x-1/2 rounded-full opacity-60 blur-3xl animate-blob"
        style={{ background: "radial-gradient(closest-side, oklch(0.9 0.06 70 / 0.55), transparent 70%)" }}
      />

      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-6 animate-fade-up">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary transition hover:rotate-6 hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-sans text-base font-semibold tracking-tight">Kaliang</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            aria-label={t.theme_toggle}
            aria-pressed={dark}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:scale-105 hover:text-primary soft-shadow"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <div
            role="group"
            aria-label={t.nav_lang}
            className="inline-flex items-center rounded-full border border-border bg-card p-1 text-xs font-medium soft-shadow"
          >
            <button
              type="button"
              onClick={() => setLang("ru")}
              aria-pressed={lang === "ru"}
              className={`rounded-full px-3 py-1.5 transition ${
                lang === "ru"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              RU
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`rounded-full px-3 py-1.5 transition ${
                lang === "en"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>

          {user ? (
            <Link
              href="/dashboard"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card pl-1 pr-3 text-xs font-medium transition hover:scale-[1.03] hover:border-primary/50 soft-shadow"
            >
              <Avatar src={null} fallback={user.email || "User"} className="h-7 w-7" />
              <span className="hidden sm:inline max-w-[120px] truncate">{user.email}</span>
            </Link>
          ) : (
            <div className="inline-flex items-center gap-1.5">
              <Link
                href="/login"
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:scale-[1.03] hover:border-primary/50 soft-shadow"
              >
                {t.sign_in}
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:scale-[1.03] hover:brightness-105 soft-shadow"
              >
                {t.sign_up}
              </Link>
            </div>
          )}
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-10 text-center md:pt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground soft-shadow animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-ring" />
          {t.badge}
        </div>
        <h1 className="mt-6 text-balance font-sans text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl animate-fade-up delay-100">
          {t.title_1} <span className="shimmer-text">{t.title_2}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground animate-fade-up delay-200">
          {t.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-up delay-300">
          <button
            type="button"
            onClick={openDownload}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-[1.03] hover:brightness-105 active:scale-[0.98] soft-shadow"
          >
            <Download className="h-4 w-4 transition group-hover:-translate-y-0.5" />
            {t.download}
          </button>
          <button
            type="button"
            onClick={openPay}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:scale-[1.03] hover:border-primary/60 hover:text-primary active:scale-[0.98]"
          >
            <KeyRound className="h-4 w-4 transition group-hover:rotate-12" />
            {t.buy}
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs animate-fade-up delay-400">
          <Chip>{t.chip_safe}</Chip>
          <Chip tone="accent">{t.chip_revert}</Chip>
          <Chip>{t.chip_light}</Chip>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24">
        <div className="text-center animate-fade-up">
          <div className="font-mono text-[11px] tracking-widest text-primary">{t.adv_tag}</div>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            {t.adv_title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl leading-relaxed text-muted-foreground">
            {t.adv_subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Feature
            icon={<Gamepad2 className="h-5 w-5" />}
            title={t.f1_title}
            body={t.f1_body}
            tone="primary"
            delay="delay-100"
          />
          <Feature
            icon={<Zap className="h-5 w-5" />}
            title={t.f2_title}
            body={t.f2_body}
            tone="accent"
            delay="delay-200"
          />
          <Feature
            icon={<Shield className="h-5 w-5" />}
            title={t.f3_title}
            body={t.f3_body}
            tone="primary"
            delay="delay-300"
          />
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center soft-shadow animate-fade-up delay-200">
          <div className="font-mono text-[11px] tracking-widest text-accent-foreground/80">
            {t.why_tag}
          </div>
          <h3 className="mt-2 text-balance text-xl font-semibold md:text-2xl">{t.why_title}</h3>
          <p className="mx-auto mt-2 max-w-xl leading-relaxed text-muted-foreground">
            {t.why_body}
          </p>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>{t.footer}</span>
          <span className="font-mono">v1.0</span>
        </div>
      </footer>
    </main>
  )
}

function Chip({
  children,
  tone = "primary",
}: {
  children: React.ReactNode
  tone?: "primary" | "accent"
}) {
  return (
    <span
      className={`rounded-full border px-3 py-1 transition hover:-translate-y-0.5 ${
        tone === "accent"
          ? "border-accent/50 bg-accent/30 text-accent-foreground"
          : "border-primary/40 bg-primary/15 text-primary-foreground/90"
      }`}
    >
      {children}
    </span>
  )
}

function Feature({
  icon,
  title,
  body,
  tone,
  delay,
}: {
  icon: React.ReactNode
  title: string
  body: string
  tone: "primary" | "accent"
  delay?: string
}) {
  return (
    <div
      className={`group rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 soft-shadow animate-fade-up ${delay ?? ""}`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl transition group-hover:scale-110 group-hover:rotate-3 ${
          tone === "accent" ? "bg-accent/40 text-accent-foreground" : "bg-primary/20 text-primary"
        }`}
      >
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  )
}

function Avatar({
  src,
  fallback,
  className = "",
}: {
  src: string | null
  fallback: string
  className?: string
}) {
  const initials = fallback.slice(0, 2).toUpperCase()
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/25 text-[11px] font-semibold text-primary ${className}`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </span>
  )
}
