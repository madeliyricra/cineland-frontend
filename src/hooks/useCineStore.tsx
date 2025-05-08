import React, { createContext, useContext, useEffect, useState } from "react";
import type { ICandy } from "../interfaces/candy";
import type { IPremiere } from "../interfaces/premiere";
import type { ICineStore } from "../interfaces/cine-store";

const CineStoreContext = createContext<ICineStore | null>(null);

export const CineStoreProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [candies, setCandies] = useState<ICandy[]>([]);
    const [cart, setCart] = useState<ICandy[]>([]);
    const [premiere, setPremiere] = useState<IPremiere>({} as IPremiere);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        calculateTotal();
    }, [cart, premiere]);

    const calculateTotal = () => {
        let newTotal = cart.reduce((acc, candy) => {
            return acc + candy.price * (candy.quantity || 0);
        }, 0);
        newTotal += premiere?.price || 0;
        setTotal(newTotal);
    };

    const addToCart = (id: number, quantity: number) => {
        const candy = candies?.find((candy) => candy.id === id);
        if (!candy) return;
        const candyObject = {
            id: candy.id,
            name: candy.name,
            image: candy.image,
            price: candy.price,
            quantity: 1,
        };

        const existingCandy = cart?.find((candy) => candy.id === id);
        if (existingCandy) {
            const updatedCart = cart?.map((candy) => {
                if (candy.id === id) {
                    return { ...candy, quantity: quantity };
                }
                return candy;
            });
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...candyObject, quantity: 1 }]);
        }
    };

    const removeFromCart = (id: number) => {
        const candy = cart?.find((candy) => candy.id === id);
        if (candy) {
            const updatedCart = cart?.filter((candy) => candy.id !== id);
            setCart(updatedCart);
        }
    };

    const clearCart = () => {
        setCart([]);
        setTotal(0);
        setPremiere({} as IPremiere);
    };

    const addPremiere = (data: IPremiere) => {
        setPremiere(data);
    };

    return (
        <CineStoreContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                candies,
                setCandies,
                total,
                premiere,
                addPremiere
            }}
        >
            {children}
        </CineStoreContext.Provider>
    );
};

export const useCineStore = () => useContext(CineStoreContext);
