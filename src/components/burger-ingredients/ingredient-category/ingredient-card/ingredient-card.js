import React from 'react';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

const IngredientCard = ({ item }) => {
    return (
        <div className={styles.card}>
            <Counter count={1} size="default" extraClass={styles.counter}/>
            <img src={item.image} alt={item.name} className={styles.image} />
            <div className={styles.price}>
                <span>{item.price} </span>&nbsp;<CurrencyIcon type="primary" />
            </div>
            <p className={styles.name}>{item.name}</p>
        </div>
    );
};

export default IngredientCard;
