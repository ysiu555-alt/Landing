"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Download,
  KeyRound,
  Gamepad2,
  Zap,
  Shield,
  Sparkles,
  Moon,
  Sun,
  X,
  Bitcoin,
  ShoppingBag,
  Mail,
  ArrowRight,
} from "lucide-react"

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

    pay_title: "Оформление ключа",
    pay_subtitle: "Введите e-mail и выберите способ оплаты — ключ будет отправлен на почту.",
    email_label: "E-mail",
    email_placeholder: "you@example.com",
    email_error: "Введите корректный e-mail",
    pay_method: "Способ оплаты",
    pay_crypto: "CryptoPay",
    pay_crypto_desc: "Оплата криптовалютой (USDT, BTC, TON и др.)",
    pay_crypto_note: "Автоматическая выдача",
    pay_funpay: "FunPay",
    pay_funpay_desc: "Покупка через площадку FunPay",
    pay_funpay_note: "(выдача ручная)",
    pay_continue: "Перейти к оплате",
    pay_close: "Закрыть",
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

    pay_title: "Buy a key",
    pay_subtitle: "Enter your email and choose a payment method — the key will be sent to your inbox.",
    email_label: "Email",
    email_placeholder: "you@example.com",
    email_error: "Please enter a valid email",
    pay_method: "Payment method",
    pay_crypto: "CryptoPay",
    pay_crypto_desc: "Pay with crypto (USDT, BTC, TON and more)",
    pay_crypto_note: "Instant delivery",
    pay_funpay: "FunPay",
    pay_funpay_desc: "Buy through the FunPay marketplace",
    pay_funpay_note: "(manual delivery)",
    pay_continue: "Continue to payment",
    pay_close: "Close",
    footer: "© Kaliang. All rights reserved.",
  },
} as const

type Method = "crypto" | "funpay"

export default function Page() {
  const [lang, setLang] = useState<Lang>("ru")
  const [dark, setDark] = useState(false)
  const [payOpen, setPayOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [emailTouched, setEmailTouched] = useState(false)
  const [method, setMethod] = useState<Method>("crypto")
  const t = dict[lang]

  // Replace these URLs later with your real links
  const FUNPAY_URL = "https://funpay.com/"
  const CRYPTOPAY_URL = "https://t.me/send?start="

  const emailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email],
  )

  useEffect(() => {
    if (!payOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPayOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [payOpen])

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add("dark")
    else root.classList.remove("dark")
  }, [dark])

  const openPay = () => {
    setPayOpen(true)
    setEmailTouched(false)
  }

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailTouched(true)
    if (!emailValid) return
    const url = method === "funpay" ? FUNPAY_URL : CRYPTOPAY_URL
    window.open(url, "_blank", "noopener,noreferrer")
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
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-[1.03] hover:brightness-105 active:scale-[0.98] soft-shadow"
          >
            <Download className="h-4 w-4 transition group-hover:-translate-y-0.5" />
            {t.download}
          </a>
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

      {payOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pay-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label={t.pay_close}
            onClick={() => setPayOpen(false)}
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm animate-fade-in"
          />
          <form
            onSubmit={handleContinue}
            className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 soft-shadow animate-pop-in"
          >
            <button
              type="button"
              onClick={() => setPayOpen(false)}
              aria-label={t.pay_close}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:rotate-90 hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 id="pay-title" className="text-balance text-lg font-semibold tracking-tight">
              {t.pay_title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.pay_subtitle}</p>

            <div className="mt-5">
              <label htmlFor="email" className="block text-xs font-medium text-muted-foreground">
                {t.email_label}
              </label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  placeholder={t.email_placeholder}
                  aria-invalid={emailTouched && !emailValid}
                  className={`w-full rounded-xl border bg-background py-2.5 pl-9 pr-3 text-sm outline-none transition focus:ring-2 ${
                    emailTouched && !emailValid
                      ? "border-destructive/60 focus:ring-destructive/30"
                      : "border-border focus:border-primary/60 focus:ring-primary/25"
                  }`}
                />
              </div>
              {emailTouched && !emailValid && (
                <p className="mt-1.5 text-xs text-destructive animate-fade-in">{t.email_error}</p>
              )}
            </div>

            <div className="mt-5">
              <div className="text-xs font-medium text-muted-foreground">{t.pay_method}</div>
              <div className="mt-2 grid gap-3">
                <MethodOption
                  active={method === "crypto"}
                  onClick={() => setMethod("crypto")}
                  icon={<Bitcoin className="h-5 w-5" />}
                  title={t.pay_crypto}
                  desc={t.pay_crypto_desc}
                  note={t.pay_crypto_note}
                  noteTone="accent"
                  tone="primary"
                />
                <MethodOption
                  active={method === "funpay"}
                  onClick={() => setMethod("funpay")}
                  icon={<ShoppingBag className="h-5 w-5" />}
                  title={t.pay_funpay}
                  desc={t.pay_funpay_desc}
                  note={t.pay_funpay_note}
                  noteTone="muted"
                  tone="accent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] soft-shadow"
            >
              {t.pay_continue}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      )}

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

function MethodOption({
  active,
  onClick,
  icon,
  title,
  desc,
  note,
  noteTone = "muted",
  tone,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
  desc: string
  note?: string
  noteTone?: "muted" | "accent"
  tone: "primary" | "accent"
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative flex items-center gap-3 rounded-xl border bg-background p-4 text-left transition hover:-translate-y-0.5 ${
        active
          ? tone === "accent"
            ? "border-accent ring-2 ring-accent/40"
            : "border-primary ring-2 ring-primary/30"
          : "border-border hover:border-primary/40"
      }`}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-lg transition group-hover:scale-110 ${
          tone === "accent" ? "bg-accent/40 text-accent-foreground" : "bg-primary/20 text-primary"
        }`}
      >
        {icon}
      </span>
      <span className="flex-1">
        <span className="flex items-center gap-2">
          <span className="block text-sm font-semibold">{title}</span>
          {note && (
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                noteTone === "accent"
                  ? "bg-accent/40 text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {note}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{desc}</span>
      </span>
      <span
        aria-hidden
        className={`h-4 w-4 shrink-0 rounded-full border transition ${
          active
            ? tone === "accent"
              ? "border-accent bg-accent"
              : "border-primary bg-primary"
            : "border-border bg-background"
        }`}
      />
    </button>
  )
}
