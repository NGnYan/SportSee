import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { getUserMainData } from "../services/api";
import { useFetchData } from "../hooks/useFetchData";
import "../styles/components/ScoreRadial.css";

const transformScore = (userData) => {
  if (!userData) return 0;
  const score = userData.todayScore ?? userData.score ?? 0;
  return score < 1 ? Math.round(score * 100) : Math.round(score);
};

const ScoreRadial = ({ userId }) => {
  const {
    data: score,
    loading,
    error,
  } = useFetchData(getUserMainData, userId, transformScore);

  if (loading) {
    return (
      <div className="score-wrapper">
        <div className="score-card">
          <div className="score-container-msg">
            <p>Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="score-wrapper">
        <div className="score-card">
          <div className="score-container-msg">
            <p>{error}</p>
          </div>
        </div>
      </div>
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
              innerRadius="70%"
              outerRadius="90%"
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar
                background={{ fill: "#e5e7eb" }}
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
