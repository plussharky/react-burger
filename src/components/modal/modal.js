import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css'
import ModalOverlay from './modal-overlay/modal-overlay';

const Modal = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true)

    const onClose = () => {
        setIsOpen(false);
    }

    const onClick = (e) => {
        e.stopPropagation();
    }

    useEffect(() => {
        const handleEscClose = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscClose);

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        };
    },[]);

    if (!isOpen) {
        return null;
    }

    const modalRoot = document.getElementById('modals-root');

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal} onClick={onClick}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
                <div className={styles.content}>{children}</div>
            </div>
            <ModalOverlay onClose={onClose}/>
        </>
    , modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;