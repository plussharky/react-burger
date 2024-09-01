import React, { useState, useCallback } from 'react';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../../modal/modal';
import IngredientDetails from './ingredient-detalis/ingredient-details';
import { ingredientType } from '../../../../utils/types'

const IngredientCard = ({ item }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = useCallback(() => {
        setModalVisible((prev) => !prev);
    }, []);

    return (
        <div className={styles.card} onClick={toggleModal}>
            {isModalVisible && 
                <Modal 
                    title="Детали ингредиента"
                    onClose={toggleModal}
                >
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
    item: ingredientType
}

export default IngredientCard;
