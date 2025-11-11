import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getUserActivity } from "../services/api";
import "../styles/components/ActivityBarChart.css";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{payload[0] ? `${payload[0].value}kg` : ""}</p>
        <p>{payload[1] ? `${payload[1].value}Kcal` : ""}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = () => (
  <div className="custom-legend">
    <div className="legend-item">
      <div className="legend-color weight"></div>
      <span>Poids (kg)</span>
    </div>
    <div className="legend-item">
      <div className="legend-color calories"></div>
      <span>Calories brûlées (kCal)</span>
    </div>
  </div>
);

export default function ActivityBarChart({ userId = 12 }) {
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUserActivity(userId)
      .then((data) => {
        if (!data || !data.sessions) {
          console.error("Aucune donnée d'activité disponible");
          setActivityData([]);
          return;
        }
        const formatted = data.sessions.map((session, index) => ({
          day: index + 1,
          kilogram: session.kilogram,
          calories: session.calories,
        }));
        setActivityData(formatted);
      })
      .catch((err) => console.error("Erreur récupération activité:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return <div className="chart-container">Chargement du graphique...</div>;
  }

  if (!activityData || activityData.length === 0) {
    return (
      <div className="chart-container">
        Aucune donnée disponible pour cet utilisateur.
      </div>
    );
  }

  return (
    <div className="activity-chart-container">
      <div className="activity-chart-header">
        <h2>Activité quotidienne</h2>
        <CustomLegend />
      </div>

      <ResponsiveContainer width="100%" height={125}>
        <BarChart
          data={activityData}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
          barGap={8}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#DEDEDE"
          />
          <XAxis
            dataKey="day"
            tickLine={false}
            stroke="#DEDEDE"
            tick={{ fill: "#9B9EAC", fontSize: 14 }}
            dy={10}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9B9EAC", fontSize: 14 }}
            domain={["dataMin - 1", "dataMax + 1"]}
            tickCount={3}
            dx={10}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            axisLine={false}
            tickLine={false}
            hide={true}
            domain={[0, "dataMax + 50"]}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(196, 196, 196, 0.5)" }}
          />
          <Bar
            yAxisId="right"
            dataKey="kilogram"
            fill="#282D30"
            barSize={7}
            radius={[10, 10, 0, 0]}
          />
          <Bar
            yAxisId="left"
            dataKey="calories"
            fill="#E60000"
            barSize={7}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
