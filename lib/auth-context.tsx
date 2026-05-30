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

// Helper functions for cookies
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

const getCookie = (name: string) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState<Language>('ru')
  const router = useRouter()

  const t = translations[lang]

  useEffect(() => {
    // Load lang from local storage if available
    const savedLang = typeof window !== 'undefined' ? localStorage.getItem('kaliang_lang') as Language : null
    if (savedLang && (savedLang === 'ru' || savedLang === 'en')) {
      setLang(savedLang)
    }

    refreshUser()
  }, [])

  const refreshUser = async () => {
    const token = typeof window !== 'undefined' ? (localStorage.getItem('kaliang_jwt_token') || getCookie('kaliang_jwt_token')) : null
    
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const { ok, data } = await apiClient('/api/auth/profile')
      if (ok && data.user) {
        setUser(data.user)
        // Sync token back to both if only one had it
        if (typeof window !== 'undefined') {
          localStorage.setItem('kaliang_jwt_token', token)
          setCookie('kaliang_jwt_token', token, 7)
        }
      } else {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('kaliang_jwt_token')
          deleteCookie('kaliang_jwt_token')
        }
        setUser(null)
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = (token: string, userData: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kaliang_jwt_token', token)
      setCookie('kaliang_jwt_token', token, 7)
    }
    setUser(userData)
    router.push('/dashboard')
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kaliang_jwt_token')
      deleteCookie('kaliang_jwt_token')
    }
    setUser(null)
    router.push('/login')
  }

  const handleSetLang = (newLang: Language) => {
    setLang(newLang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('kaliang_lang', newLang)
    }
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
