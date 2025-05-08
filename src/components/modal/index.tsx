import type { ReactNode } from "react";
import "./styles.css";

interface IModalProps {
    children: ReactNode;
    onClose: () => void;
}

const Modal = ({ children, onClose }: IModalProps) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;