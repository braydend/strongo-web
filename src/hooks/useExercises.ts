import { useEffect, useState } from "react";
import { useAuth } from "../components/Context/UserContext";

export type Exercise = {
  id: number;
  name: string;
};

const useExercises = () => {
  const { user } = useAuth();
  if (!user) throw Error("No user is authenticated");

  const [data, setData] = useState<Exercise[]>();
  const [error, setError] = useState<string>();
  const host = process.env.REACT_APP_SERVER_HOST || "";

  const fetchAllExercises = async () => {
    const authToken = await user.getIdToken();
    const headers = new Headers({
      Authorization: `Bearer ${authToken}` || "",
    });
    const response = await (
      await fetch(`${host}/exercises`, { headers, mode: "cors" })
    ).json();
    return response.data;
  };

  useEffect(() => {
    try {
      (async () => setData(await fetchAllExercises()))();
    } catch (e) {
      setError(e.message);
    }
  }, [user]);

  return { data, loading: data === undefined, error };
};

export { useExercises };
