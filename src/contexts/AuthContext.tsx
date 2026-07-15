"use client";

import * as React from "react";
import { RiotPlatformRegion } from "../types";

interface UserState {
  puuid: string;
  riot_id: string;
  region: RiotPlatformRegion;
  challengerId: string | null;
}

interface AuthContextType {
  user: UserState | null;
  isLoading: boolean;
  login: (userData: UserState) => void;
  logout: () => void;
  updateChallengerId: (newId: string | null) => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserState | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const savedPuuid = localStorage.getItem("lol_az_puuid");
    const savedRiotId = localStorage.getItem("lol_az_riotid");
    const savedRegion = localStorage.getItem("lol_az_region");
    const savedChallengerId = localStorage.getItem("lol_az_challengerid");

    if (savedPuuid && savedRiotId && savedRegion) {
      setUser({
        puuid: savedPuuid,
        riot_id: savedRiotId,
        region: savedRegion as RiotPlatformRegion,
        challengerId: savedChallengerId,
      });
    }
    setIsLoading(false);
  }, []);

  const login = (userData: UserState) => {
    const fullUser: UserState = {
      puuid: userData.puuid,
      riot_id: userData.riot_id,
      region: userData.region,
      challengerId: userData.challengerId ?? null,
    };

    localStorage.setItem("lol_az_puuid", fullUser.puuid);
    localStorage.setItem("lol_az_riotid", fullUser.riot_id);
    localStorage.setItem("lol_az_region", fullUser.region);
    if (fullUser.challengerId) {
      localStorage.setItem("lol_az_challengerid", fullUser.challengerId);
    }

    setUser(fullUser);
  };

  const logout = () => {
    localStorage.removeItem("lol_az_puuid");
    localStorage.removeItem("lol_az_riotid");
    localStorage.removeItem("lol_az_region");
    localStorage.removeItem("lol_az_challengerid");
    setUser(null);
  };

  const updateChallengerId = (newId: string | null) => {
    localStorage.setItem("lol_az_challengerid", newId ?? "");
    setUser((prev) => {
      if (prev) {
        return { ...prev, challengerId: newId };
      }
      return prev;
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, updateChallengerId }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
