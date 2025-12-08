import "../styles/pages/ErrorPage.css";
import NavbarTop from "../components/NavbarTop";
import NavbarLeft from "../components/NavbarLeft";
import NotFoundMsg from "../components/NotFoundMsg";

function ErrorPage() {
  return (
    <section className="dashboard">
      <header>
        <NavbarTop />
        <NavbarLeft />
      </header>
      <main>
        <NotFoundMsg message="Page non trouvée." />
      </main>
    </section>
  );
}

export default ErrorPage;
