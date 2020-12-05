import { useEffect, useState } from "react";
import fb from "firebase";
import firebase from "../utils/firebase";

export const useAuth = (): [
  fb.User | undefined,
  React.Dispatch<React.SetStateAction<fb.User | undefined>>
] => {
  const [authUser, setAuthUser] = useState<fb.User>();

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(undefined);
      }
    });

    return () => unsubscribe();
  });

  return [authUser, setAuthUser];
};
