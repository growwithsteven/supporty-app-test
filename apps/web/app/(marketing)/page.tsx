"use client";

import { useEffect } from "react";
import { useProjectAuth } from "@/hooks/project-auth";
import { cn } from "@/lib/cn";
import { useIntersectionObserver } from "@/src/hooks/useIntersectionObserver";
import Script from "next/script";
import { Spacing } from "@/src/components/Spacing";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LocaleSelect } from "@/src/components/LocaleSelect";
import { StartButton } from "@/src/components/StartButton";

const SUPPORTY_PROJECT_UUID = "d2fe216a-c300-4bd1-962a-eff11ecd2026";

export default function Home() {
  const { authState } = useProjectAuth();
  const router = useRouter();
  const t = useTranslations("home");

  useEffect(() => {
    if (authState) {
      router.push("/dashboard");
    }
  }, [authState]);

  return (
    <>
      <Script
        src={`https://supporty.app/api/embed.js?p=${SUPPORTY_PROJECT_UUID}&anim=true`}
      />
      <div className="flex flex-col h-screen items-center bg-white">
        <header className="w-full flex justify-between items-center p-4">
          <Link href="/">
            <img
              src="/images/logo.png"
              alt={t("header.logoAlt")}
              className="w-28"
            />
          </Link>
          <LocaleSelect />
        </header>
        <main className="h-full flex flex-col items-center text-center text-gray-800 py-20">
          <Section>
            <Section.Title>{t("main.section3.title")}</Section.Title>
            <Spacing size={8} />
            <Section.Paragraph>
              {t("main.section3.paragraph")}
            </Section.Paragraph>
            <Spacing size={16} />
            <Section.Paragraph2>
              {t("main.section3.paragraph2")}
            </Section.Paragraph2>
            <div className="py-2">
              <StartButton />
            </div>
          </Section>
        </main>
      </div>
    </>
  );
}

function Section({
  children,
  fade = true,
}: {
  children: React.ReactNode;
  fade?: boolean;
}) {
  const { elementRef, isVisible } = useIntersectionObserver(fade);

  return (
    <section
      ref={elementRef}
      className={`h-full py-24 mb-12 flex flex-col items-center w-full transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
    >
      {children}
    </section>
  );
}
Section.Title = function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-2xl md:text-4xl font-bold !leading-[1.6] text-gray-800 whitespace-pre",
        className,
      )}
    >
      {children}
    </h2>
  );
};
Section.Paragraph = function SectionParagraph({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "py-2 !leading-loose text-lg md:text-xl whitespace-pre",
        className,
      )}
    >
      {children}
    </p>
  );
};

Section.Paragraph2 = function SectionParagraph2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "py-2 !leading-loose text-base md:text-lg text-gray-400 whitespace-pre text-opacity-75",
        className,
      )}
    >
      {children}
    </p>
  );
};
