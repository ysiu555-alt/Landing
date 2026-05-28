"use client"

import {
  Download,
  KeyRound,
  Gamepad2,
  Zap,
  Shield,
  Moon,
  Sun,
} from "lucide-react"
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
        <AppLogo />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={t.theme_toggle}
            className="rounded-full h-9 w-9 soft-shadow"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

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
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/25 text-[10px] font-bold text-primary">
                  {user?.email?.slice(0, 2).toUpperCase() || "??"}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline max-w-[120px] truncate">{user?.email || "Гость"}</span>
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
          <Button
            onClick={openDownload}
            className="rounded-full px-6 py-6 text-sm font-semibold soft-shadow transition hover:scale-[1.03]"
          >
            <Download className="h-4 w-4" />
            {t.download}
          </Button>
          <Button
            variant="outline"
            onClick={openPay}
            className="rounded-full px-6 py-6 text-sm font-semibold bg-card hover:text-primary hover:border-primary/60 soft-shadow transition hover:scale-[1.03]"
          >
            <KeyRound className="h-4 w-4" />
            {t.buy}
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs animate-fade-up delay-400">
          <StatusChip>{t.chip_safe}</StatusChip>
          <StatusChip tone="accent">{t.chip_revert}</StatusChip>
          <StatusChip>{t.chip_light}</StatusChip>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24">
        <div className="text-center animate-fade-up">
          <div className="font-mono text-[11px] tracking-widest text-primary uppercase">{t.adv_tag}</div>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            {t.adv_title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl leading-relaxed text-muted-foreground">
            {t.adv_subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={<Gamepad2 className="h-5 w-5" />}
            title={t.f1_title}
            body={t.f1_body}
            tone="primary"
            delay="delay-100"
          />
          <FeatureCard
            icon={<Zap className="h-5 w-5" />}
            title={t.f2_title}
            body={t.f2_body}
            tone="accent"
            delay="delay-200"
          />
          <FeatureCard
            icon={<Shield className="h-5 w-5" />}
            title={t.f3_title}
            body={t.f3_body}
            tone="primary"
            delay="delay-300"
          />
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center soft-shadow animate-fade-up delay-200">
          <div className="font-mono text-[11px] tracking-widest text-accent-foreground/80 uppercase">
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
