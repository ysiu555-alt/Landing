'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import type { User, Language } from '@/lib/types'
import { translations } from '@/lib/translations'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (token: string, user: User) => void
  logout: () => void
  refreshUser: () => Promise<void>
  lang: Language
  setLang: (lang: Language) => void
  t: typeof translations.ru | typeof translations.en
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState<Language>('ru')
  const router = useRouter()

  const t = translations[lang]

  useEffect(() => {
    // Load lang from local storage if available
    const savedLang = localStorage.getItem('vortex_lang') as Language
    if (savedLang && (savedLang === 'ru' || savedLang === 'en')) {
      setLang(savedLang)
    }

    refreshUser()
  }, [])

  const refreshUser = async () => {
    const token = localStorage.getItem('vortex_jwt_token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const { ok, data } = await apiClient('/api/auth/me')
      if (ok) {
        setUser(data)
      } else {
        localStorage.removeItem('vortex_jwt_token')
        setUser(null)
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = (token: string, userData: User) => {
    localStorage.setItem('vortex_jwt_token', token)
    setUser(userData)
    router.push('/dashboard')
  }

  const logout = () => {
    localStorage.removeItem('vortex_jwt_token')
    setUser(null)
    router.push('/login')
  }

  const handleSetLang = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem('vortex_lang', newLang)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
        lang,
        setLang: handleSetLang,
        t,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
