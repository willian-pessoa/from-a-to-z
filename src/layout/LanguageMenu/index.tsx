import AppDropdownMenu from "@/src/components/AppDropdownMenu";
import { AppTooltip } from "@/src/components/AppTooltip";
import IconButton from "@/src/components/IconButton";
import { AppLocale } from "@/src/i18n/services/routing";
import { IconWorld } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export interface ILanguageMenuProps {}

export default function LanguageMenu({}: ILanguageMenuProps) {
  const router = useRouter();

  function changeLocale(locale: AppLocale) {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;

    router.refresh();
  }

  return (
    <AppDropdownMenu
      trigger={
        <IconButton>
          <AppTooltip text="Linguagem">
            <IconWorld stroke={2} />
          </AppTooltip>
        </IconButton>
      }
      items={[
        {
          label: "Português",
          onSelect: () => changeLocale("pt-BR"),
        },
        {
          label: "English",
          onSelect: () => changeLocale("en"),
        },
        {
          label: "Español",
          onSelect: () => changeLocale("es"),
        },
      ]}
    />
  );
}
