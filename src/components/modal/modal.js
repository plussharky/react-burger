import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css'
import ModalOverlay from './modal-overlay/modal-overlay';

const Modal = ({ title = "", onClose = null, children  }) => {
    const [isOpen, setIsOpen] = useState(true)

    const handleClose = useCallback(() => {
        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const onClick = (e) => {
        e.stopPropagation();
    }

    useEffect(() => {
        const handleEscClose = (event) => {
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
                <div className={styles.content}>{children}</div>
            </div>
            <ModalOverlay onClose={handleClose}/>
        </>
    , modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;