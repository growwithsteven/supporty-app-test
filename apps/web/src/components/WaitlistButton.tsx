import { useTranslations } from "next-intl";

export function WaitlistButton() {
  const t = useTranslations("common");

  return (
    <>
      <a
        className="flex items-center border border-1 gap-3 rounded-lg rainbow-border p-1 overflow-hidden hover:scale-125 transition-all"
        href={t("waitlist-form")}
        target="_blank"
      >
        <div className="font-medium text-xl text-white bg-black  transition-colors px-8 py-3 ">
          Join Waitlist
        </div>
      </a>
      <style jsx>{`
        .rainbow-border {
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .rainbow-border::before {
          content: "";
          position: absolute;
          width: 120%;
          height: 120%;
          top: 50%;
          left: 50%;

          background: linear-gradient(
            45deg,
            red,
            orange,
            yellow,
            green,
            blue,
            indigo,
            violet,
            red
          );
          z-index: -1;
          animation: rotate 3s linear infinite;
        }

        .rainbow-border > div {
          position: relative;
          z-index: 1;
        }

        @keyframes rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
