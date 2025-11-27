import { AxiosResponse } from "axios";
import { Project, ProjectSettings } from "@/types/project";
import { createApiClient } from "@/lib/api-client";

const client = createApiClient("project");

export interface SlackRegisterResponse {
  project: Project;
  token: string;
}

export interface GetProjectResponse {
  projectDetails: Project;
  token: string;
}

export async function slackRegister(
  code: string,
): Promise<AxiosResponse<SlackRegisterResponse>> {
  return client.post("/slack/register", {
    code,
  });
}

export async function updateProjectSettings(
  settings: ProjectSettings,
): Promise<AxiosResponse<void>> {
  return client.put(`/project/settings`, settings);
}

export async function getProject(
  projectUuid: string,
): Promise<AxiosResponse<GetProjectResponse>> {
  return client.get(`/project?project_uuid=${projectUuid}`);
}

export interface GetTokenResponse {
  project: {
    team: { name: string };
    uuid: string;
  };
  token: string;
}

export async function getToken(
  puid: string,
): Promise<AxiosResponse<GetTokenResponse>> {
  return client.get(`/project/token?uid=${puid}`);
}
