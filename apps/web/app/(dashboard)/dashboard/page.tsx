"use client";

import copy from "copy-to-clipboard";
import { useProjectAuth } from "@/hooks/project-auth";
import { useState } from "react";

import { config } from "@/lib/config";

export default function Dashboard() {
  const { authState, project } = useProjectAuth();
  const [isCopied, setIsCopied] = useState(false);
  const scriptUrl = `<script async src="${config.appUrl}/api/embed.js?p=${project?.uuid}&anim=true"></script>`;

  const handleCopy = () => {
    copy(scriptUrl);
    setIsCopied(true);
  };

  return (
    authState && (
      <>
        <h1 className="text-5xl font-bold">Welcome!</h1>
        <p className="py-6">
          Supporty has been successfully created!
          <br />
          Copy the code below and paste it into the &lt;head&gt; tag.
        </p>
        <div className="mockup-code max-w-full overflow-x-auto">
          <pre>
            <code>{scriptUrl}</code>
          </pre>
        </div>
        <button
          className={`btn btn-sm mt-2 ${isCopied ? "btn-primary" : "btn-accent"}`}
          onClick={handleCopy}
        >
          {isCopied ? "Copied!" : "Copy tag"}
        </button>
        <div className="divider" />
        <p className="py-6">
          Check out the preview below. This preview is actually working!
        </p>
        <div className="mockup-phone">
          <div className="camera"></div>
          <div className="display">
            <div className="artboard artboard-demo phone-1 max-w-full">
              <iframe
                className="h-full w-full"
                src={`/chat/${project!.uuid}`}
              />
            </div>
          </div>
        </div>
      </>
    )
  );
}
