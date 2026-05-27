"use client"

import { useEffect, useMemo, useRef, useState } from "react"
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
  User,
  Lock,
  AtSign,
  LogOut,
  Camera,
  CheckCircle2,
  Calendar,
  BadgeCheck,
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

    // Auth
    sign_in: "Войти",
    sign_up: "Регистрация",
    auth_login_title: "Вход в аккаунт",
    auth_login_sub: "Войдите, чтобы скачать программу или купить ключ.",
    auth_register_title: "Создать аккаунт",
    auth_register_sub: "Заполните данные — мы отправим код подтверждения на почту.",
    login_label: "Логин",
    login_placeholder: "your_login",
    password_label: "Пароль",
    password_placeholder: "Минимум 6 символов",
    confirm_password_label: "Повторите пароль",
    field_required: "Поле обязательно",
    login_min: "Логин от 3 символов",
    pass_min: "Пароль от 6 символов",
    pass_mismatch: "Пароли не совпадают",
    have_account: "Уже есть аккаунт?",
    no_account: "Ещё нет аккаунта?",
    to_login: "Войти",
    to_register: "Зарегистрироваться",
    submit_login: "Войти",
    submit_register: "Создать аккаунт",
    verify_title: "Подтверждение почты",
    verify_sub: "Мы отправили код на",
    verify_code_label: "Код из письма",
    verify_continue: "Подтвердить",
    verify_resend: "Отправить код снова",
    auth_required: "Требуется вход",
    auth_required_sub: "Чтобы продолжить, войдите или зарегистрируйтесь.",
    forgot_password: "Забыли пароль?",
    reset_title: "Сброс пароля",
    reset_sub: "Введите e-mail — мы отправим код для сброса пароля.",
    reset_send: "Отправить код",
    reset_verify_title: "Введите код",
    reset_verify_sub: "Мы отправили код на",
    reset_new_title: "Новый пароль",
    reset_new_sub: "Придумайте новый пароль для вашего аккаунта.",
    new_password_label: "Новый пароль",
    confirm_new_password_label: "Повторите новый пароль",
    reset_done: "Пароль изменён",
    reset_done_sub: "Теперь вы можете войти с новым паролем.",
    reset_back: "Вернуться ко входу",
    reset_save: "Сохранить пароль",

    // Profile
    profile: "Профиль",
    profile_open: "Открыть профиль",
    upload_photo: "Загрузить фото",
    change_photo: "Изменить фото",
    sub_status: "Статус подписки",
    sub_active: "Активна",
    sub_inactive: "Нет активной подписки",
    reg_date: "Дата регистрации",
    logout: "Выйти",
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

    sign_in: "Sign in",
    sign_up: "Sign up",
    auth_login_title: "Sign in to your account",
    auth_login_sub: "Sign in to download the app or buy a key.",
    auth_register_title: "Create an account",
    auth_register_sub: "Fill in the details — we'll send a verification code to your email.",
    login_label: "Username",
    login_placeholder: "your_login",
    password_label: "Password",
    password_placeholder: "At least 6 characters",
    confirm_password_label: "Confirm password",
    field_required: "Field is required",
    login_min: "Username must be at least 3 characters",
    pass_min: "Password must be at least 6 characters",
    pass_mismatch: "Passwords do not match",
    have_account: "Already have an account?",
    no_account: "Don't have an account yet?",
    to_login: "Sign in",
    to_register: "Sign up",
    submit_login: "Sign in",
    submit_register: "Create account",
    verify_title: "Verify your email",
    verify_sub: "We sent a code to",
    verify_code_label: "Code from email",
    verify_continue: "Confirm",
    verify_resend: "Resend code",
    auth_required: "Sign in required",
    auth_required_sub: "Please sign in or create an account to continue.",
    forgot_password: "Forgot password?",
    reset_title: "Reset password",
    reset_sub: "Enter your email — we'll send a code to reset your password.",
    reset_send: "Send code",
    reset_verify_title: "Enter the code",
    reset_verify_sub: "We sent a code to",
    reset_new_title: "New password",
    reset_new_sub: "Choose a new password for your account.",
    new_password_label: "New password",
    confirm_new_password_label: "Confirm new password",
    reset_done: "Password updated",
    reset_done_sub: "You can now sign in with your new password.",
    reset_back: "Back to sign in",
    reset_save: "Save password",

    profile: "Profile",
    profile_open: "Open profile",
    upload_photo: "Upload photo",
    change_photo: "Change photo",
    sub_status: "Subscription status",
    sub_active: "Active",
    sub_inactive: "No active subscription",
    reg_date: "Registration date",
    logout: "Sign out",
  },
} as const

