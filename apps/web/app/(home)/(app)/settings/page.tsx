'use client'

import { useEffect, useMemo, useState } from 'react'

import { createSupabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { updateProjectSettings } from '@/lib/project-api'
import { useProjectAuth } from '@/hooks/project-auth'
import { Project, ProjectSettings } from '@/types/project'
import TimePicker from '@/app/(home)/(app)/_components/TimePicker'

export default function Settings() {
  const { authState, project } = useProjectAuth()
  const [settings, setSettings] = useState<ProjectSettings | null>(null)

  const [openTime, setOpenTime] = useState<string | null>(
    project?.settings?.operating_hours?.open || null,
  )
  const [closeTime, setCloseTime] = useState<string | null>(
    project?.settings?.operating_hours?.close || null,
  )

  const saveable = useMemo(() => {
    if (!settings) {
      return false
    }

    return (
      settings.welcomeMessage !== project?.settings?.welcomeMessage ||
      settings.operating_hours?.open !==
        project?.settings?.operating_hours?.open ||
      settings.operating_hours?.close !==
        project?.settings?.operating_hours?.close
    )
  }, [settings])

  const fetchSettings = async (_project: Project) => {
    const supabase = createSupabase()

    const { data: projectDetail } = await supabase
      .from('project_details')
      .select('*')
      .eq('project_uuid', _project.uuid)
      .single()

    if (!projectDetail) {
      return
    }

    setSettings(projectDetail.settings)
  }

  useEffect(() => {
    if (!project) {
      return
    }

    fetchSettings(project)
  }, [project])

  const handleSave = async () => {
    if (!openTime || !closeTime) {
      toast.error('Both Open Time and Close Time must be provided!')
      return
    }

    toast.success('Settings saved!')
    await updateProjectSettings({
      ...settings,
      operating_hours: { open: openTime, close: closeTime },
    })
  }

  return (
    authState && (
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
        <div className="divider"></div>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Operating hours</span>
          </div>
          <TimePicker
            label="Open"
            value={openTime}
            onChange={setOpenTime}
          />
          <TimePicker
            label="Close"
            value={closeTime}
            onChange={setCloseTime}
          />
        </label>
        <div className="flex w-full justify-end">
          <button
            className="btn btn-primary"
            disabled={!saveable}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    )
  )
}
