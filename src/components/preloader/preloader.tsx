import { motion } from "framer-motion";
import styles from './preloader.module.css';

const spinTransition = {
  repeat: Infinity,
  ease: "easeInOut",
  duration: 1,
};

function Preloader() {
  return (
    <div className={styles.styleContainer}>
      <motion.span
        className={styles.styleSpan}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
};

export default Preloader;