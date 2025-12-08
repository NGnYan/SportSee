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

  if (loading) return <div className="avg-chart-loader">Chargement…</div>;
  if (error)
    return (
      <div className="avg-chart-loader">
        Impossible de récupérer les sessions.
      </div>
    );
  if (!sessions || sessions.length === 0)
    return <div className="avg-chart-loader">Aucune donnée</div>;

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
              <stop
                offset="5%"
                stopColor="rgba(255,255,255,0.4)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="rgba(255,255,255,0.1)"
                stopOpacity={0.1}
              />
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
            cursor={<Rectangle fill="rgba(0,0,0,0.15)" />}
          />

          <Area
            type="monotone"
            dataKey="sessionLength"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth={2}
            fill="url(#colorSession)"
            activeDot={{ r: 6, fill: "#fff" }}
            animationDuration={1200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AverageSessionsChart;
