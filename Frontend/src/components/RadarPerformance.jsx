import "../styles/components/RadarPerformance.css";
import { RadarChart, Radar, PolarAngleAxis, PolarGrid } from "recharts";
import { getUserPerformance } from "../services/api";
import { useFetchData } from "../hooks/useFetchData";

const transformPerformance = (performance) => {
  if (!performance || !performance.data) return [];
  const kindFR = {
    cardio: "Cardio",
    energy: "Énergie",
    endurance: "Endurance",
    strength: "Force",
    speed: "Vitesse",
    intensity: "Intensité",
  };

  return performance.data.map((item) => ({
    subject: kindFR[performance.kind[item.kind]] || performance.kind[item.kind],
    value: item.value,
  }));
};

const RadarPerformance = ({ userId }) => {
  const { data, loading, error } = useFetchData(
    getUserPerformance,
    userId,
    transformPerformance
  );

  if (loading)
    return <div className="radar-container-loader">Chargement...</div>;
  if (error)
    return (
      <div className="radar-container-loader">
        Impossible de récupérer les performances
      </div>
    );
  if (!data || data.length === 0)
    return <div className="radar-container-loader">Aucune donnée</div>;

  const formatTick = (tick) =>
    tick?.charAt(0).toUpperCase() + tick?.slice(1).toLowerCase();

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
