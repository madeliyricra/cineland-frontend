import image from "./../../assets/images/404.png";
import links from "./../../utils/links";

const NotFound = () => {
  return (
    <div className="page-not-found">
      <img src={image} alt="Error 404" width={100} />
      <button onClick={() => window.open(links.root, "_self")}>
        Página no encontrada, ir al inicio
      </button>
    </div>
  );
};

export default NotFound;
