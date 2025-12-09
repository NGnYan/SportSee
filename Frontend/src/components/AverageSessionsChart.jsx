import {
  AreaChart,
  Area,
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

  return <div className="avg-tooltip">{payload[0].value} min</div>;
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
      <div className="avg-chart-title">Durée moyenne des sessions</div>

      <ResponsiveContainer>
        <AreaChart
          data={sessions}
          margin={{ top: 60, right: 0, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorSession" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0, 0, 0, 0.05)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255, 255, 255, 0.6)", fontSize: 14 }}
            padding={{ left: 30, right: 30 }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={(props) => {
              const { x, height } = props;

              return (
                <Rectangle
                  x={x - 30}
                  y={0}
                  width={60}
                  height={height}
                  fill="rgba(0,0,0,0.15)"
                  radius={0}
                />
              );
            }}
          />

          <Area
            type="monotone"
            dataKey="sessionLength"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth={2}
            fill="url(#colorSession)"
            activeDot={{
              r: 6,
              fill: "#fff",
              stroke: "rgba(255,255,255,0.3)",
              strokeWidth: 10,
            }}
            animationDuration={1200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AverageSessionsChart;
