import { useNavigate, useParams } from "react-router-dom"
import links from "../../utils/links"
import './styles.css'
import { FaCheckCircle } from "react-icons/fa"
import { useLayoutEffect, useState } from "react"
import type { IOrder } from "../../interfaces/order"
import { getOrderByID } from "../../services/apiServices"
import { convertDate } from "../../utils/utils"

const Order = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState<IOrder>({} as IOrder);
    const [loading, setLoading] = useState<boolean>(true);

    const getData = async () => {
        try {
            const { data } = await getOrderByID(id || '');
            setOrder(data);
        } finally {
            setLoading(false);
        }
    };

    useLayoutEffect(() => {
        getData();
    }, []);

    const handleReturn = () => {
        navigate(links.root)
    }

    if (loading) {
        return (
            <section className="order-content content">
                <h1>Cargando...</h1>
            </section>
        )
    }

    return (
        <section className="order-content content">
            <FaCheckCircle size='4rem' color="#28a745" />
            <h1>¡Compra Confirmada!</h1>
            <p>Gracias por tu compra. Aquí están los detalles de tu transacción:</p>
            <div className="order-details">
                <p><strong>Correo electrónico:</strong> {order?.email}</p>
                <p><strong>Nombres:</strong> {order?.fullName}</p>
                <p><strong>Número de DNI:</strong> {order?.dni}</p>
                <p><strong>Fecha de operación:</strong> {convertDate(order?.operationDate)}</p>
                <p><strong>ID de transacción:</strong> {order?.transactionId}</p>
            </div>
            <button type="button" onClick={handleReturn}>Volver al inicio</button>
        </section>
    )
}

export default Order