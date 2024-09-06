import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-over.module.css';

const ModalOverlay = ({ onClose }) => {
  return <div className={styles.modalOverlay} onClick={onClose}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
