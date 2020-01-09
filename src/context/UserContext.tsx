import React, { useState, useEffect } from 'react'
import { ContextProps } from './types';

const ContextArgs: any = null;

export const UserContext = React.createContext(ContextArgs);

export default function UserContextProvider({ children }: ContextProps) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem('uf-user')) {
      setUser(localStorage.getItem('uf-user'))
    }
  }, [])
  return <UserContext.Provider value={[user, setUser]}>
    {children}
  </UserContext.Provider>
}
