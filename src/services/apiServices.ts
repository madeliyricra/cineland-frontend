import type { ICandy } from "../interfaces/candy";
import type { IOrder } from "../interfaces/order";
import type { IPremiere } from "../interfaces/premiere";

const { VITE_API } = import.meta.env;

const APR_URL = VITE_API;

export const getPremieres = async () => {
    try {
        const response = await fetch(`${APR_URL}/premieres`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch premieres");
        }

        const info = await response.json();
        const premieres: IPremiere[] = info?.data
        return {
            ...info,
            data: premieres
        };

    } catch (error) {
        console.error("Error fetching premieres:", error);
        throw error;
    }
};

export const getCandies = async () => {
    try {
        const response = await fetch(`${APR_URL}/candies`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch candies");
        }

        const data = await response.json();
        const candies: ICandy[] = data?.data;
        return {
            ...data,
            data: candies,
        }
    } catch (error) {
        console.error("Error fetching candies:", error);
        throw error;
    }
};


export const postOrder = async (data: IOrder) => {
    try {
        const response = await fetch(`${APR_URL}/complete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to post order");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error posting order:", error);
        throw error;
    }
}


export const getOrderByID = async (id: string) => {
    try {
        const response = await fetch(`${APR_URL}/orders/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch order");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
}