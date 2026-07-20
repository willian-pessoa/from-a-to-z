export function formatDate(
  date: string | Date | null | undefined,
  locale?: string,
) {
  if (!date) return "-";

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}
