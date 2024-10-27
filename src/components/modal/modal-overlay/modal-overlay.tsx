import styles from './modal-over.module.css';

export function ModalOverlay({ onClose }: {onClose: () => void}) {
  return (<div className={styles.modalOverlay} onClick={onClose}></div>);
};