type Method = "crypto" | "funpay"
type AuthTab = "login" | "register"
type AuthStep = "form" | "verify" | "reset_request" | "reset_verify" | "reset_new" | "reset_done"

type User = {
  email: string
  login: string
  avatar: string | null
  registeredAt: string
  subscriptionActive: boolean
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("ru")
  const [dark, setDark] = useState(false)
  const t = dict[lang]

  // Auth state (UI only — wire up your backend later)
  const [user, setUser] = useState<User | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authTab, setAuthTab] = useState<AuthTab>("login")
  const [authStep, setAuthStep] = useState<AuthStep>("form")

  // Profile menu
  const [profileOpen, setProfileOpen] = useState(false)

  // Pay modal
  const [payOpen, setPayOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [emailTouched, setEmailTouched] = useState(false)
  const [method, setMethod] = useState<Method>("crypto")

  // Replace these URLs later with your real links
  const FUNPAY_URL = "https://funpay.com/"
  const CRYPTOPAY_URL = "https://t.me/send?start="

  const emailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email],
  )

  useEffect(() => {
    if (!payOpen && !authOpen && !profileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPayOpen(false)
        setAuthOpen(false)
        setProfileOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [payOpen, authOpen, profileOpen])

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add("dark")
    else root.classList.remove("dark")
  }, [dark])

  const requireAuth = (next: () => void) => {
    if (!user) {
      setAuthTab("login")
      setAuthStep("form")
      setAuthOpen(true)
      return
    }
    next()
  }

  const openPay = () => {
    requireAuth(() => {
      if (user) setEmail(user.email)
      setEmailTouched(false)
      setPayOpen(true)
    })
  }

  const openDownload = () => {
    requireAuth(() => {
      // Hook up your real download link later
      window.open("#", "_blank", "noopener,noreferrer")
    })
  }

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailTouched(true)
    if (!emailValid) return
    const url = method === "funpay" ? FUNPAY_URL : CRYPTOPAY_URL
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleAuthSuccess = (data: { email: string; login: string }) => {
    setUser({
      email: data.email,
      login: data.login,
      avatar: null,
      registeredAt: new Date().toISOString(),
      subscriptionActive: false,
    })
    setAuthOpen(false)
    setAuthStep("form")
  }

  const handleAvatarChange = (file: File) => {
    const url = URL.createObjectURL(file)
    setUser((u) => (u ? { ...u, avatar: url } : u))
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
            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              aria-label={t.profile_open}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card pl-1 pr-3 text-xs font-medium transition hover:scale-[1.03] hover:border-primary/50 soft-shadow"
            >
              <Avatar src={user.avatar} fallback={user.login} className="h-7 w-7" />
              <span className="hidden sm:inline max-w-[120px] truncate">{user.login}</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setAuthTab("login")
                  setAuthStep("form")
                  setAuthOpen(true)
                }}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:scale-[1.03] hover:border-primary/50 soft-shadow"
              >
                {t.sign_in}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthTab("register")
                  setAuthStep("form")
                  setAuthOpen(true)
                }}
                className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:scale-[1.03] hover:brightness-105 soft-shadow"
              >
                {t.sign_up}
              </button>
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

      {/* Auth modal */}
      {authOpen && (
        <AuthModal
          t={t}
          tab={authTab}
          step={authStep}
          onTab={(v) => {
            setAuthTab(v)
            setAuthStep("form")
          }}
          onStep={setAuthStep}
          onClose={() => setAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Profile modal */}
      {profileOpen && user && (
        <ProfileModal
          t={t}
          lang={lang}
          user={user}
          onClose={() => setProfileOpen(false)}
          onAvatar={handleAvatarChange}
          onLogout={() => {
            setUser(null)
            setProfileOpen(false)
          }}
        />
      )}

      {/* Pay modal */}
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

type T = (typeof dict)["ru"]

function AuthModal({
  t,
  tab,
  step,
  onTab,
  onStep,
  onClose,
  onSuccess,
}: {
  t: T
  tab: AuthTab
  step: AuthStep
  onTab: (v: AuthTab) => void
  onStep: (v: AuthStep) => void
  onClose: () => void
  onSuccess: (data: { email: string; login: string }) => void
}) {
  const [email, setEmail] = useState("")
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [code, setCode] = useState("")
  const [touched, setTouched] = useState(false)
  const [newPass, setNewPass] = useState("")
  const [newPassConfirm, setNewPassConfirm] = useState("")

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const loginValid = login.trim().length >= 3
  const passValid = password.length >= 6
  const confirmValid = password === confirm
  const newPassValid = newPass.length >= 6
  const newPassConfirmValid = newPass === newPassConfirm

  const goStep = (s: AuthStep) => {
    setTouched(false)
    onStep(s)
  }

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (tab === "login") {
      if (!emailValid || !passValid) return
      onSuccess({ email: email.trim(), login: email.split("@")[0] })
    } else {
      if (!emailValid || !loginValid || !passValid || !confirmValid) return
      // Move to email verification step (UI only)
      onStep("verify")
      setTouched(false)
    }
  }

  const submitVerify = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (code.trim().length < 4) return
    onSuccess({ email: email.trim(), login: login.trim() })
  }

  const submitResetRequest = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!emailValid) return
    setCode("")
    goStep("reset_verify")
  }

  const submitResetVerify = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (code.trim().length < 4) return
    setNewPass("")
    setNewPassConfirm("")
    goStep("reset_new")
  }

  const submitResetNew = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!newPassValid || !newPassConfirmValid) return
    goStep("reset_done")
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label={t.pay_close}
        onClick={onClose}
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm animate-fade-in"
      />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 soft-shadow animate-pop-in">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.pay_close}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:rotate-90 hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        {step === "form" ? (
          <>
            <div className="mb-4 inline-flex items-center rounded-full border border-border bg-background p-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => onTab("login")}
                aria-pressed={tab === "login"}
                className={`rounded-full px-3 py-1.5 transition ${
                  tab === "login"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.sign_in}
              </button>
              <button
                type="button"
                onClick={() => onTab("register")}
                aria-pressed={tab === "register"}
                className={`rounded-full px-3 py-1.5 transition ${
                  tab === "register"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.sign_up}
              </button>
            </div>

            <h3 id="auth-title" className="text-balance text-lg font-semibold tracking-tight">
              {tab === "login" ? t.auth_login_title : t.auth_register_title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {tab === "login" ? t.auth_login_sub : t.auth_register_sub}
            </p>

            <form onSubmit={submitForm} className="mt-5 space-y-4">
              <Field
                id="auth-email"
                label={t.email_label}
                icon={<Mail className="h-4 w-4" />}
                type="email"
                value={email}
                onChange={setEmail}
                placeholder={t.email_placeholder}
                error={touched && !emailValid ? t.email_error : undefined}
              />

              {tab === "register" && (
                <Field
                  id="auth-login"
                  label={t.login_label}
                  icon={<AtSign className="h-4 w-4" />}
                  type="text"
                  value={login}
                  onChange={setLogin}
                  placeholder={t.login_placeholder}
                  error={touched && !loginValid ? t.login_min : undefined}
                />
              )}

              <Field
                id="auth-pass"
                label={t.password_label}
                icon={<Lock className="h-4 w-4" />}
                type="password"
                value={password}
                onChange={setPassword}
                placeholder={t.password_placeholder}
                error={touched && !passValid ? t.pass_min : undefined}
              />

              {tab === "register" && (
                <Field
                  id="auth-confirm"
                  label={t.confirm_password_label}
                  icon={<Lock className="h-4 w-4" />}
                  type="password"
                  value={confirm}
                  onChange={setConfirm}
                  placeholder={t.password_placeholder}
                  error={touched && !confirmValid ? t.pass_mismatch : undefined}
                />
              )}

              {tab === "login" && (
                <button
                  type="button"
                  onClick={() => goStep("reset_request")}
                  className="block w-full text-right text-xs font-medium text-primary hover:underline"
                >
                  {t.forgot_password}
                </button>
              )}

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] soft-shadow"
              >
                {tab === "login" ? t.submit_login : t.submit_register}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <p className="text-center text-xs text-muted-foreground">
                {tab === "login" ? t.no_account : t.have_account}{" "}
                <button
                  type="button"
                  onClick={() => onTab(tab === "login" ? "register" : "login")}
                  className="font-semibold text-primary hover:underline"
                >
                  {tab === "login" ? t.to_register : t.to_login}
                </button>
              </p>
            </form>
          </>
        ) : step === "verify" ? (
          <>
            <h3 id="auth-title" className="text-balance text-lg font-semibold tracking-tight">
              {t.verify_title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {t.verify_sub} <span className="font-medium text-foreground">{email}</span>
            </p>

            <form onSubmit={submitVerify} className="mt-5 space-y-4">
              <Field
                id="auth-code"
                label={t.verify_code_label}
                icon={<CheckCircle2 className="h-4 w-4" />}
                type="text"
                value={code}
                onChange={setCode}
                placeholder="••••••"
                error={touched && code.trim().length < 4 ? t.field_required : undefined}
              />

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] soft-shadow"
              >
                {t.verify_continue}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => {
                  // wire up resend later
                }}
                className="block w-full text-center text-xs text-muted-foreground hover:text-foreground"
              >
                {t.verify_resend}
              </button>
            </form>
          </>
        ) : step === "reset_request" ? (
          <>
            <h3 id="auth-title" className="text-balance text-lg font-semibold tracking-tight">
              {t.reset_title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.reset_sub}</p>

            <form onSubmit={submitResetRequest} className="mt-5 space-y-4">
              <Field
                id="reset-email"
                label={t.email_label}
                icon={<Mail className="h-4 w-4" />}
                type="email"
                value={email}
                onChange={setEmail}
                placeholder={t.email_placeholder}
                error={touched && !emailValid ? t.email_error : undefined}
              />

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] soft-shadow"
              >
                {t.reset_send}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => goStep("form")}
                className="block w-full text-center text-xs text-muted-foreground hover:text-foreground"
              >
                {t.reset_back}
              </button>
            </form>
          </>
        ) : step === "reset_verify" ? (
          <>
            <h3 id="auth-title" className="text-balance text-lg font-semibold tracking-tight">
              {t.reset_verify_title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {t.reset_verify_sub} <span className="font-medium text-foreground">{email}</span>
            </p>

            <form onSubmit={submitResetVerify} className="mt-5 space-y-4">
              <Field
                id="reset-code"
                label={t.verify_code_label}
                icon={<CheckCircle2 className="h-4 w-4" />}
                type="text"
                value={code}
                onChange={setCode}
                placeholder="••••••"
                error={touched && code.trim().length < 4 ? t.field_required : undefined}
              />

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] soft-shadow"
              >
                {t.verify_continue}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => {
                  // wire up resend later
                }}
                className="block w-full text-center text-xs text-muted-foreground hover:text-foreground"
              >
                {t.verify_resend}
              </button>
            </form>
          </>
        ) : step === "reset_new" ? (
          <>
            <h3 id="auth-title" className="text-balance text-lg font-semibold tracking-tight">
              {t.reset_new_title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.reset_new_sub}</p>

            <form onSubmit={submitResetNew} className="mt-5 space-y-4">
              <Field
                id="reset-new"
                label={t.new_password_label}
                icon={<Lock className="h-4 w-4" />}
                type="password"
                value={newPass}
                onChange={setNewPass}
                placeholder={t.password_placeholder}
                error={touched && !newPassValid ? t.pass_min : undefined}
              />
              <Field
                id="reset-new-confirm"
                label={t.confirm_new_password_label}
                icon={<Lock className="h-4 w-4" />}
                type="password"
                value={newPassConfirm}
                onChange={setNewPassConfirm}
                placeholder={t.password_placeholder}
                error={touched && !newPassConfirmValid ? t.pass_mismatch : undefined}
              />

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] soft-shadow"
              >
                {t.reset_save}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary animate-pop-in">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 id="auth-title" className="mt-3 text-balance text-center text-lg font-semibold tracking-tight">
              {t.reset_done}
            </h3>
            <p className="mt-1 text-center text-sm leading-relaxed text-muted-foreground">
              {t.reset_done_sub}
            </p>
            <button
              type="button"
              onClick={() => {
                setPassword("")
                setConfirm("")
                goStep("form")
              }}
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] soft-shadow"
            >
              {t.reset_back}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function Field({
  id,
  label,
  icon,
  type,
  value,
  onChange,
  placeholder,
  error,
}: {
  id: string
  label: string
  icon: React.ReactNode
  type: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="relative mt-1.5">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-invalid={!!error}
          className={`w-full rounded-xl border bg-background py-2.5 pl-9 pr-3 text-sm outline-none transition focus:ring-2 ${
            error
              ? "border-destructive/60 focus:ring-destructive/30"
              : "border-border focus:border-primary/60 focus:ring-primary/25"
          }`}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive animate-fade-in">{error}</p>}
    </div>
  )
}

