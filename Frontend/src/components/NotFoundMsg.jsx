import "../styles/components/NotFoundMsg.css";

const NotFoundMsg = ({ message }) => {
  return (
    <div className="notfound-container">
      <div className="notfound-bubble">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default NotFoundMsg;
