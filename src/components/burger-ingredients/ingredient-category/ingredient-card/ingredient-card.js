import React, { useState } from 'react';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../../../modal/modal';
import IngredientDetails from './ingredient-detalis/ingredient-details';

const IngredientCard = ({ item }) => {
    const [isShowModal, setIsShowModal] = useState(false);

    const onClick = () => {
        setIsShowModal(!isShowModal);
    }

    return (
        <div className={styles.card} onClick={onClick}>
            {isShowModal && 
                <Modal title="Детали ингредиента">
                    <IngredientDetails item={item}/>
                </Modal>}
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
        _id: PropTypes.string,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number
    })
}

export default IngredientCard;
