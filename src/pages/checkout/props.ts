export interface ICheckoutProps {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    email: string;
    name: string;
    documentType: string;
    documentNumber: string;
};

export interface IFieldProps {
    label: string;
    styles?: React.CSSProperties;
    name: keyof ICheckoutProps;
    type: string;
    placeholder: string;
    maxLength?: number;
    options?: { label: string; value: string }[];
    rules: {
        required?: string;
        maxLength?: {
            value: number;
            message: string;
        };
        pattern?: {
            value: RegExp;
            message: string;
        };
    }
}