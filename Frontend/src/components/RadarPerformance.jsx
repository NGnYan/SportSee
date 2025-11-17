import "../styles/components/RadarPerformance.css";
import { RadarChart, Radar, PolarAngleAxis, PolarGrid } from "recharts";

const data = [
  {
    subject: "Math",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Chinese",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "English",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Geography",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Physics",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "History",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export const RadarChartExample = () => (
  <RadarChart
    className="radar-container"
    responsive
    data={data}
    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
  >
    <PolarGrid radialLines={false} />
    <PolarAngleAxis
      dataKey="subject"
      tick={{ fontSize: "0.7rem", fill: "#fff" }}
      domain={[0, 100]}
    />

    <Radar dataKey="A" fill="#ff0000ff" fillOpacity={0.6} activeDot={false} />
  </RadarChart>
);
export default RadarChartExample;
