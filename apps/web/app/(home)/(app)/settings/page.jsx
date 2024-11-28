'use client'

import { useEffect, useState } from 'react'

import { createSupabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { updateProjectSettings } from '@/lib/project-api'
import { useProjectAuth } from '@/hooks/project-auth'

export default function Settings() {
  const { authState, project } = useProjectAuth()
  const [settings, setSettings] = useState(null)
  const saveable = settings && settings.welcomeMessage.length > 0

  const fetchSettings = async () => {
    const supabase = createSupabase()
    const { data: projectDetail } = await supabase
      .from('project_details')
      .select('*')
      .eq('project_uuid', project.uuid)
      .single()

    setSettings(projectDetail.settings)
  }

  useEffect(() => {
    if (!project) {
      return
    }

    fetchSettings()
  }, [project])

  const handleSave = async () => {
    toast.success('Settings saved!')
    await updateProjectSettings(settings)
  }

  return (
    authState && (
      <>
        <div className="flex w-full flex-col gap-4">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Welcome message</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-20"
              placeholder="Welcome to chat!"
              value={settings?.welcomeMessage}
              onChange={(e) =>
                setSettings({ ...settings, welcomeMessage: e.target.value })
              }
            ></textarea>
          </label>
          <div className="flex justify-end">
            <button
              className="btn btn-primary"
              disabled={!saveable}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </>
    )
  )
}
