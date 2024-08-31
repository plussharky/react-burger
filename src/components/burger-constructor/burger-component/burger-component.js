import React from 'react';
import styles from './burger-component.module.css';
import { CurrencyIcon, DeleteIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerComponent = (props) => {
    
    return (
        <div className={styles.row}>
            <DragIcon type="primary"/>
            <div className={styles.burgerComponent}>
                <img src={props.item.image_mobile} alt={props.item.name} className={styles.image} />
                <span className={styles.name}>{props.item.name}</span>
                <div className={styles.price}>
                    <span>{props.item.price}</span>&nbsp;<CurrencyIcon type="primary" />
                </div>
                <DeleteIcon type="primary" />
            </div>
        </div>
    );
}

BurgerComponent.propTypes = { 
    item: PropTypes.exact({
        _id: PropTypes.string,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string,
        __v: PropTypes.number
    })
}

export default BurgerComponent;
 