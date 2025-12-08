import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { getUserActivity } from "../services/api";
import { useFetchData } from "../hooks/useFetchData";
import "../styles/components/ActivityBarChart.css";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const weightData = payload.find((p) => p.dataKey === "kilogram");
    const caloriesData = payload.find((p) => p.dataKey === "calories");

    return (
      <div className="activity-custom-tooltip">
        <p>{weightData ? `${weightData.value}kg` : ""}</p>
        <p>{caloriesData ? `${caloriesData.value}Kcal` : ""}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = () => (
  <div className="activity-custom-legend">
    <div className="activity-legend-item">
      <div className="activity-legend-color weight"></div>
      <span>Poids (kg)</span>
    </div>
    <div className="activity-legend-item">
      <div className="activity-legend-color calories"></div>
      <span>Calories brûlées (kCal)</span>
    </div>
  </div>
);

function ActivityBarChart({ userId }) {
  const {
    data: activityData,
    loading,
    error,
  } = useFetchData(getUserActivity, userId, "activity");

  if (loading) {
    return <div>Chargement du graphique...</div>;
  }

  if (error) {
    return (
      <div className="activity-chart-container">
        Impossible de récupérer les données pour cet utilisateur.
      </div>
    );
  }

  if (!activityData || activityData.length === 0) {
    return (
      <div className="activity-chart-container">
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

      <ResponsiveContainer width="100%" height={140}>
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

export default ActivityBarChart;
