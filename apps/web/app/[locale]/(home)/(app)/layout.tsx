"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useProjectAuth } from "@/hooks/project-auth";
import LogoutButton from "../_components/logout-button";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { authState } = useProjectAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (authState === false) {
      router.push("/");
    }
  }, [authState]);

  return (
    <div className="container mx-auto px-6">
      <div className="navbar">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <span className="text-xl font-bold">Supporty</span>
        </div>
        <div className="navbar-end">
          <LogoutButton />
        </div>
      </div>
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center py-8 text-center">
          <div role="tablist" className="tabs tabs-bordered pb-14">
            <a
              role="tab"
              className={`tab ${pathname === "/dashboard" ? "tab-active" : ""}`}
              href="/dashboard"
            >
              Home
            </a>
            <a
              role="tab"
              className={`tab ${pathname === "/settings" ? "tab-active" : ""}`}
              href="/settings"
            >
              Settings
            </a>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
