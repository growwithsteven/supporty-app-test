"use client";

import { useEffect, useMemo, useState } from "react";

import { createSupabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { updateProjectSettings } from "@/lib/project-api";
import { useProjectAuth } from "@/hooks/project-auth";
import { Faq, Project, ProjectSettings } from "@/types/project";
import TimePicker from "@/app/(home)/(app)/_components/TimePicker";
import { xor } from "@/lib/xor";
import { FaqSection } from "./_components/FaqSection";

export default function Settings() {
  const { authState, project } = useProjectAuth();
  const [settings, setSettings] = useState<ProjectSettings | null>(null);

  const [welcomeMessage, setWelcomeMessage] = useState<string>(
    project?.settings?.welcomeMessage || "",
  );
  const [openTime, setOpenTime] = useState<string | null>(
    project?.settings?.opening_hours?.open || null,
  );
  const [closeTime, setCloseTime] = useState<string | null>(
    project?.settings?.opening_hours?.close || null,
  );

  const [faq, setFaq] = useState<Faq[]>(project?.settings?.faq || []);

  const saveable = useMemo(() => {
    // if (!settings) {
    //   return false
    // }

    return (
      settings?.welcomeMessage !== (project?.settings?.welcomeMessage ?? "") ||
      settings?.faq !== project?.settings?.faq ||
      settings?.opening_hours?.open !==
        project?.settings?.opening_hours?.open ||
      settings?.opening_hours?.close !==
        project?.settings?.opening_hours?.close ||
      JSON.stringify(faq) !== JSON.stringify(project?.settings?.faq)
    );
  }, [settings]);

  const fetchSettings = async (_project: Project) => {
    const supabase = createSupabase();

    const { data: projectDetail } = await supabase
      .from("project_details")
      .select("settings")
      .eq("project_uuid", _project.uuid)
      .single();

    if (!projectDetail) {
      return;
    }

    setSettings(projectDetail.settings);
    setWelcomeMessage(projectDetail.settings?.welcomeMessage ?? "");
    setOpenTime(projectDetail.settings?.opening_hours?.open ?? null);
    setCloseTime(projectDetail.settings?.opening_hours?.close ?? null);
    setFaq(projectDetail.settings?.faq ?? []);
  };

  useEffect(() => {
    if (!project) {
      return;
    }

    fetchSettings(project);
  }, [project]);

  const handleSave = async () => {
    if (xor(!!openTime, !!closeTime)) {
      toast.error("Both Open Time and Close Time must be provided!");
      return;
    }

    toast.success("Settings saved!");

    await updateProjectSettings({
      welcomeMessage,
      opening_hours:
        openTime && closeTime ? { open: openTime, close: closeTime } : null,
      faq,
    });
  };

  return (
    authState && (
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full justify-end">
          <button
            className="btn btn-primary"
            disabled={!saveable}
            onClick={handleSave}
          >
            Save
          </button>
        </div>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Welcome message</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-20"
            placeholder="Welcome to chat!"
            value={welcomeMessage}
            onChange={(e) => {
              setWelcomeMessage(e.target.value);
            }}
          />
        </label>

        <div className="divider"></div>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Opening hours</span>
          </div>
          <TimePicker label="Open" value={openTime} onChange={setOpenTime} />
          <TimePicker label="Close" value={closeTime} onChange={setCloseTime} />
        </label>

        <div className="divider"></div>

        <div className="form-control">
          <div className="label">
            <span className="label-text">FAQ</span>
          </div>
          <FaqSection value={faq} onChange={setFaq} />
        </div>
      </div>
    )
  );
}
