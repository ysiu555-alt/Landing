"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  User,
  Mail,
  BadgeCheck,
  Calendar,
  LogOut,
  CreditCard,
  Ticket,
  ArrowRight,
} from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { AppLogo } from "@/components/app-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { SubscriptionType, BuyResponse, RedeemResponse } from "@/lib/types"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading, logout, t, refreshUser } = useAuth()
  const [coupon, setCoupon] = useState("")
  const [couponLoading, setCouponLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  const handlePurchase = async (planType: string) => {
    try {
      const { ok, data } = await apiClient<BuyResponse>("/api/billing/buy", {
        method: "POST",
        body: JSON.stringify({ plan: planType }),
      })

      if (ok && data.pay_url) {
        window.location.href = data.pay_url
      } else {
        toast.error(data.message || "Ошибка при создании платежа")
      }
    } catch (error) {
      toast.error("Ошибка при подключении к платежному шлюзу")
    }
  }

  const handleRedeemCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!coupon.trim()) return

    setCouponLoading(true)
    try {
      const { ok, data } = await apiClient<RedeemResponse>("/api/billing/redeem", {
        method: "POST",
        body: JSON.stringify({ code: coupon }),
      })

      if (ok) {
        toast.success(`Успешно! Активирован тариф: ${data.plan_name || "Подписка обновлена"}`)
        setCoupon("")
        refreshUser()
      } else {
        toast.error(data.message || "Код не существует или уже активирован")
      }
    } catch (error) {
      toast.error("Ошибка активации кода")
    } finally {
      setCouponLoading(false)
    }
  }

  const formatExpiry = (dateStr: string | null, type: SubscriptionType) => {
    if (type === "LIFETIME") return t.forever
    if (!dateStr) return "—"
    try {
      return new Date(dateStr).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateStr
    }
  }

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <div className="animate-pulse text-primary font-semibold">{t.loading}</div>
      </div>
    )
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
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

      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-6 animate-fade-up">
        <AppLogo />

        <Button
          variant="outline"
          onClick={logout}
          className="rounded-full h-9 gap-2 text-destructive border-border soft-shadow transition hover:border-destructive/50"
        >
          <LogOut className="h-4 w-4" />
          <span>{t.logout}</span>
        </Button>
      </header>

      <section className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight mb-8">{t.dashboard}</h1>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card className="rounded-2xl border-border bg-card soft-shadow animate-fade-up">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  {t.profile}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {t.email}
                  </div>
                  <div className="text-sm font-medium">{user?.email}</div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BadgeCheck className="h-4 w-4" />
                    {t.sub_type}
                  </div>
                  <div className="text-sm font-semibold text-primary">
                    {user?.subscription_type === "NONE" ? t.no_sub : user?.subscription_type}
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {t.expires_at}
                  </div>
                  <div className="text-sm font-medium">
                    {formatExpiry(user?.expires_at || null, user?.subscription_type || "NONE")}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border bg-card soft-shadow animate-fade-up delay-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-accent" />
                  {t.redeem_code}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRedeemCode} className="flex gap-2">
                  <Input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder={t.code_placeholder}
                    className="flex-1 rounded-xl border-border bg-background px-4 py-5 text-sm"
                  />
                  <Button
                    type="submit"
                    disabled={couponLoading || !coupon.trim()}
                    className="rounded-xl px-6 py-5 text-sm font-semibold soft-shadow"
                  >
                    {couponLoading ? "..." : t.activate}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 px-2">
              <CreditCard className="h-5 w-5 text-primary" />
              {t.plans_title}
            </h2>
            <PlanCard
              name={t.week_2}
              price="290 ₽"
              onClick={() => handlePurchase("WEEK_2")}
              t={t}
            />
            <PlanCard
              name={t.month_1}
              price="490 ₽"
              highlight
              onClick={() => handlePurchase("MONTH_1")}
              t={t}
            />
            <PlanCard
              name={t.forever}
              price="1990 ₽"
              onClick={() => handlePurchase("LIFETIME")}
              t={t}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

function PlanCard({
  name,
  price,
  highlight = false,
  onClick,
  t,
}: {
  name: string
  price: string
  highlight?: boolean
  onClick: () => void
  t: any
}) {
  return (
    <Card
      className={`rounded-2xl border p-5 transition hover:-translate-y-1 soft-shadow animate-fade-up ${
        highlight ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border bg-card"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${highlight ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          {name}
        </span>
      </div>
      <div className="text-2xl font-bold mb-4">{price}</div>
      <Button
        onClick={onClick}
        variant={highlight ? "default" : "outline"}
        className={`group w-full rounded-xl py-5 text-sm font-semibold soft-shadow transition ${
          !highlight && "hover:border-primary/50 hover:text-primary bg-background"
        }`}
      >
        {t.buy_button}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </Button>
    </Card>
  )
}
