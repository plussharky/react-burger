import styles from './modal-over.module.css';

function ModalOverlay({ onClose }: {onClose: () => void}) {
  return (<div className={styles.modalOverlay} onClick={onClose}></div>);
};

export default ModalOverlay;