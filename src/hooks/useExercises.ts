import { useEffect, useState } from "react";
import { useAuth } from "../components/Context/UserContext";
import { ApiRequest, makeAuthenticatedRequest } from "../utils/api";

export type Exercise = {
  ID: number;
  Name: string;
};

const useExercises = (): ApiRequest<Exercise[]> => {
  const { user } = useAuth();
  if (!user) throw Error("No user is authenticated");

  const [data, setData] = useState<Exercise[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  const fetchAllExercises = async () =>
    makeAuthenticatedRequest(user, "/exercises");

  useEffect(() => {
    try {
      (async () => setData(await fetchAllExercises()))();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  return { data, loading, error };
};

export { useExercises };
