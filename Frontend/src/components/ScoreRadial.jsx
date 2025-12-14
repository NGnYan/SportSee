import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { getUserMainData } from "../services/api";
import { useFetchData } from "../hooks/useFetchData";
import LoaderError from "./LoaderError";
import "../styles/components/ScoreRadial.css";

const ScoreRadial = ({ userId }) => {
  const {
    data: score,
    loading,
    error,
  } = useFetchData(getUserMainData, userId, "score");

  const isEmpty = score == null;

  if (loading || error || isEmpty) {
    return (
      <LoaderError
        loading={loading}
        error={error}
        empty={isEmpty}
        loadingMessage="Chargement..."
        errorMessage="Impossible de récupérer le score."
        emptyMessage="Aucune donnée disponible."
      />
    );
  }

  const data = [{ name: "Score", value: score, fill: "#ef4444" }];

  return (
    <div className="score-wrapper">
      <div className="score-card">
        <h3 className="score-title">Score</h3>

        <div className="score-container">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="80%"
              outerRadius="95%"
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar
                background={{ fill: "#fbfbfb" }}
                dataKey="value"
                cornerRadius={10}
              />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="score-center">
            <div className="score-value">{score}%</div>
            <div className="score-sub">de votre</div>
            <div className="score-sub">objectif</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreRadial;
