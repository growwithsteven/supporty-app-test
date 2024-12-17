"use client";

import { useEffect } from "react";
import { useProjectAuth } from "@/hooks/project-auth";
import { cn } from "@/lib/cn";
import { useIntersectionObserver } from "@/src/hooks/useIntersectionObserver";
import Script from "next/script";
import { WaitlistButton } from "@/src/components/WaitlistButton";
import { Spacing } from "@/src/components/Spacing";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { LocaleSelect } from "@/src/components/LocaleSelect";

const SUPPORTY_PROJECT_UUID = "d2fe216a-c300-4bd1-962a-eff11ecd2026";

interface Props {
  cta?: React.ReactNode;
}
export default function Home({ cta = <WaitlistButton /> }: Props) {
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
      <div className="flex flex-col items-center bg-white">
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
        <main className="flex flex-col items-center text-center text-gray-800 py-20">
          <Section fade={false}>
            <Section.Title className="!text-gray-700 md:text-5xl">
              {t("main.section1.title")}
            </Section.Title>
            <Spacing size={20} />
            <div className="py-6">{cta}</div>

            <Section.Paragraph2>{t("main.section1.try")}</Section.Paragraph2>
            <div className="mockup-phone hidden md:block">
              <div className="camera"></div>
              <div className="display">
                <div className="artboard artboard-demo phone-1 max-w-full">
                  <iframe
                    className="h-full w-full"
                    src={`/chat/${SUPPORTY_PROJECT_UUID}`}
                  />
                </div>
              </div>
            </div>
          </Section>
          <Section>
            <Section.Paragraph>
              {t("main.section2.paragraph")}
            </Section.Paragraph>
            <Section.Title>{t("main.section2.title")}</Section.Title>
          </Section>
          <Section>
            <Section.Title>{t("main.section3.title")}</Section.Title>
            <Section.Paragraph>
              {t("main.section3.paragraph")}
            </Section.Paragraph>
          </Section>
          <Section>
            <Section.Paragraph>
              {t("main.section4.paragraph")}
            </Section.Paragraph>
            <Spacing size={20} />
            {cta}
          </Section>
          <Section>
            <Section.Paragraph2>
              {t("main.section5.paragraph")}
            </Section.Paragraph2>
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
      className={`py-24 mb-12 flex flex-col items-center w-full transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
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
        "py-2 !leading-loose text-base md:text-lg text-gray-400 whitespace-pre",
        className,
      )}
    >
      {children}
    </p>
  );
};
