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
      <h2 className="chart-title">Durée moyenne des sessions</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={sessions}
          margin={{ top: 60, right: 15, left: 15, bottom: 10 }}
        >
          <defs>
            <linearGradient id="gradientRed" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff0000" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#ff0000" stopOpacity={1} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
            padding={{ left: 10, right: 10 }}
          />

          <Tooltip cursor={<CustomCursor />} content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="white"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: "white",
              strokeOpacity: 0.3,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomCursor({ points, width, height }) {
  const { x } = points[0];
  return (
    <Rectangle
      fill="rgba(0, 0, 0, 0.1)"
      x={x}
      width={width - x}
      height={height}
    />
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
}

export default AverageSessionsChart;
