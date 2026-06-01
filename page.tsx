"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, ArrowRight, Zap } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { registerSchema, type RegisterFormData } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError, FieldContent } from "@/components/ui/field"
import type { RegisterResponse } from "@/lib/types"

export default function RegisterPage() {
  const router = useRouter()
  const { t, user, loading: authLoading } = useAuth()
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
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (values: RegisterFormData) => {
    setLoading(true)
    try {
      const { ok, data } = await apiClient<RegisterResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
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
    <main className="relative min-h-svh overflow-hidden bg-[#050508] text-[#E0E0E6] flex items-center justify-center p-6">
      {/* Background effects */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 -z-0 h-[600px] w-[600px] rounded-full opacity-20 blur-[120px] animate-blob"
        style={{ background: "oklch(0.6 0.16 250)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-24 -z-0 h-[500px] w-[500px] rounded-full opacity-15 blur-[120px] animate-blob-alt"
        style={{ background: "oklch(0.6 0.16 250)" }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex items-center gap-3 mb-8 group transition-transform hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="h-7 w-7 text-white fill-white" />
            </div>
            <span className="text-2xl font-black italic tracking-tighter uppercase">Kaliang</span>
          </Link>
          <h1 className="text-4xl font-black tracking-tighter italic uppercase text-center">{t.register_title}</h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em] mt-2 opacity-50">{t.register_subtitle}</p>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-10 backdrop-blur-md shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Field>
              <FieldLabel htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mb-2 block ml-1">
                E-MAIL
              </FieldLabel>
              <FieldContent className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 z-10" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-14 pr-6 rounded-2xl border-white/10 bg-white/[0.03] py-7 text-sm font-bold focus:border-primary/50 transition-all placeholder:text-white/10 text-center"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
              </FieldContent>
              {errors.email && <FieldError className="mt-2 ml-1 text-xs font-bold uppercase tracking-wider text-red-400 opacity-80">{errors.email.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mb-2 block ml-1">
                {t.password || "ПАРОЛЬ"}
              </FieldLabel>
              <FieldContent className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 z-10" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-14 pr-6 rounded-2xl border-white/10 bg-white/[0.03] py-7 text-sm font-bold focus:border-primary/50 transition-all placeholder:text-white/10 text-center"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                />
              </FieldContent>
              {errors.password && <FieldError className="mt-2 ml-1 text-xs font-bold uppercase tracking-wider text-red-400 opacity-80">{errors.password.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mb-2 block ml-1">
                {t.confirm_password || "ПОВТОРИТЕ ПАРОЛЬ"}
              </FieldLabel>
              <FieldContent className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 z-10" />
                <Input
                  id="confirm"
                  type="password"
                  placeholder="••••••••"
                  className="pl-14 pr-6 rounded-2xl border-white/10 bg-white/[0.03] py-7 text-sm font-bold focus:border-primary/50 transition-all placeholder:text-white/10 text-center"
                  {...register("confirm")}
                  aria-invalid={!!errors.confirm}
                />
              </FieldContent>
              {errors.confirm && <FieldError className="mt-2 ml-1 text-xs font-bold uppercase tracking-wider text-red-400 opacity-80">{errors.confirm.message}</FieldError>}
            </Field>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl py-8 text-lg font-black uppercase tracking-tighter shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 mt-4"
            >
              {loading ? "..." : t.sign_up}
              {!loading && <ArrowRight className="h-5 w-5 ml-2" />}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-40">
              {t.have_account}{" "}
              <Link href="/login" className="text-primary font-black hover:underline ml-1">
                {t.sign_in}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
