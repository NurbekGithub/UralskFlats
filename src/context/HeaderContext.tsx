import React, { useState, useContext } from 'react'
import { ContextProps } from './types';

const ContextArgs: any = null;

export const HeaderContext = React.createContext(ContextArgs);

export default function HeaderContextProvider({ children }: ContextProps) {
  const [headerTitle, setHeaderTitle] = useState<string>('');

  return <HeaderContext.Provider value={[headerTitle, setHeaderTitle]}>
    {children}
  </HeaderContext.Provider>
}

export function Title({ m }: { m: string }) {
  const setHeaderTitle = useContext(HeaderContext)[1];
  setHeaderTitle(m);
  return null;
}