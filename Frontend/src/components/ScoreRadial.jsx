import React, { useState, useEffect } from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { getUserMainData } from "../services/api";
import "../styles/components/ScoreRadial.css";

function ScoreRadial({ userId }) {
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchScore() {
      try {
        setLoading(true);
        const userData = await getUserMainData(userId);

        const userScore = userData.todayScore ?? userData.score ?? 0;

        const scorePercentage = userScore < 1 ? userScore * 100 : userScore;

        setScore(Math.round(scorePercentage));
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement du score:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchScore();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="score-wrapper">
        <div className="score-card">
          <h3 className="score-title">Score</h3>
          <div className="score-container">
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
          <h3 className="score-title">Score</h3>
          <div className="score-container">
            <p>Erreur: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  const data = [
    {
      name: "Score",
      value: score,
      fill: "#ef4444",
    },
  ];

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
}

export default ScoreRadial;