function ProfileModal({
  t,
  lang,
  user,
  onClose,
  onAvatar,
  onLogout,
}: {
  t: T
  lang: Lang
  user: User
  onClose: () => void
  onAvatar: (file: File) => void
  onLogout: () => void
}) {
  const fileRef = useRef<HTMLInputElement | null>(null)

  const formatted = useMemo(() => {
    try {
      return new Date(user.registeredAt).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    } catch {
      return user.registeredAt
    }
  }, [user.registeredAt, lang])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label={t.pay_close}
        onClick={onClose}
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm animate-fade-in"
      />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 soft-shadow animate-pop-in">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.pay_close}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:rotate-90 hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 id="profile-title" className="text-balance text-lg font-semibold tracking-tight">
          {t.profile}
        </h3>

        <div className="mt-5 flex items-center gap-4">
          <div className="relative">
            <Avatar src={user.avatar} fallback={user.login} className="h-20 w-20 text-xl" />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              aria-label={user.avatar ? t.change_photo : t.upload_photo}
              className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:scale-110 soft-shadow"
            >
              <Camera className="h-4 w-4" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onAvatar(file)
                e.target.value = ""
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="truncate text-sm font-semibold">{user.login}</span>
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <InfoRow
            icon={<BadgeCheck className="h-4 w-4" />}
            label={t.sub_status}
            value={
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  user.subscriptionActive
                    ? "bg-accent/40 text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    user.subscriptionActive ? "bg-accent-foreground" : "bg-muted-foreground"
                  }`}
                />
                {user.subscriptionActive ? t.sub_active : t.sub_inactive}
              </span>
            }
          />
          <InfoRow
            icon={<Calendar className="h-4 w-4" />}
            label={t.reg_date}
            value={<span className="text-sm font-medium">{formatted}</span>}
          />
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:scale-[1.02] hover:border-destructive/50 hover:text-destructive active:scale-[0.98]"
        >
          <LogOut className="h-4 w-4" />
          {t.logout}
        </button>
      </div>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 transition hover:-translate-y-0.5 hover:border-primary/40">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div>{value}</div>
    </div>
  )
}
