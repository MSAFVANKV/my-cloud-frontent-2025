import React, { createContext, useContext, useState } from "react";

interface IContextType {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void; 
  menuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
}

const contextWrap = createContext<IContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <contextWrap.Provider
      value={{
        setViewMode,
        viewMode,
        menuOpen,
        setMenuOpen
      }}
    >
      {children}
    </contextWrap.Provider>
  );
};


export const useMainContext = () => {
    const context = useContext(contextWrap);
    if (!context) {
      throw new Error("useMainContext must be used within a ContextProvider");
    }
    return context;
  };
  