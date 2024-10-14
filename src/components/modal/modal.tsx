import React, { useEffect, useState, useCallback, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css'
import ModalOverlay from './modal-overlay/modal-overlay';

type TModalPorops = {
    title?: string;
    onClose?: () => void;
    children: ReactNode;
}

function Modal ({ title = "", onClose = () => {}, children }: TModalPorops) {
    const [isOpen, setIsOpen] = useState(true)

    const handleClose = useCallback(() => {
        setIsOpen(false);
        onClose();
    }, [onClose]);

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }

    useEffect(() => {
        const handleEscClose = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscClose);

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        };
    },[handleClose]);

    if (!isOpen) {
        return null;
    }

    const modalRoot = document.getElementById('modals-root');

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal} onClick={onClick}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <CloseIcon type="primary" onClick={handleClose}/>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
            <ModalOverlay onClose={handleClose}/>
        </>
    , modalRoot!
  );
};
export default Modal;