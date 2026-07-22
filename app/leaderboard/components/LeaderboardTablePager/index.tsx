"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import {
  IconChevronsLeft,
  IconChevronsRight,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

import Button from "@/src/components/Button";
import clsx from "clsx";
import IconButton from "@/src/components/IconButton";
import { AppTooltip } from "@/src/components/AppTooltip";

export interface ILeaderboardTablePagerProps {
  totalCount: number;
}

export default function LeaderboardTablePager({
  totalCount,
}: ILeaderboardTablePagerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page") ?? "1");
  const totalPages = Math.floor(totalCount / 20) + 1; // pageSize is 20
  const isLastPage = currentPage === totalPages;

  function updatePage(value: number) {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(value));

    router.replace(`${pathname}?${params.toString()}`);
  }

  function pages() {
    const pages = [];

    const start = Math.max(1, currentPage - 3);
    const end = Math.min(totalPages, currentPage + 3);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  return (
    <div className="flex items-center justify-center rounded-lg gap-2 border-t-2 sm:mx-8 mb-14 sm:mb-0 border-emerald-700 bg-emerald-900 px-6 py-2">
      <AppTooltip text="Primeira">
        <IconButton
          onClick={() => updatePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={clsx(
            "transition bg-emerald-900",
            currentPage === 1 &&
              "cursor-not-allowed bg-emerald-950 text-emerald-700 hover:bg-emerald-950",
          )}
        >
          <IconChevronsLeft />
        </IconButton>
      </AppTooltip>

      <AppTooltip text="Anterior">
        <IconButton
          onClick={() => updatePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={clsx(
            "transition bg-emerald-900 hidden sm:flex",
            currentPage === 1 &&
              "cursor-not-allowed bg-emerald-950 text-emerald-700 hover:bg-emerald-950",
          )}
        >
          <IconChevronLeft />
        </IconButton>
      </AppTooltip>

      {pages().map((page) => (
        <Button
          key={page}
          onClick={() => updatePage(page)}
          disabled={page === currentPage}
          className={clsx(
            "h-10 w-10 font-bold transition justify-center",
            page === currentPage && "bg-emerald-500 shadow-lg",
          )}
        >
          {page}
        </Button>
      ))}

      <AppTooltip text="Próxima">
        <IconButton
          onClick={() => updatePage(currentPage + 1)}
          disabled={isLastPage}
          className={clsx(
            "transition bg-emerald-900 hidden sm:flex",
            isLastPage &&
              "cursor-not-allowed bg-emerald-950 text-emerald-700 hover:bg-emerald-950",
          )}
        >
          <IconChevronRight />
        </IconButton>
      </AppTooltip>

      <AppTooltip text="Última">
        <IconButton
          onClick={() => updatePage(currentPage + 1)}
          disabled={isLastPage}
          className={clsx(
            "transition bg-emerald-900",
            isLastPage &&
              "cursor-not-allowed bg-emerald-950 text-emerald-700 hover:bg-emerald-950",
          )}
        >
          <IconChevronsRight />
        </IconButton>
      </AppTooltip>
    </div>
  );
}
