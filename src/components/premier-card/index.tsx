import { useLayoutEffect, useState } from "react";
import type { IPremiere } from "../../interfaces/premiere";
import notItem from "./../../assets/images/not-item.png";
import { useCineStore } from "../../hooks/useCineStore";
import type { ICineStore } from "../../interfaces/cine-store";
import "./styles.css";

const getDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}min`;
};

const PremierCard = (props: IPremiere) => {
  const { name, description, image, duration, type, price } = props;
  const { addPremiere, premiere } = useCineStore() as ICineStore;

  const [isSelected, setIsSelected] = useState(false);

  useLayoutEffect(() => {
    const selected = premiere?.id === props.id;
    setIsSelected(selected);
  }, [premiere]);

  const handleCheck = () => {
    const newSelected = !isSelected;
    setIsSelected(newSelected);

    if (newSelected) {
      addPremiere(props);
    } else {
      addPremiere({} as IPremiere);
    }
  };

  return (
    <article className="premier-card" onClick={handleCheck}>
      <img
        src={image || notItem}
        alt={name}
      />
      <div>
        <p className="tags">
          <span className="tag">{getDuration(duration)}</span>
          <span className="tag">{type}</span>
        </p>
        <h3 className="premier-card-title">{name}</h3>
        <p className="premier-card-description">{description}</p>
        <p className="premier-card-price">
          <span className="price">S/ {price?.toFixed(2)}</span>
        </p>
        <label className="premier-checkbox">
          <input type="checkbox" checked={isSelected} readOnly />
          <span className="icon"></span>
        </label>
      </div>
    </article>
  );
};

export default PremierCard;
