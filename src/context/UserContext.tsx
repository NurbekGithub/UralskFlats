import React, { useState } from 'react'
import { ContextProps } from './types';

const ContextArgs: any = null;

export const UserContext = React.createContext(ContextArgs);

export default function UserContextProvider({ children }: ContextProps) {
  const [user, setUser] = useState<string | null>(localStorage.getItem('uf-user') || null);

  const isAdmin = user === 'aia'

  return <UserContext.Provider value={{ user, setUser, isAdmin }}>
    {children}
  </UserContext.Provider>
}
