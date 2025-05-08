import { useState } from "react";
import { useCineStore } from "../../hooks/useCineStore";
import type { ICandy } from "../../interfaces/candy";
import notItem from "./../../assets/images/not-item.png";
import type { ICineStore } from "../../interfaces/cine-store";
import "./styles.css";

const CandyCard = (props: ICandy) => {
    const { id, name, image, price } = props;

    const { addToCart, removeFromCart } = useCineStore() as ICineStore;
    const [quantity, setQuantity] = useState(0);

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        addToCart(id, newQuantity);
    };

    const handleDecrease = () => {
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        if (newQuantity === 0) {
            removeFromCart(id);
        } else {
            addToCart(id, newQuantity);
        }
    };

    return (
        <article className="candy-card">
            <h3 className="candy-card-title">{name}</h3>
            <img src={image || notItem} alt={name} />
            <hr />
            <div className="candy-card-content">
                <div className="quantity-controls">
                    <button onClick={handleDecrease} disabled={quantity === 0}>
                        -
                    </button>
                    <input
                        type="text"
                        value={quantity}
                        readOnly
                    />
                    <button onClick={handleIncrease}>+</button>
                </div>
                <p>S/ {price.toFixed(2)}</p>
            </div>
        </article>
    );
};

export default CandyCard;
