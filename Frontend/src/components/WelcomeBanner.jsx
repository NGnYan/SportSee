import "../styles/components/WelcomeBanner.css";

function WelcomeBanner({ name, message }) {
  return (
    <header className="welcome-banner-container">
      <h1 className="welcome-name">
        Bonjour <span>{name}</span>
      </h1>
      <p className="welcome-msg">{message}</p>
    </header>
  );
}

export default WelcomeBanner;
