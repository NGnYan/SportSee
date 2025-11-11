import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import "../styles/components/AverageSessionsChart.css";
import { getUserAverageSessions } from "../services/api";

function AverageSessionsChart({ userId = 12 }) {
  const [sessions, setSessions] = useState(null);

  useEffect(() => {
    getUserAverageSessions(userId)
      .then((data) => {
        const days = ["L", "M", "M", "J", "V", "S", "D"];
        const formatted = data.sessions.map((s, i) => ({
          day: days[i],
          sessionLength: s.sessionLength,
        }));
        setSessions(formatted);
      })
      .catch((err) =>
        console.error("Erreur récupération sessions moyennes:", err)
      );
  }, [userId]);

  if (!sessions) return <div>Chargement du graphique...</div>;

  return (
    <div className="average-sessions-chart">
      <h2 className="average-chart-title">Durée moyenne des sessions</h2>

      <ResponsiveContainer width="100%" height={80}>
        <LineChart
          data={sessions}
          margin={{ top: 0, right: 10, left: 10, bottom: 20 }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255, 255, 255, 0.6)", fontSize: 12 }}
            padding={{ left: 0, right: 0 }}
            tickMargin={15}
          />

          <Tooltip
            cursor={<CustomCursor />}
            content={<CustomTooltip />}
            wrapperStyle={{ outline: "none" }}
          />

          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="url(#lineGradient)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 5,
              fill: "white",
              stroke: "rgba(255, 255, 255, 0.3)",
              strokeWidth: 8,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* --- Custom Cursor corrigé --- */
function CustomCursor({ points, width, height, viewBox }) {
  if (!points || points.length === 0) return null;
  const { x } = points[0];

  return (
    <Rectangle
      fill="rgba(0, 0, 0, 0.1)"
      x={x}
      y={viewBox?.y || 0}
      width={width}
      height={viewBox?.height || height || 0}
    />
  );
}

/* --- Custom Tooltip inchangé --- */
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "4px 8px",
          borderRadius: "3px",
          fontSize: "12px",
          fontWeight: "500",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {`${payload[0].value} min`}
      </div>
    );
  }
  return null;
}

export default AverageSessionsChart;
