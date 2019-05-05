// @flow

import React, { createContext, useState, useContext } from "react";

const GlobalsAnimationsEnabled = createContext<boolean>(false);
const SetGlobalsAnimations = createContext();

export function useGlobalAnimations() {
  return useContext(GlobalsAnimationsEnabled);
}

export function useSetGlobalAnimations() {
  return useContext(SetGlobalsAnimations);
}

function GlobalAnimationsProvider({ children }: { children: React$Node }) {
  const [isEnabled, setEnabled] = useState<boolean>(true);
  return (
    <GlobalsAnimationsEnabled.Provider value={isEnabled}>
      <SetGlobalsAnimations.Provider value={setEnabled}>
        {children}
      </SetGlobalsAnimations.Provider>
    </GlobalsAnimationsEnabled.Provider>
  );
}

export default GlobalAnimationsProvider;
