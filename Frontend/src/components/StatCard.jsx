import "../styles/components/StatCard.css";

export default function StatCard({ icon, value, unit, label, bg }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${bg}`}>
        <img src={icon} alt={label} />
      </div>
      <div>
        <p>
          {value}
          {unit}
        </p>
        <p>{label}</p>
      </div>
    </div>
  );
}
