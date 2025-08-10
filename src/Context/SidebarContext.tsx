import React, { createContext, useState, useEffect } from "react";

interface SidebarContextType {
  open: boolean;
  setOpen: (value: boolean) => void;
  screenType: "mobile" | "desktop";
}

export const SidebarContext = createContext<SidebarContextType>({
  open: false,
  setOpen: () => {},
  screenType: "desktop",
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [screenType, setScreenType] = useState<"mobile" | "desktop">(
    window.innerWidth < 768 ? "mobile" : "desktop"
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setScreenType(isMobile ? "mobile" : "desktop");
      // ❌ Don't touch `open` anymore
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, screenType }}>
      {children}
    </SidebarContext.Provider>
  );
};
