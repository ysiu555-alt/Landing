/** @jsxImportSource react */
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Mail,
  BadgeCheck,
  Calendar,
  LogOut,
  CreditCard,
  Ticket,
  ArrowRight,
  Download,
  Zap,
  ExternalLink
} from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { AppLogo } from "@/components/app-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { SubscriptionType, BuyResponse, RedeemResponse } from "@/lib/types"
import { SITE_CONFIG } from "@/lib/config"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading, logout, t, refreshUser } = useAuth()
  const [coupon, setCoupon] = React.useState("")
  const [couponLoading, setCouponLoading] = React.useState(false)

  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = SITE_CONFIG.downloadUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    <main className="relative min-h-svh overflow-hidden bg-[#050508] text-[#E0E0E6]">
      {/* Background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 -z-0 h-[600px] w-[600px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "oklch(0.6 0.16 250)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 -z-0 h-[500px] w-[500px] rounded-full opacity-10 blur-[120px]"
        style={{ background: "oklch(0.6 0.16 250)" }}
      />
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-8 py-8 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Zap className="h-6 w-6 text-white fill-white" />
          </div>
          <span className="text-xl font-black italic tracking-tighter uppercase">Kaliang</span>
        </div>

        <Button
          variant="ghost"
          onClick={logout}
          className="rounded-2xl h-12 gap-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 font-bold transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>{t.logout}</span>
        </Button>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-8 py-10">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter italic uppercase">{t.dashboard}</h1>
          <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest opacity-40">Управление лицензией и профилем</p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <Card className="rounded-[40px] border-white/5 bg-white/[0.02] shadow-2xl overflow-hidden animate-fade-up">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-black italic uppercase flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  {t.profile}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <div className="flex items-center gap-4">
                    <div className="text-muted-foreground"><Mail className="h-5 w-5" /></div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mb-1">{t.email}</p>
                      <p className="font-bold text-lg">{user?.email}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-primary"><BadgeCheck className="h-5 w-5" /></div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">{t.sub_type}</p>
                    </div>
                    <p className="font-black text-2xl text-primary italic uppercase tracking-tighter">
                      {user?.subscription_type === "NONE" ? t.no_sub : user?.subscription_type}
                    </p>
                  </div>
                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-muted-foreground"><Calendar className="h-5 w-5" /></div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50">{t.expires_at}</p>
                    </div>
                    <p className="font-bold text-lg">
                      {formatExpiry(user?.expires_at || null, user?.subscription_type || "NONE")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="rounded-[40px] border-white/5 bg-white/[0.02] overflow-hidden animate-fade-up delay-100">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-lg font-black italic uppercase flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Download className="h-5 w-5" />
                    </div>
                    {t.download_title || "Программа"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  {user?.subscription_type !== "NONE" ? (
                    <Button
                      className="w-full rounded-2xl py-8 text-lg font-black uppercase tracking-tighter shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                      onClick={handleDownload}
                    >
                      {t.download_button || "СКАЧАТЬ"}
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <Button
                        disabled
                        className="w-full rounded-2xl py-8 text-lg font-black opacity-20 grayscale"
                        variant="outline"
                      >
                        НЕТ ДОСТУПА
                      </Button>
                      <p className="text-[10px] text-center font-bold uppercase tracking-widest text-muted-foreground opacity-40">Нужна подписка</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-[40px] border-white/5 bg-white/[0.02] overflow-hidden animate-fade-up delay-200">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-lg font-black italic uppercase flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Ticket className="h-5 w-5" />
                    </div>
                    {t.redeem_code}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <form onSubmit={handleRedeemCode} className="space-y-4">
                    <Input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="КЛЮЧ АКТИВАЦИИ"
                      className="w-full rounded-2xl border-white/10 bg-white/[0.03] px-6 py-7 text-sm font-bold uppercase tracking-widest focus:border-primary/50 transition-all"
                    />
                    <Button
                      type="submit"
                      disabled={couponLoading || !coupon.trim()}
                      variant="outline"
                      className="w-full rounded-2xl py-7 text-sm font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all border-white/5"
                    >
                      {couponLoading ? "..." : t.activate}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-black italic uppercase flex items-center gap-3 px-4">
              <CreditCard className="h-6 w-6 text-primary" />
              {t.plans_title}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <PlanCard
                name={t.week_2}
                price="50 ₽"
                onClick={() => handlePurchase("WEEK_2")}
                t={t}
              />
              <PlanCard
                name={t.month_1}
                price="70 ₽"
                highlight
                onClick={() => handlePurchase("MONTH_1")}
                t={t}
              />
              <PlanCard
                name={t.forever}
                price="500 ₽"
                onClick={() => handlePurchase("LIFETIME")}
                t={t}
              />
            </div>
          </div>
        </div>
        
        {/* Footer Funpay Block */}
        <div className="mt-12 max-w-sm">
          <Card className="rounded-3xl border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-sm">
            <CardContent className="p-8 flex flex-col gap-5">
              <h3 className="text-xl font-black italic uppercase tracking-tighter">Funpay</h3>
              <p className="text-muted-foreground text-sm font-bold">Официальный Funpay для покупки ключей</p>
              <Button
                variant="secondary"
                className="w-full rounded-2xl py-6 font-black uppercase tracking-widest shadow-lg shadow-black/20 hover:bg-primary hover:text-white transition-all"
                onClick={() => window.open("https://funpay.com/users/19751070/", "_blank")}
              >
                Перейти
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
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
    <div
      className={`rounded-[32px] border p-6 transition-all duration-300 group hover:-translate-y-1 ${
        highlight 
          ? "border-primary/40 bg-primary/10 shadow-[0_0_40px_rgba(var(--primary),0.1)]" 
          : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${highlight ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/10 text-muted-foreground'}`}>
          {name}
        </span>
      </div>
      <div className="text-3xl font-black italic tracking-tighter mb-6 group-hover:scale-105 transition-transform">{price}</div>
      <Button
        onClick={onClick}
        variant={highlight ? "default" : "outline"}
        className={`w-full rounded-2xl py-6 text-xs font-black uppercase tracking-widest transition-all ${
          !highlight && "border-white/5 hover:border-primary/50 hover:bg-primary/10"
        } ${highlight && "shadow-xl shadow-primary/20"}`}
      >
        {t.buy_button}
        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  )
}
