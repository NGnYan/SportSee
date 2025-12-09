const LoaderError = ({ loading, error, loadingMessage = "Chargement..." }) => {
  if (loading) {
    return <div className="loader-error">{loadingMessage}</div>;
  }

  if (error) {
    return <div className="loader-error">{error.message}</div>;
  }

  return null;
};

export default LoaderError;
