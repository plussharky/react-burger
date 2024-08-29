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
        image_mobile: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}

export default BurgerComponent;
 