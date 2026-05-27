"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  User,
  Mail,
  BadgeCheck,
  Calendar,
  LogOut,
  Sparkles,
  CreditCard,
  Ticket,
  ArrowRight,
} from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"
import Link from "next/link"

type SubscriptionType = "TRIAL_3DAYS" | "WEEK_2" | "MONTH_1" | "LIFETIME" | "NONE"

interface UserData {
  email: string
  subscription_type: SubscriptionType
  expires_at: string | null
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [coupon, setCoupon] = useState("")
  const [couponLoading, setCouponLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("vortex_jwt_token")
    if (!token) {
      router.push("/login")
      return
    }

    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const { ok, data } = await apiClient("/api/auth/me")
      if (ok) {
        setUser(data)
      } else {
        localStorage.removeItem("vortex_jwt_token")
        router.push("/login")
      }
    } catch (error) {
      toast.error("Ошибка загрузки данных профиля")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("vortex_jwt_token")
    router.push("/login")
  }

  const handlePurchase = async (planType: string) => {
    try {
      const { ok, data } = await apiClient("/api/billing/buy", {
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
      const { ok, data } = await apiClient("/api/billing/redeem", {
        method: "POST",
        body: JSON.stringify({ code: coupon }),
      })

      if (ok) {
        toast.success(`Успешно! Активирован тариф: ${data.plan_name || "Подписка обновлена"}`)
        setCoupon("")
        fetchUserData() // Refresh data
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
    if (type === "LIFETIME") return "Навсегда"
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

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <div className="animate-pulse text-primary font-semibold">Загрузка...</div>
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
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary transition hover:rotate-6 hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-sans text-base font-semibold tracking-tight">Vortex</span>
        </Link>

        <button
          onClick={handleLogout}
          className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card px-4 text-xs font-medium text-destructive transition hover:scale-[1.03] hover:border-destructive/50 soft-shadow"
        >
          <LogOut className="h-4 w-4" />
          <span>Выйти</span>
        </button>
      </header>

      <section className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight mb-8">Личный кабинет</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {/* User Info Card */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 soft-shadow animate-fade-up">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Профиль
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    E-mail
                  </div>
                  <div className="text-sm font-medium">{user?.email}</div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BadgeCheck className="h-4 w-4" />
                    Тип подписки
                  </div>
                  <div className="text-sm font-semibold text-primary">
                    {user?.subscription_type === "NONE" ? "Подписка отсутствует" : user?.subscription_type}
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Действует до
                  </div>
                  <div className="text-sm font-medium">
                    {formatExpiry(user?.expires_at || null, user?.subscription_type || "NONE")}
                  </div>
                </div>
              </div>
            </div>

            {/* Redeem Code Card */}
            <div className="rounded-2xl border border-border bg-card p-6 soft-shadow animate-fade-up delay-100">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Ticket className="h-5 w-5 text-accent" />
                Активация кода
              </h2>
              <form onSubmit={handleRedeemCode} className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Введите код (например, с FunPay)"
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
                />
                <button
                  type="submit"
                  disabled={couponLoading || !coupon.trim()}
                  className="rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-105 active:scale-95 disabled:opacity-50"
                >
                  {couponLoading ? "..." : "Активировать"}
                </button>
              </form>
            </div>
          </div>

          {/* Billing Sidebar */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 px-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Тарифы
            </h2>
            <PlanCard
              name="2 Недели"
              price="290 ₽"
              type="WEEK_2"
              onClick={() => handlePurchase("WEEK_2")}
            />
            <PlanCard
              name="1 Месяц"
              price="490 ₽"
              type="MONTH_1"
              highlight
              onClick={() => handlePurchase("MONTH_1")}
            />
            <PlanCard
              name="Навсегда"
              price="1990 ₽"
              type="LIFETIME"
              onClick={() => handlePurchase("LIFETIME")}
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
  type,
  highlight = false,
  onClick,
}: {
  name: string
  price: string
  type: string
  highlight?: boolean
  onClick: () => void
}) {
  return (
    <div
      className={`rounded-2xl border p-5 transition hover:-translate-y-1 soft-shadow animate-fade-up ${
        highlight ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border bg-card"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${highlight ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
          {name}
        </span>
      </div>
      <div className="text-2xl font-bold mb-4">{price}</div>
      <button
        onClick={onClick}
        className={`group flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${
          highlight
            ? "bg-primary text-primary-foreground hover:brightness-110"
            : "border border-border bg-background hover:border-primary/50 hover:text-primary"
        }`}
      >
        Купить
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
    </div>
  )
}
