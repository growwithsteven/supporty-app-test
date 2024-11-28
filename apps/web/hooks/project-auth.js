import * as projectApi from '@/lib/project-api'

import { useMount } from 'react-use'
import { useState } from 'react'

export function useProjectAuth() {
  const [authState, setAuthState] = useState(null)
  const [project, setProject] = useState(null)

  useMount(() => {
    const project = JSON.parse(localStorage.getItem('project'))
    setProject(project)

    if (project) {
      setAuthState(true)
    } else {
      setAuthState(false)
    }
  })

  const register = async (code) => {
    const {
      data: { project, token },
    } = await projectApi.slackRegister(code)

    localStorage.setItem('project', JSON.stringify(project))
    localStorage.setItem('project-token', token)

    setProject(project)
    setAuthState(true)
  }

  const logout = async () => {
    localStorage.removeItem('project')
    localStorage.removeItem('project-token')

    setProject(null)
    setAuthState(false)
  }

  return {
    authState,
    project,
    register,
    logout,
  }
}
