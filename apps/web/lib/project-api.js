import axios from "axios";

const client = axios.create({
  baseURL: "/api",
});

client.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("project-token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export async function slackRegister(code) {
  return client.post("/slack/register", {
    code,
  });
}

export async function updateProjectSettings(settings) {
  return client.put(`/project/settings`, settings);
}

export async function getProject(projectUuid) {
  return client.get(`/project?project_uuid=${projectUuid}`);
}
