import { createContext, useState } from "react";
import fb from "firebase";
import firebase from "../../utils/firebase";
import { useAuth } from "../../hooks/useAuth";
import LoginModal from "./Modal/LoginModal";
import RegisterModal from "./Modal/RegisterModal";

type ContextType = {
  user: fb.User | undefined;
  setUser: React.Dispatch<React.SetStateAction<fb.User | undefined>>;
  isBusy: boolean;
  showModal: (m: Modal) => void;
  logout: () => void;
  setBusy: (busy: boolean) => void;
};

const initialValue: ContextType = {
  user: undefined,
  setUser: () => {},
  isBusy: false,
  showModal: () => {},
  logout: () => {},
  setBusy: () => {},
};

const UserContext = createContext<ContextType>(initialValue);

enum Modal {
  Login,
  Register,
}

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useAuth();
  const [isBusy, setBusy] = useState(false);
  const [modal, setModal] = useState<Modal>();

  const handleLogout = async () => {
    setBusy(true);
    await firebase.logout();
    setBusy(false);
  };

  const showModal = (modal: Modal) => {
    setModal(modal);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isBusy,
        showModal,
        logout: handleLogout,
        setBusy,
      }}
    >
      {children}
      <LoginModal
        show={modal === Modal.Login}
        onClose={() => setModal(undefined)}
      />
      <RegisterModal
        show={modal === Modal.Register}
        onClose={() => setModal(undefined)}
      />
    </UserContext.Provider>
  );
};

export { UserProvider };

export default UserContext;
