import "../styles/components/RadarPerformance.css";
import { RadarChart, Radar, PolarAngleAxis, PolarGrid } from "recharts";
import { getUserPerformance } from "../services/api";
import { useFetchData } from "../hooks/useFetchData";
import LoaderError from "./LoaderError";

const RadarPerformance = ({ userId }) => {
  const { data, loading, error } = useFetchData(
    getUserPerformance,
    userId,
    "performance"
  );

  const isEmpty = !data || data.length === 0;

  if (loading || error || isEmpty) {
    return (
      <LoaderError
        loading={loading}
        error={error}
        empty={isEmpty}
        loadingMessage="Chargement..."
        errorMessage="Impossible de récupérer les performances."
        emptyMessage="Aucune donnée disponible."
      />
    );
  }

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
