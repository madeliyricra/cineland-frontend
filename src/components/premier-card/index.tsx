import type { IPremier } from "../../interfaces/premier";
import notProduct from "./../../assets/images/not-product.png";
import "./styles.css";

const getDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}min`;
};

const PremierCard = (props: IPremier) => {
  const { name, description, image, duration, type } = props;
  return (
    <article className="premier-card">
      <img src={notProduct} alt={name} />
      <div>
        <p className="tags">
          <span className="tag">{getDuration(duration)}</span>
          <span className="tag">{type}</span>
        </p>
        <h3 className="premier-card-title">{name}</h3>
        <p className="premier-card-description">{description}</p>
      </div>
    </article>
  );
};

export default PremierCard;
