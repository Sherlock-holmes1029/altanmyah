import React, { createContext, useMemo, useState } from "react";
import type { SectorMap } from "../Core/const/sideMenu";
import sectorsMap from "../Core/const/sideMenu";


type SectorCtx = {
  sectors: SectorMap | null;
  setSectors: (m: SectorMap) => void;
  selectedSector: string;
  setSelectedSector: (k: string) => void;
};

export const SectorContext = createContext<SectorCtx>({
  sectors: null,
  setSectors: () => {},
  selectedSector: "",
  setSelectedSector: () => {},
});

export const SectorProvider = ({
  children,
  initialSectors,
}: {
  children: React.ReactNode;
  initialSectors?: SectorMap;
}) => {
  const [sectors, setSectors] = useState<SectorMap | null>(sectorsMap);
  const [selectedSector, setSelectedSector] = useState("");

  const value = useMemo(
    () => ({ sectors, setSectors, selectedSector, setSelectedSector }),
    [sectors, selectedSector]
  );

  return <SectorContext.Provider value={value}>{children}</SectorContext.Provider>;
};
