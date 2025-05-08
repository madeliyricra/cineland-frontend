import type { ICandy } from "./candy";
import type { IPremiere } from "./premiere";

export interface ICineStore {
    addToCart: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    candies: ICandy[];
    setCandies: React.Dispatch<React.SetStateAction<ICandy[]>>;
    total: number;
    premiere: IPremiere;
    addPremiere: (premier: IPremiere) => void;
    cart: ICandy[];
}