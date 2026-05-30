/** @jsxImportSource react */
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  const router = useRouter()

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

      <header className="relative z-10 mx-auto flex max-w-4xl items-center justify-between px-8 py-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Zap className="h-6 w-6 text-white fill-white" />
          </div>
          <span className="text-xl font-black italic tracking-tighter uppercase">Kaliang</span>
        </div>
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="rounded-2xl h-12 gap-2 text-muted-foreground hover:text-white hover:bg-white/5 font-bold transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Назад</span>
        </Button>
      </header>

      <section className="relative z-10 mx-auto max-w-4xl px-8 py-10 pb-32">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase mb-2">Пользовательское соглашение</h1>
          <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest opacity-40">(Оферта)</p>
        </div>

        <div className="space-y-10 prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-muted-foreground font-medium">
            Настоящее Соглашение является публичной офертой и регулирует использование программного обеспечения Kaliang — «ПО»
          </p>

          <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-12 space-y-8">
            <div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-4 flex items-center gap-3 text-primary">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs not-italic">1</span>
                Предмет соглашения
              </h2>
              <ul className="space-y-4 text-muted-foreground font-medium list-none pl-0">
                <li className="flex gap-4">
                  <span className="text-primary opacity-40 font-black">1.1.</span>
                  ПО представляет собой утилиту для автоматизированной настройки и оптимизации параметров операционной системы Windows с целью улучшения её быстродействия.
                </li>
                <li className="flex gap-4">
                  <span className="text-primary opacity-40 font-black">1.2.</span>
                  Используя ПО, Пользователь подтверждает, что осознает характер выполняемых программой действий (внесение изменений в реестр, управление системными процессами, очистка временных файлов).
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-4 flex items-center gap-3 text-primary">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs not-italic">2</span>
                Права и обязанности сторон
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-3">2.1. Правообладатель:</h3>
                  <ul className="space-y-3 text-muted-foreground font-medium list-disc pl-5">
                    <li>Обеспечивает доступ к функционалу ПО после успешной оплаты.</li>
                    <li>Оставляет за собой право блокировать доступ к ПО в случае нарушения Пользователем условий использования (попытки обхода защиты, декомпиляции, передачи ключа третьим лицам).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-3">2.2. Пользователь:</h3>
                  <ul className="space-y-3 text-muted-foreground font-medium list-disc pl-5">
                    <li>Обязуется использовать ПО исключительно на устройствах, находящихся в его законном владении.</li>
                    <li><strong className="text-primary">Важно:</strong> Пользователь обязуется создать точку восстановления системы Windows перед запуском процедур оптимизации.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-4 flex items-center gap-3 text-primary">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs not-italic">3</span>
                Отказ от ответственности
              </h2>
              <ul className="space-y-4 text-muted-foreground font-medium list-none pl-0">
                <li className="flex gap-4">
                  <span className="text-primary opacity-40 font-black">3.1.</span>
                  ПО предоставляется на условиях «как есть» (as is). Правообладатель не несет ответственности за любые последствия, возникшие в результате использования ПО, включая, но не ограничиваясь: потерей данных, нестабильной работой отдельных компонентов ОС или стороннего ПО, сбоями в работе оборудования.
                </li>
                <li className="flex gap-4">
                  <span className="text-primary opacity-40 font-black">3.2.</span>
                  Пользователь принимает на себя все риски, связанные с внесением изменений в системные параметры Windows. Правообладатель не гарантирует совместимость ПО со всеми версиями и сборками Windows.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-4 flex items-center gap-3 text-primary">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs not-italic">4</span>
                Лицензирование и оплата
              </h2>
              <ul className="space-y-4 text-muted-foreground font-medium list-none pl-0">
                <li className="flex gap-4">
                  <span className="text-primary opacity-40 font-black">4.1.</span>
                  Доступ к ПО предоставляется в виде временной лицензии (подписки) или бессрочной лицензии (Lifetime).
                </li>
                <li className="flex gap-4">
                  <span className="text-primary opacity-40 font-black">4.2.</span>
                  Система лицензирования использует уникальный идентификатор оборудования (HWID). При смене ключевых комплектующих (материнская плата, процессор) лицензия может потребовать повторной активации через службу поддержки.
                </li>
                <li className="flex gap-4">
                  <span className="text-primary opacity-40 font-black">4.3.</span>
                  Возврат денежных средств не производится, если технический функционал ПО исправен и соответствует заявленному описанию.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-4 flex items-center gap-3 text-primary">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs not-italic">5</span>
                Конфиденциальность
              </h2>
              <ul className="space-y-4 text-muted-foreground font-medium list-none pl-0">
                <li className="flex gap-4">
                  <span className="text-primary opacity-40 font-black">5.1.</span>
                  Для корректной работы системы лицензирования ПО собирает и передает на сервер техническую информацию: HWID (хэш идентификаторов оборудования), версию ОС и статус подписки. Персональные данные (ФИО, пароли) ПО не собирает и не передает.
                </li>
                <li className="flex gap-4">
                  <span className="text-primary opacity-40 font-black">5.2.</span>
                  Пользователь дает согласие на обработку указанных данных в целях обеспечения работы сервиса.
                </li>
              </ul>
            </div>

            <div className="pt-8 border-t border-white/5">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6 flex items-center gap-3 text-primary">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs not-italic">6</span>
                Контакты и реквизиты
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mb-2">Служба поддержки</p>
                  <a href="https://t.me/Kaliang_Support" target="_blank" className="text-lg font-bold text-primary hover:underline">
                    Telegram: @Kaliang_Support
                  </a>
                </div>
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mb-2">Юридическая информация</p>
                  <p className="text-lg font-bold">Статус: физическое лицо</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 bg-black/20">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-8 py-10 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
          <span>© Kaliang. Все права защищены.</span>
          <span className="font-mono bg-white/5 px-3 py-1 rounded-full">TERMS_DOC_V1.0</span>
        </div>
      </footer>
    </main>
  )
}
