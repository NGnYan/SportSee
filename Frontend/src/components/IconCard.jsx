import "../styles/components/IconCard.css";

const IconCard = ({ icon, alt }) => {
  return (
    <div className="icon-card">
      <img src={icon} alt={alt} className="icon-card-img" />
    </div>
  );
};

export default IconCard;
