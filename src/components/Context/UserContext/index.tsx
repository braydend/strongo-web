import { createContext, useState } from "react";
import app from "firebase";
import firebase from "../../../utils/firebase";
import { useAuth } from "../../../hooks/useAuth";

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
  const [user, setUser] = useAuth();
  const [isBusy, setBusy] = useState(false);

  const handleLogout = async () => {
    setBusy(true);
    await firebase.logout();
    setBusy(false);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isBusy, logout: handleLogout, setBusy }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };

export default UserContext;
