export interface Project {
  uuid: string
  team_id: string
  team_name: string

  access_token: string
  channel_id: string

  settings?: ProjectSettings

  created_at: string
}

export interface ProjectSettings {
  welcomeMessage: string
}
