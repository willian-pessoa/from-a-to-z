"use client";

import { useEffect } from "react";
import { useHeader } from "@/src/contexts/HeaderContext";

interface Props {
  title: string;
}

export default function HeaderConfig({ title }: Props) {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle(title);

    return () => setTitle("");
  }, [title]);

  return null;
}
