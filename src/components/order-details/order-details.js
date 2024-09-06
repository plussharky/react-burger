import React from 'react';
import styles from './order-details.module.css';
import PropTypes from 'prop-types';
import check from '../../assets/icons/check.svg'

const OrderDetails = ({order}) => {
    return (
        <div className={styles.card}>
            <p className={styles.id}>{String(order.id).padStart(6, '0')}</p>
            <p className={styles.idLabel}>инедификатор заказа</p>
            <img className={styles.check} src={check} alt={"✅"}></img>
            <p className={styles.readiness}>{order.readiness}</p>
            <p className={styles.advice}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = { 
    order: PropTypes.exact({
        readiness: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    })
}

export default OrderDetails;