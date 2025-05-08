import image from "./../../assets/images/404.png";
import links from "./../../utils/links";
import "./styles.css";

const NotFound = () => {
    return (
        <div className="page-not-found">
            <img src={image} alt="Error 404" width={'400px'} />
            <button onClick={() => window.open(links.root, "_self")}>
                Página no encontrada, ir al inicio
            </button>
        </div>
    );
};

export default NotFound;
