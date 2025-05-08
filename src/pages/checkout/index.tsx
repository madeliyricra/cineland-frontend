import { forwardRef, useState, type Ref } from "react";
import { useForm } from "react-hook-form";
import "./styles.css";
import type { ICheckoutProps, IFieldProps } from "./props";
import { md5 } from "js-md5";
import {
    PAYU_ACCOUNT_ID,
    PAYU_API_KEY,
    PAYU_API_LOGIN,
    PAYU_MERCHANT_ID,
    PAYU_URL,
} from "../../utils/constants";
import type { ICineStore } from "../../interfaces/cine-store";
import { useCineStore } from "../../hooks/useCineStore";
import { postOrder } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";

const FIELDS: IFieldProps[] = [
    {
        label: "Número de Tarjeta",
        styles: { gridColumn: "span 2" },
        name: "cardNumber",
        type: "number",
        placeholder: "XXXX XXXX XXXX XXXX",
        maxLength: 16,
        rules: {
            required: "Este campo es obligatorio",
            pattern: {
                value: /^[0-9]{15,16}$/,
                message: "Ingrese un número de tarjeta válido",
            },
        },
    },
    {
        label: "Fecha de Expiración (YYYY/MM)",
        name: "expirationDate",
        type: "text",
        placeholder: "YYYY/MM",
        rules: {
            required: "Este campo es obligatorio",
            pattern: {
                value: /^(20[2-9]\d)\/(0[1-9]|1[0-2])$/,
                message: "Ingrese una fecha válida (YYYY/MM)",
            },
        },
    },
    {
        label: "CVV",
        name: "cvv",
        type: "number",
        placeholder: "XXX",
        maxLength: 3,
        rules: {
            required: "Este campo es obligatorio",
            maxLength: {
                value: 3,
                message: "El CVV debe tener 3 dígitos",
            },
            pattern: {
                value: /^[0-9]{3}$/,
                message: "Ingrese un CVV válido",
            },
        },
    },
    {
        label: "Correo Electrónico",
        name: "email",
        type: "email",
        placeholder: "example@gmail.com",
        rules: {
            required: "Este campo es obligatorio",
            pattern: {
                value: /^\S+@\S+$/i,
                message: "Ingrese un correo electrónico válido",
            },
        },
    },
    {
        label: "Nombre",
        name: "name",
        type: "text",
        placeholder: "Nombre completo",
        rules: {
            required: "Este campo es obligatorio",
        },
    },
    {
        label: "Tipo de Documento",
        name: "documentType",
        type: "select",
        placeholder: "Seleccione un tipo de documento",
        options: [{ label: "DNI", value: "dni" }],
        rules: {
            required: "Este campo es obligatorio",
        },
    },
    {
        label: "Número de Documento",
        name: "documentNumber",
        type: "text",
        maxLength: 8,
        placeholder: "Número de documento",
        rules: {
            required: "Este campo es obligatorio",
        },
    },
];

interface CheckoutProps {
    setLoading: (value: boolean) => void;
}

const Checkout = forwardRef<HTMLFormElement, CheckoutProps>(
    ({ setLoading }, ref) => {
        const {
            register,
            handleSubmit,
            formState: { errors },
            getValues,
        } = useForm<ICheckoutProps>();
        const { total, clearCart } = useCineStore() as ICineStore;
        const [error, setError] = useState("");
        const navigate = useNavigate();

        const referenceCode = `ORDER-${Date.now()}`;
        const currency = "PEN";

        const signature = md5(
            `${PAYU_API_KEY}~${PAYU_MERCHANT_ID}~${referenceCode}~${total}~${currency}`
        );

        const onSubmit = async () => {
            setLoading(true);
            setError("");
            const { ...data } = getValues();

            try {
                const response = await fetch(PAYU_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        language: "es",
                        command: "SUBMIT_TRANSACTION",
                        merchant: {
                            apiKey: PAYU_API_KEY,
                            apiLogin: PAYU_API_LOGIN,
                        },
                        transaction: {
                            order: {
                                accountId: PAYU_ACCOUNT_ID,
                                referenceCode: referenceCode,
                                description: "Pago de prueba",
                                language: "es",
                                signature: signature,
                                buyer: {
                                    emailAddress: data.email,
                                    fullName: data.name,
                                    contactPhone: "999999999",
                                    dniNumber: data.documentNumber,
                                },
                                additionalValues: {
                                    TX_VALUE: {
                                        value: total,
                                        currency: currency,
                                    },
                                },
                            },
                            payer: {
                                emailAddress: data.email,
                                fullName: data.name,
                                contactPhone: "999999999",
                                dniNumber: data.documentNumber,
                            },
                            creditCard: {
                                number: data.cardNumber,
                                securityCode: data.cvv,
                                expirationDate: data.expirationDate,
                                name: "APPROVED",
                            },
                            type: "AUTHORIZATION_AND_CAPTURE",
                            paymentMethod: "VISA",
                            paymentCountry: "PE",
                        },
                        test: true,
                    }),
                });

                const result = await response.json();

                const transactionId = result.transactionResponse?.transactionId;
                const operationDate = result.transactionResponse?.operationDate;
                if (transactionId) {
                    const responseOrder = await postOrder({
                        email: data.email,
                        fullName: data.name,
                        dni: data.documentNumber,
                        operationDate: operationDate,
                        transactionId: transactionId,
                    });

                    const { orderId } = responseOrder;
                    if (orderId) {
                        setLoading(false);
                        clearCart()
                        navigate(`/order/${orderId}`);
                    } else {
                        setError("Error al guardar la orden.");
                    }
                } else {
                    setError("Error al procesar el pago.");
                }
            } catch (err) {
                setError("Ocurrió un error durante la transacción.");
            } finally {
                setLoading(false);
            }
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;
            const numericValue = inputValue.replace(/\D/g, "");
            e.target.value = numericValue;
        };

        return (
            <div className="checkout-container">
                <h2>Formulario de Pago</h2>
                <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
                    {FIELDS.map(
                        ({
                            name,
                            label,
                            type,
                            placeholder,
                            options,
                            rules,
                            styles,
                            maxLength,
                        }) => {
                            const error = errors[name];
                            return (
                                <div className="form-group" key={name} style={styles}>
                                    <label>{label}</label>
                                    {type === "select" ? (
                                        <select {...register(name, rules)}>
                                            <option value="" disabled>
                                                {placeholder}
                                            </option>
                                            {options?.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={type === "number" ? "text" : type}
                                            placeholder={placeholder}
                                            maxLength={maxLength || 50}
                                            {...register(name, rules)}
                                            {...(type === "number"
                                                ? { onChange: handleInputChange }
                                                : {})}
                                        />
                                    )}
                                    {error && <p className="error-message">{error.message}</p>}
                                </div>
                            );
                        }
                    )}
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        );
    }
);

export default Checkout;
