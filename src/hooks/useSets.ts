import { useEffect, useState } from "react";
import { useAuth } from "../components/Context/UserContext";
import { ApiRequest, makeAuthenticatedRequest } from "../utils/api";

export type Set = {
  ID: number;
  Reps: number;
  Weight: number;
  Unit: "kg" | "lb";
  ExerciseId: number;
  CreatedAt: string;
};

const useSets = (exerciseId: number): ApiRequest<Set[]> => {
  const { user } = useAuth();
  if (!user) throw Error("No user is authenticated");

  const [data, setData] = useState<Set[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  const fetchSets = async () =>
    makeAuthenticatedRequest(user, `/exercise/${exerciseId}/sets`);

  useEffect(() => {
    try {
      (async () => setData(await fetchSets()))();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  return { data, loading, error };
};

export { useSets };
