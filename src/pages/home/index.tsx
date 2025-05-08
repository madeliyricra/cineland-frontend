import { useRef, useState } from "react";
import { useCineStore } from "../../hooks/useCineStore";
import notItem from '../../assets/images/not-item.png'
import "./styles.css";
import Checkout from "../checkout";
import Premieres from "../premieres";
import Candies from "../candies";
import { Modal } from "../../components";
import { FaUser } from "react-icons/fa";

const STEPS: string[] = ["Premier", "Dulcería", "Pago"];
const MAX_STEPS: number = STEPS.length;

const Home = () => {
    const { total, premiere, cart } = useCineStore() as any;
    const checkoutRef = useRef<HTMLFormElement>(null);

    const [currentStep, setCurrentStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const nextStep = () => {
        if (currentStep < MAX_STEPS) {
            const newStep = currentStep + 1
            if (newStep === 2) {
                setIsModalOpen(true);
                return
            }
            setCurrentStep(newStep);
        }
    };

    const isDisbledStep = (): boolean => {
        if (currentStep === 1 && (!premiere?.id || total <= 0)) {
            return true;
        }
        if (currentStep === 2 && (total <= 0 || !cart?.length)) {
            return true;
        }
        return false;
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Premieres />;
            case 2:
                return <Candies />;
            case 3:
                return <Checkout ref={checkoutRef} setLoading={setLoading} />;
            default:
                return <></>;
        }
    };

    const handleCheckout = () => {
        if (checkoutRef.current) {
            checkoutRef.current.requestSubmit();
        }
    };

    const handleContinueAsGuest = () => {
        setIsModalOpen(false);
        if (currentStep < MAX_STEPS) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleGoogleSignIn = () => {
        alert('Ups! Esta funcionalidad aún no está disponible.');
    };

    return (
        <>
            <div className="steps-container">
                {STEPS.map((step, index) => (
                    <div
                        key={index}
                        className={`step ${currentStep === index + 1 ? "active" : ""}`}
                    >
                        <span className="step-number">{index + 1}</span>
                        <span className="step-label">{step}</span>
                    </div>
                ))}
            </div>
            <div className="home-container">
                <section> {renderStep()}</section>
                <section className="summary">
                    {currentStep === 1 && !premiere?.id && (
                        <p className="note">
                            Debe seleccionar una película para continuar.
                        </p>
                    )}
                    {premiere?.id && (
                        <article className="summary-premiere">
                            <img src={premiere.image || notItem} alt={premiere.name} />
                            <h4>{premiere.name}</h4>
                        </article>
                    )}

                    <br />

                    <section className="summary-candies scroll-custom">
                        {cart?.map((item: any) => (
                            <article key={item.id} className="summary-item">
                                <img src={item.image || notItem} alt={item.name} />
                                <section className="summary-item-content">
                                    <h5 className="summary-item-title">{item.name}</h5>
                                    <div>
                                        <p className="summary-item-attribute">
                                            Cantidad: {item.quantity}
                                        </p>
                                        <p className="summary-item-attribute">
                                            Precio: S/{item.price.toFixed(2)}
                                        </p>
                                    </div>
                                </section>
                            </article>
                        ))}
                    </section>

                    <h6 className="summary-total">
                        Total: <strong>S/{total.toFixed(2)}</strong>
                    </h6>
                    <br />

                    {!cart?.length && currentStep === 2 && (
                        <>
                            <p className="note">
                                Debe agregar al menos un ítem de la dulcería para continuar.
                            </p>
                            <br />
                        </>
                    )}

                    {currentStep < MAX_STEPS && (
                        <button onClick={nextStep} disabled={isDisbledStep()}>
                            Continuar
                        </button>
                    )}

                    {currentStep === MAX_STEPS && (
                        <button onClick={handleCheckout} disabled={loading}>{loading ? 'Procesando pago...' : 'Realizar compra'}</button>
                    )}
                </section>
            </div>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <section className="modal-login">
                        <h2>Elige cómo continuar</h2>
                        <FaUser size="3rem" color="#a786df" />
                        <button onClick={handleContinueAsGuest}>Continuar como Invitado</button>
                        <button onClick={handleGoogleSignIn}>Iniciar sesión con Google</button>
                    </section>
                </Modal>
            )}
        </>
    );
};

export default Home;
