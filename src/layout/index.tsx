import { Link } from "react-router-dom";
import "./styles.css";
import links from "../utils/links";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <header>
        <section className="header-container">
          <Link to={links.root}>
            <h1 className="logo">CineLand</h1>
          </Link>
        </section>
      </header>
      <main>
        <section className="main-container">{children}</section>
      </main>
      <footer>
        <section className="footer-container">
          <p>© 2025 @madeliyricra. Todos los derechos reservados.</p>
        </section>
      </footer>
    </div>
  );
};

export default Layout;
