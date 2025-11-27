import { Locale, routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Cookies from "js-cookie";

const LOCALE_LABELS = {
  en: "English",
  ko: "Korean",
};

export function LocaleSelect() {
  const locale = useLocale();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value as Locale;

    Cookies.set("NEXT_LOCALE", nextLocale);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <select
      value={locale}
      onChange={handleLocaleChange}
      className="select bg-gray-100 text-gray-600 select-sm"
    >
      {routing.locales.map((locale) => (
        <option key={locale} value={locale}>
          {LOCALE_LABELS[locale]}
        </option>
      ))}
    </select>
  );
}
