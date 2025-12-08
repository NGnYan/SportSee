import { useParams, useNavigate } from "react-router-dom";
import "../styles/pages/Dashboard.css";
import WelcomeBanner from "../components/WelcomeBanner";
import NavbarTop from "../components/NavbarTop";
import NavbarLeft from "../components/NavbarLeft";
import ActivityBarChart from "../components/ActivityBarChart";
import AverageSessionsChart from "../components/AverageSessionsChart";
import RadarPerformance from "../components/RadarPerformance";
import ScoreRadial from "../components/ScoreRadial";
import StatCard from "../components/StatCard";
import { useFetchData } from "../hooks/useFetchData";

/* ICONS */
import calorieIcon from "../assets/calories.svg";
import proteinIcon from "../assets/protein.svg";
import carbohydrateIcon from "../assets/carbohydrate.svg";
import lipidIcon from "../assets/lipid.svg";

import { getUserMainData } from "../services/api";

function Dashboard() {
  const { id } = useParams();
  const userId = parseInt(id);
  const { data: user, loading, error } = useFetchData(getUserMainData, userId);

  const navigate = useNavigate();

  if (!loading && !user) {
    navigate("/error");
    return null;
  }

  if (loading) {
    return (
      <div className="loader-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          width="50"
          height="50"
        >
          <path
            fill="#000000"
            d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z"
          />
        </svg>
      </div>
    );
  }

  if (error) {
    return <div>Impossible de récupérer les données de l’utilisateur.</div>;
  }

  const firstName = user.userInfos.firstName;
  const message = "Félicitation ! Vous avez explosé vos objectifs hier 👏";

  return (
    <section className="dashboard">
      <header>
        <NavbarTop />
        <NavbarLeft />
      </header>
      <main>
        <WelcomeBanner name={firstName} message={message} />

        <div className="dashboard-container">
          <div className="chart-container">
            <div className="activity-chart">
              <ActivityBarChart userId={userId} />
            </div>
            <div className="stat-chart">
              <AverageSessionsChart userId={userId} />
              <RadarPerformance userId={userId} />
              <ScoreRadial userId={userId} />
            </div>
          </div>

          <div className="stat-container">
            <StatCard
              icon={calorieIcon}
              value={user.keyData.calorieCount}
              unit="kCal"
              label="Calories"
              bg="calorie"
            />
            <StatCard
              icon={proteinIcon}
              value={user.keyData.proteinCount}
              unit="g"
              label="Protéines"
              bg="protein"
            />
            <StatCard
              icon={carbohydrateIcon}
              value={user.keyData.carbohydrateCount}
              unit="g"
              label="Glucides"
              bg="carbohydrate"
            />
            <StatCard
              icon={lipidIcon}
              value={user.keyData.lipidCount}
              unit="g"
              label="Lipides"
              bg="lipid"
            />
          </div>
        </div>
      </main>
    </section>
  );
}

export default Dashboard;
