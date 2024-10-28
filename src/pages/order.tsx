import styles from './order.module.css';
import { useSelector } from '../hooks/react-redux';
import { useParams } from "react-router-dom";
import { GradientIcon } from '../components/gradient-icon/gradient-icon';
import { TIngredient } from '../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatDate } from '../utils/date-formatter';
import { useMemo } from 'react';
import { OrderInfo } from '../components/order-info/order-info';


export function Order() {
    return (
        <div className={styles.main}>
            <OrderInfo />
        </div>
    );
}