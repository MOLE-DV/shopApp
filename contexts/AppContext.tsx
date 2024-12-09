import React, { createContext, useState, useContext, ReactNode } from "react";

interface AppContextI {
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AppChildrenI {
  children: ReactNode;
}

const AppContext = createContext<AppContextI | undefined>(undefined);

export const AppProvider: React.FC<AppChildrenI> = ({ children }) => {
  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider value={{ hidden, setHidden, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextI => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
