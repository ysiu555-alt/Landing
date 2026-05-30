"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, AtSign, Lock, ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { registerSchema, type RegisterFormData } from "@/lib/schemas"
import { AppLogo } from "@/components/app-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError, FieldContent } from "@/components/ui/field"
import type { RegisterResponse } from "@/lib/types"
import { VerificationModal } from "@/components/verification-modal"

export default function RegisterPage() {
  const router = useRouter()
  const { t } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<RegisterFormData | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (values: RegisterFormData) => {
    setLoading(true)
    // 1. Сначала запрашиваем код
    const { ok, data } = await apiClient("/api/auth/send-code", {
      method: "POST",
      body: JSON.stringify({ email: values.email }),
    })

    if (ok) {
      setFormData(values)
      setIsModalOpen(true)
    } else {
      toast.error(data.message || "Ошибка отправки кода")
    }
    setLoading(false)
  }

  const handleVerified = async (code: string) => {
    if (!formData) return
    setLoading(true)
    try {
      const { ok, data } = await apiClient<RegisterResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          code, // Передаем код для подтверждения регистрации
        }),
      })

      if (ok) {
        if (data.trial_granted) {
          toast.success("Регистрация успешна! Вам начислен бесплатный доступ на 3 дня.")
        } else {
          toast.info("Регистрация успешна! (С вашего IP уже активировался триал, создан пустой аккаунт).")
        }
        router.push("/login")
      } else {
        toast.error(data.message || t.error_server)
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
          <h1 className="text-2xl font-semibold tracking-tight">{t.register_title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.register_subtitle}</p>
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
                placeholder="Минимум 8 символов"
                className="pl-9 rounded-xl py-5"
                {...register("password")}
                aria-invalid={!!errors.password}
              />
            </FieldContent>
            {errors.password && <FieldError className="mt-1">{errors.password.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm" className="text-xs font-medium text-muted-foreground">Повторите пароль</FieldLabel>
            <FieldContent className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Input
                id="confirm"
                type="password"
                placeholder="Повторите пароль"
                className="pl-9 rounded-xl py-5"
                {...register("confirm")}
                aria-invalid={!!errors.confirm}
              />
            </FieldContent>
            {errors.confirm && <FieldError className="mt-1">{errors.confirm.message}</FieldError>}
          </Field>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full py-6 text-sm font-semibold soft-shadow transition hover:scale-[1.02]"
          >
            {loading ? t.loading : t.sign_up}
            {!loading && <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          {t.have_account}{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            {t.sign_in}
          </Link>
        </p>
      </div>
      
      {formData && (
        <VerificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          email={formData.email}
          onVerified={handleVerified}
        />
      )}
    </main>
  )
}
