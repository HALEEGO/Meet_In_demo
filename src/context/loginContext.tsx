import React from 'react';

export const auth = {
  id: '',
  name: '',
  isAuth: false,
};
export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = React.useState({
    id: '',
    name: '',
    isAuth: false,
  });

  const login = (id, name) => {
    console.log(`loginID: ${id}`);
    console.log(name);
    setUser({
      id,
      name,
      isAuth: true,
    });
  };

  const logout = () => {
    setUser({
      id: '',
      name: '',
      isAuth: false,
    });
  };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
