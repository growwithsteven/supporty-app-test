'use client'

import * as projectApi from '@/lib/project-api'

import { useRouter, useSearchParams } from 'next/navigation'
import { useLayoutEffect } from 'react'

export default function Test() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useLayoutEffect(() => {
    const projectUuid = searchParams.get('project_uuid')

    if (projectUuid) {
      ;(async function () {
        const {
          data: { projectDetails: project, token },
        } = await projectApi.getProject(projectUuid)

        if (project.project_uuid === projectUuid) {
          localStorage.setItem('project', JSON.stringify(project))
          localStorage.setItem('project-token', token!)

          router.push('/dashboard')
        }
      })()
    }
  }, [searchParams])

  return <div>Test</div>
}
