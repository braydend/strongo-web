import { createContext, useContext, useEffect, useState } from "react";
import app from "firebase";
import firebase from "../../../utils/firebase";

type ContextType = {
  user: app.User | undefined;
  setUser: React.Dispatch<React.SetStateAction<app.User | undefined>>;
  isBusy: boolean;
  logout: () => void;
  setBusy: (busy: boolean) => void;
};

const initialValue: ContextType = {
  user: undefined,
  setUser: () => {},
  isBusy: false,
  logout: () => {},
  setBusy: () => {},
};

const UserContext = createContext<ContextType>(initialValue);

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<app.User>();
  const [isBusy, setBusy] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return () => unsubscribe();
  });

  const handleLogout = async () => {
    setBusy(true);
    await firebase.logout();
    setBusy(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isBusy,
        logout: handleLogout,
        setBusy,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useAuth = () => {
  const { ...data } = useContext(UserContext);

  return { ...data };
};

export { UserProvider, useAuth };

export default UserContext;
