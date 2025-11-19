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

function CustomTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null;

  return <div className="avg-tooltip">{payload[0].value} min</div>;
}

function AverageSessionsChart({ userId }) {
  const [sessions, setSessions] = useState(null);

  useEffect(() => {
    getUserAverageSessions(userId).then((data) => {
      const days = ["L", "M", "M", "J", "V", "S", "D"];
      const formatted = data.sessions.map((s, i) => ({
        day: days[i],
        sessionLength: s.sessionLength,
      }));
      setSessions(formatted);
    });
  }, [userId]);

  if (!sessions) return <div>Chargement…</div>;

  return (
    <div className="avg-chart-container">
      <div className="avg-chart-title">Durée moyenne des sessions</div>

      <ResponsiveContainer>
        <LineChart
          data={sessions}
          margin={{ top: 60, right: 0, left: 0, bottom: 20 }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255, 255, 255, 0.6)", fontSize: 14 }}
            padding={{ left: 30, right: 30 }}
          />

          <Tooltip content={<CustomTooltip />} cursor={false} />

          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            dot={false}
            activeDot={{
              r: 6,
              fill: "#fff",
            }}
            animationDuration={1200}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AverageSessionsChart;
