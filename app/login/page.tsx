"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { loginSchema, type LoginFormData } from "@/lib/schemas"
import { AppLogo } from "@/components/app-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError, FieldContent } from "@/components/ui/field"
import type { AuthResponse } from "@/lib/types"

export default function LoginPage() {
  const { login, t, user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard")
    }
  }, [user, authLoading, router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values: LoginFormData) => {
    setLoading(true)
    try {
      const { ok, data, status } = await apiClient<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      })

      if (ok && data.token) {
        login(data.token, data.user)
        toast.success(t.success_login)
      } else {
        if (status === 401) {
          toast.error(t.error_auth)
        } else {
          toast.error(data.message || t.error_server)
        }
      }
    } catch (error) {
      toast.error(t.error_server)
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
          <AppLogo className="mb-4" textClassName="text-xl" />
          <h1 className="text-2xl font-semibold tracking-tight">{t.login_title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.login_subtitle}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="email" className="text-xs font-medium text-muted-foreground">E-mail</FieldLabel>
            <FieldContent className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-9 rounded-xl py-5"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
            </FieldContent>
            {errors.email && <FieldError className="mt-1">{errors.email.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="password" className="text-xs font-medium text-muted-foreground">Пароль</FieldLabel>
            <FieldContent className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Input
                id="password"
                type="password"
                placeholder="Ваш пароль"
                className="pl-9 rounded-xl py-5"
                {...register("password")}
                aria-invalid={!!errors.password}
              />
            </FieldContent>
            {errors.password && <FieldError className="mt-1">{errors.password.message}</FieldError>}
          </Field>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full py-6 text-sm font-semibold soft-shadow transition hover:scale-[1.02]"
          >
            {loading ? t.loading : t.sign_in}
            {!loading && <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          {t.no_account}{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            {t.sign_up}
          </Link>
        </p>
      </div>
    </main>
  )
}
