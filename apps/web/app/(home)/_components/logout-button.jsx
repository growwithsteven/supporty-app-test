'use client'

import { useProjectAuth } from '@/hooks/project-auth'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const { authState, logout } = useProjectAuth()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    authState && (
      <button
        className="btn btn-ghost btn-sm"
        onClick={handleLogout}
      >
        Logout
      </button>
    )
  )
}
