"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"
import Link from "next/link"
import { AppLogo } from "@/components/app-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError, FieldContent } from "@/components/ui/field"
import { VerificationModal } from "@/components/verification-modal"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<"email" | "reset">("email")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [verifiedCode, setVerifiedCode] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: { email: "", newPassword: "" }
  })

  const handleSendCode = async () => {
    const emailValue = getValues("email")
    setLoading(true)
    const { ok, data } = await apiClient("/api/auth/request-password-reset", {
      method: "POST",
      body: JSON.stringify({ email: emailValue }),
    })
    setLoading(false)

    if (ok) {
      setEmail(emailValue)
      setIsModalOpen(true)
    } else {
      toast.error(data.message || "Ошибка отправки кода")
    }
  }

  const handleVerified = (code: string) => {
    setVerifiedCode(code)
    setStep("reset")
  }

  const handleResetPassword = async () => {
    const newPassword = getValues("newPassword")
    setLoading(true)
    const { ok, data } = await apiClient("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, code: verifiedCode, newPassword }),
    })
    setLoading(false)

    if (ok) {
      toast.success("Пароль успешно изменен!")
      router.push("/login")
    } else {
      toast.error(data.message || "Ошибка сброса пароля")
    }
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-8 soft-shadow animate-pop-in">
        <div className="flex flex-col items-center mb-6">
          <AppLogo className="mb-4" textClassName="text-xl" />
          <h1 className="text-2xl font-semibold tracking-tight">Сброс пароля</h1>
        </div>

        {step === "email" ? (
          <div className="space-y-4">
            <Field>
              <FieldLabel>E-mail</FieldLabel>
              <Input {...register("email")} type="email" placeholder="you@example.com" />
            </Field>
            <Button onClick={handleSendCode} className="w-full" disabled={loading}>
              {loading ? "Отправка..." : "Получить код"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Field>
              <FieldLabel>Новый пароль</FieldLabel>
              <Input {...register("newPassword")} type="password" placeholder="Минимум 8 символов" />
            </Field>
            <Button onClick={handleResetPassword} className="w-full" disabled={loading}>
              {loading ? "Сохранение..." : "Сбросить пароль"}
            </Button>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link href="/login" className="font-semibold text-primary hover:underline flex items-center justify-center">
            <ArrowLeft className="h-3 w-3 mr-1" /> Назад к входу
          </Link>
        </p>
      </div>

      <VerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={getValues("email")}
        onVerified={handleVerified}
      />
    </main>
  )
}
