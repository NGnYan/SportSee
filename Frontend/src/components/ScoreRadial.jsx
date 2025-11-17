import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import "../styles/components/ScoreRadial.css";

function ScoreRadial() {
  const score = 12;

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
