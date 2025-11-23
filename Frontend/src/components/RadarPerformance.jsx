import { useEffect, useState } from "react";
import "../styles/components/RadarPerformance.css";
import { RadarChart, Radar, PolarAngleAxis, PolarGrid } from "recharts";
import { getUserPerformance } from "../services/api";

export const RadarPerformance = ({ userId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        setLoading(true);
        const performance = await getUserPerformance(userId);

        const kindFR = {
          cardio: "Cardio",
          energy: "Énergie",
          endurance: "Endurance",
          strength: "Force",
          speed: "Vitesse",
          intensity: "Intensité",
        };

        const transformedData = performance.data.map((item) => ({
          subject:
            kindFR[performance.kind[item.kind]] || performance.kind[item.kind],
          value: item.value,
        }));

        setData(transformedData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Erreur lors du chargement des performances:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPerformance();
    }
  }, [userId]);

  if (loading)
    return <div className="radar-container-loader">Chargement...</div>;
  if (error) return <div className="radar-container-loader">{error}</div>;
  if (!data.length)
    return <div className="radar-container-loader">Aucune donnée</div>;

  const formatTick = (tick) => {
    if (!tick) return "";
    return tick.charAt(0).toUpperCase() + tick.slice(1).toLowerCase();
  };

  return (
    <div className="radar-container">
      <RadarChart
        width={258}
        height={200}
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <PolarGrid radialLines={false} />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 12, fill: "#fff" }}
          tickFormatter={formatTick}
        />
        <Radar
          dataKey="value"
          fill="#ff0000ff"
          fillOpacity={0.6}
          activeDot={false}
        />
      </RadarChart>
    </div>
  );
};

export default RadarPerformance;
