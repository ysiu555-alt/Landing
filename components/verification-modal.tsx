import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { apiClient } from "@/lib/api-client"

interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
  onVerified: (code: string) => void
}

export function VerificationModal({ isOpen, onClose, email, onVerified }: VerificationModalProps) {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const handleVerify = async () => {
    setLoading(true)
    const { ok, data } = await apiClient("/api/auth/verify-code", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    })

    if (ok) {
      toast.success("Email верифицирован!")
      onVerified(code)
      onClose()
    } else {
      toast.error(data.message || "Ошибка верификации")
    }
    setLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Верификация почты</DialogTitle>
          <DialogDescription>Введите код, отправленный на {email}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Введите код"
            maxLength={6}
          />
          <Button onClick={handleVerify} disabled={loading}>
            {loading ? "Проверка..." : "Подтвердить"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
