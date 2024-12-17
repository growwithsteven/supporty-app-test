"use client";

import * as projectApi from "@/lib/project-api";
import { useEffect } from "react";

export default function TestPage() {
  const hi = async () => {
    const puid = location.search.split("puid=")[1];

    if (!puid) {
      alert("Invalid access");
      location.href = "/";
      return;
    }

    const {
      data: { project, token },
    } = await projectApi.getToken(puid);

    console.log(project, token);

    localStorage.setItem("project", JSON.stringify(project));
    localStorage.setItem("project-token", token);

    setTimeout(() => {
      location.href = "/dashboard";
    }, 1000);
  };

  useEffect(() => {
    hi();
  }, []);

  return <div>Loading ...</div>;
}
