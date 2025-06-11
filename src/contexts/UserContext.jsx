import { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const updateUserData = (data) => {
    setUserData(data);
  };

  const clearUserData = () => {
    setUserData(null);
  };

  const value = {
    userData,
    updateUserData,
    clearUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
