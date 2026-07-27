import AppDropdownMenu from "@/src/components/AppDropdownMenu";
import { AppTooltip } from "@/src/components/AppTooltip";
import IconButton from "@/src/components/IconButton";
import { AppLocale } from "@/src/i18n/services/routing";
import { IconWorld } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export interface ILanguageMenuProps {}

export default function LanguageMenu({}: ILanguageMenuProps) {
  const t = useTranslations("COMMON");

  const router = useRouter();

  function changeLocale(locale: AppLocale) {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;

    router.refresh();
  }

  return (
    <AppDropdownMenu
      trigger={
        <IconButton>
          <AppTooltip text={t("LANGUAGE")}>
            <IconWorld stroke={2} />
          </AppTooltip>
        </IconButton>
      }
      items={[
        {
          label: t("PORTUGUESE"),
          onSelect: () => changeLocale("pt-BR"),
        },
        {
          label: t("ENGLISH"),
          onSelect: () => changeLocale("en"),
        },
        {
          label: t("SPANISH"),
          onSelect: () => changeLocale("es"),
        },
      ]}
    />
  );
}
