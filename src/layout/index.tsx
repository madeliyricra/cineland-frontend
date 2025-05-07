import { Link } from "react-router-dom";
import "./styles.css";
import { FaUser } from "react-icons/fa6";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <header>
        <section className="header-container">
          <Link to="/">
            <h1 className="logo">CineLand</h1>
          </Link>
          <nav className="menu">
            <Link className="menu-item" to="/">
              Home
            </Link>
            <Link className="menu-item" to="/sweet-shop">
              Dulcería
            </Link>
          </nav>
          <FaUser />
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
