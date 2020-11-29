import { useEffect, useState } from "react";
import { useAuth } from "../components/Context/UserContext";

export type Set = {
  ID: number;
  Reps: number;
  Weight: number;
  Unit: "kg" | "lb";
  ExerciseId: number;
  CreatedAt: string;
};

const useSets = (exerciseId: number) => {
  const { user } = useAuth();
  if (!user) throw Error("No user is authenticated");

  const [data, setData] = useState<Set[]>();
  const [error, setError] = useState<string>();
  const host = process.env.REACT_APP_SERVER_HOST || "";

  const fetchSets = async () => {
    const authToken = await user.getIdToken();
    const headers = new Headers({
      Authorization: `Bearer ${authToken}` || "",
    });
    const response = await (
      await fetch(`${host}/exercise/${exerciseId}/sets`, {
        headers,
        mode: "cors",
      })
    ).json();

    return response.data;
  };

  useEffect(() => {
    try {
      (async () => setData(await fetchSets()))();
    } catch (e) {
      setError(e.message);
    }
  }, [user]);

  return { data, loading: data === undefined, error };
};

export { useSets };
