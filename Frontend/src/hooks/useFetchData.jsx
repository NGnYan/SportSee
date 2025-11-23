import { useState, useEffect } from "react";

export function useFetchData(fetchFunction, userId, transform = (d) => d) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction(userId);

        const formatted = transform(result);
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
  }, [fetchFunction, userId, transform]);

  return { data, loading, error };
}
