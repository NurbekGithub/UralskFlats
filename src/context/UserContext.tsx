import React, { useState } from 'react'
import { ContextProps } from './types';

const ContextArgs: any = null;

export const UserContext = React.createContext(ContextArgs);

export default function UserContextProvider({ children }: ContextProps) {
  const [user, setUser] = useState(null);
  return <UserContext.Provider value={[user, setUser]}>
    {children}
  </UserContext.Provider>
}
