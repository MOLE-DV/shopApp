import React, { createContext, useState, useContext, ReactNode } from "react";

interface HeaderContextI {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}

interface HeaderChildrenI {
  children: ReactNode;
}

const HeaderContext = createContext<HeaderContextI>({
  hidden: false,
  setHidden: () => undefined,
});

export const HeaderProvider: React.FC<HeaderChildrenI> = ({ children }) => {
  const [hidden, setHidden] = useState(false);

  return (
    <HeaderContext.Provider value={{ hidden, setHidden }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);
