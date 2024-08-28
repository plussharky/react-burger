import React from 'react';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

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

IngredientCard.propTypes = { 
    item: PropTypes.exact({
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number
    })
}

export default IngredientCard;
