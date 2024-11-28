'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useProjectAuth } from '@/hooks/project-auth'
import { useRouter } from 'next/navigation'

export default function AppLayout({ children }) {
  const { authState } = useProjectAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (authState === false) {
      router.push('/')
    }
  }, [authState])

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div
        role="tablist"
        className="tabs tabs-bordered pb-14"
      >
        <a
          role="tab"
          className={`tab ${pathname === '/dashboard' ? 'tab-active' : ''}`}
          href="/dashboard"
        >
          Home
        </a>
        <a
          role="tab"
          className={`tab ${pathname === '/settings' ? 'tab-active' : ''}`}
          href="/settings"
        >
          Settings
        </a>
      </div>
      {children}
    </div>
  )
}
