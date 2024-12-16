"use client";

import { useEffect } from "react";
import { useProjectAuth } from "@/hooks/project-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StartButton } from "@/src/components/StartButton";
import { cn } from "@/lib/cn";
import { useIntersectionObserver } from "@/src/hooks/useIntersectionObserver";
import Script from "next/script";

export default function Home() {
  const { authState } = useProjectAuth();
  const router = useRouter();

  useEffect(() => {
    if (authState) {
      router.push("/dashboard");
    }
  }, [authState]);

  return (
    <>
      <Script src="https://supporty.app/api/embed.js?p=d2fe216a-c300-4bd1-962a-eff11ecd2026&anim=true" />
      <div className="flex flex-col items-center bg-white">
        <header className="w-full flex justify-between items-center p-4">
          <Link href="/">
            <img src="/logo.png" alt="Supporty logo" className="w-28" />
          </Link>
        </header>
        <main className="flex flex-col items-center text-center text-gray-800 py-20">
          <Section fade={false}>
            <Section.Title className="!font-medium !text-gray-700 md:text-5xl">
              Make <b className="text-gray-800">Slack Channel</b>
              <br /> into a <b className="text-gray-800"> CS Center</b> <br />
              <span className="text-4xl">in Minutes</span>
            </Section.Title>
            <div className="py-6">
              <StartButton />
            </div>
          </Section>
          <Section>
            <Section.Paragraph>
              Slack ↔️ Intercom, <br />
              Slack ↔️ Zendesk, <br />
              <br />
              Switch Switch Switch...
              <br />
              <br />
            </Section.Paragraph>
            <Section.Title>
              Why do we need to
              <br />
              switch between tools?
              <br />
              It's so annoying 🫨
            </Section.Title>
          </Section>
          <Section>
            <Section.Title>
              Turn your Slack Workspace into
              <br /> a Customer-Support Chat! 🎉
            </Section.Title>
            <Section.Paragraph>
              With Supporty, you can handle
              <br />
              both internal and external conversations
              <br /> in the same place—your Slack Workspace.
            </Section.Paragraph>
          </Section>
          <Section>
            <Section.Paragraph>
              Click below 👇 button
              <br /> to make your customer chat
              <br /> in 10 seconds ✨
            </Section.Paragraph>
            <StartButton />
          </Section>
          <Section>
            <Section.Paragraph>
              Supporty is in beta—completely free,
              <br /> no credit card required 😊
            </Section.Paragraph>
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
        className,
        "text-4xl font-bold leading-[1.4] text-gray-800",
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
    <p className={cn("py-2 leading-loose text-xl", className)}>{children}</p>
  );
};
