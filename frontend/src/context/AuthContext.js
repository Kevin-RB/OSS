import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromSession());

  const login = (userData) => {
    window.sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    window.sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function getUserFromSession() {
  const user = window.sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export const useAuth = () => useContext(AuthContext);
