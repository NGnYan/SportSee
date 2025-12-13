import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import "../styles/components/AverageSessionsChart.css";
import { getUserAverageSessions } from "../services/api";
import { useFetchData } from "../hooks/useFetchData";
import LoaderError from "./LoaderError";

function CustomTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null;
  return <div className="avg-tooltip">{`${payload[0].value} min`}</div>;
}

function CustomCursor({ points, y, width, height }) {
  return (
    <Rectangle
      x={points[0].x}
      y={y || 0}
      width={width || 60}
      height={height + 100}
      fill="rgba(0, 0, 0, 0.1)"
      pointerEvents="none"
    />
  );
}

function AverageSessionsChart({ userId }) {
  const {
    data: sessions,
    loading,
    error,
  } = useFetchData(getUserAverageSessions, userId, "sessions");

  const isEmpty = !sessions || sessions.length === 0;

  if (loading || error || isEmpty) {
    return (
      <LoaderError
        loading={loading}
        error={error}
        empty={isEmpty}
        loadingMessage="Chargement du graphique..."
        errorMessage="Impossible de récupérer les données de sessions."
        emptyMessage="Aucune donnée disponible."
      />
    );
  }

  return (
    <div className="avg-chart-container">
      <div className="avg-chart-title">
        Durée moyenne des
        <br />
        sessions
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sessions}
          margin={{ top: 30, right: 5, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" x2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={1} />
            </linearGradient>
          </defs>

          <YAxis hide domain={["dataMin - 15", "dataMax + 45"]} />

          <XAxis
            dataKey="index"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 14 }}
            interval={0}
            padding={{ left: 20, right: 20 }}
            tickFormatter={(value) => {
              const days = ["L", "M", "M", "J", "V", "S", "D"];
              return days[value];
            }}
          />

          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />

          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="url(#lineGradient)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: "#fff",
              stroke: "rgba(255,255,255,0.4)",
              strokeWidth: 8,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AverageSessionsChart;
