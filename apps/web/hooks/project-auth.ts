import * as projectApi from "@/lib/project-api";

import { useMount } from "react-use";
import { useState } from "react";
import { Project } from "@/types/project";

export function useProjectAuth() {
  const [authState, setAuthState] = useState<boolean | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  useMount(() => {
    const project: Project | null = JSON.parse(
      localStorage.getItem("project") || "null",
    );
    setProject(project);

    if (project) {
      setAuthState(true);
    } else {
      setAuthState(false);
    }
  });

  const register = async (code: string) => {
    const {
      data: { project, token },
    } = await projectApi.slackRegister(code);

    localStorage.setItem("project", JSON.stringify(project));
    localStorage.setItem("project-token", token);

    setProject(project);
    setAuthState(true);
  };

  const getProject = async (projectUuid: string) => {
    let project = JSON.parse(localStorage.getItem("project") || "null");
    let token = localStorage.getItem("project-token");

    if (!project) {
      const {
        data: { projectDetails, token: _token },
      } = await projectApi.getProject(projectUuid);
      project = projectDetails;
      token = _token;
    }

    if (project.project_uuid === projectUuid) {
      localStorage.setItem("project", JSON.stringify(project));
      localStorage.setItem("project-token", token!);

      setProject(project);
      setAuthState(true);
    }
  };

  const logout = async () => {
    localStorage.removeItem("project");
    localStorage.removeItem("project-token");

    setProject(null);
    setAuthState(false);
  };

  return {
    authState,
    project,
    register,
    logout,
    getProject,
  };
}
