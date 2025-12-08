import { useState, useEffect } from "react";
import { transformFactory } from "../services/transformData";

export function useFetchData(fetchFunction, userId, transformType = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const raw = await fetchFunction(userId);

        const transform = transformFactory(transformType);
        const formatted = transform(raw);

        setData(formatted);
        setError(null);
      } catch (err) {
        console.error("Erreur fetch data:", err);
        setError("Impossible de récupérer les données pour le moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, userId, transformType]);

  return { data, loading, error };
}
