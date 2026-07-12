"use client";

import { createContext, useContext, useState } from "react";

interface HeaderContextData {
  title: string;
  setTitle: (title: string) => void;
}

const HeaderContext = createContext({} as HeaderContextData);

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState("");

  return (
    <HeaderContext.Provider value={{ title, setTitle }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}
