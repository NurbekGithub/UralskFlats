import React, { useState } from 'react'
import { ContextProps } from './types';

const ContextArgs: any = null;

export const SidebarContext = React.createContext(ContextArgs);

export default function SidebarContextProvider({ children }: ContextProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return <SidebarContext.Provider value={[isOpen, setIsOpen]}>
    {children}
  </SidebarContext.Provider>
}
