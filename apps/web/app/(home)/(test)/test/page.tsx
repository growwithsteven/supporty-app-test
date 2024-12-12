'use client'

import { useProjectAuth } from '@/hooks/project-auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Test() {
  const { getProject, authState } = useProjectAuth()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('project_uuid')) {
      getProject(searchParams.get('project_uuid') as string)
    }
  }, [searchParams])

  useEffect(() => {
    if (authState) {
      router.push('/dashboard')
    }
  }, [authState])

  return <div>Test</div>
}
