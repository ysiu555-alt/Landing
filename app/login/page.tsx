"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState(false)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const passValid = password.length >= 6

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)

    if (!emailValid || !passValid) return

    setLoading(true)
    try {
      const { ok, data, status } = await apiClient("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })

      if (ok) {
        localStorage.setItem("vortex_jwt_token", data.token)
        toast.success("Успешный вход!")
        router.push("/dashboard")
      } else {
        if (status === 401) {
          toast.error("Неверный логин или пароль")
        } else {
          toast.error(data.message || "Ошибка авторизации")
        }
      }
    } catch (error) {
      toast.error("Произошла ошибка при подключении к серверу")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground flex items-center justify-center p-4">
      {/* Background blobs */}
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

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-8 soft-shadow animate-pop-in">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary transition hover:rotate-6 hover:scale-105">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-sans text-xl font-semibold tracking-tight">Kaliang</span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Вход в аккаунт</h1>
          <p className="text-sm text-muted-foreground mt-1">Войдите, чтобы продолжить</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field
            id="email"
            label="E-mail"
            icon={<Mail className="h-4 w-4" />}
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            error={touched && !emailValid ? "Введите корректный e-mail" : undefined}
          />

          <Field
            id="password"
            label="Пароль"
            icon={<Lock className="h-4 w-4" />}
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Ваш пароль"
            error={touched && !passValid ? "Пароль слишком короткий" : undefined}
          />

          <button
            type="submit"
            disabled={loading}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] soft-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Загрузка..." : "Войти"}
            {!loading && <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Ещё нет аккаунта?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </main>
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
