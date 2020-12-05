import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../components/Context/UserContext";

export type Exercise = {
  id: number;
  name: string;
};

const useExercises = () => {
  const { user } = useAuth();
  const [data, setData] = useState<Exercise[]>();
  const [error, setError] = useState<string>();
  const host = process.env.REACT_APP_SERVER_HOST || "";

  const fetchAllExercises = useCallback(
    async (token: unknown) => {
      const response = await (
        await fetch(`${host}/exercises`, {
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        })
      ).json();

      return response.data;
    },
    [host]
  );

  const fetchData = useCallback(async () => {
    try {
      const token = await user?.getIdToken();
      setData(await fetchAllExercises(token));
    } catch (e) {
      setError(e.message);
    }
  }, [user, fetchAllExercises]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading: data === undefined, error };
};

export { useExercises };
