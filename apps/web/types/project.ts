export interface Project {
  uuid: string;
  team_id: string;
  team_name: string;

  access_token: string;
  channel_id: string;

  settings?: ProjectSettings;

  created_at: string;
}

export interface ProjectSettings {
  welcomeMessage?: string;
  faq: Faq[];

  opening_hours?: {
    open: string;
    close: string;
  };
}

export interface Faq {
  id: string;

  question: string;
  answer: string;
}
