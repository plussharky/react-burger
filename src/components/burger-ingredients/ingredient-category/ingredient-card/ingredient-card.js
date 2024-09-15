import React, { useState, useCallback, useMemo } from 'react';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../../modal/modal';
import IngredientDetails from './ingredient-detalis/ingredient-details';
import { ingredientType } from '../../../../utils/types'
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

const IngredientCard = ({ item }) => {
    const [ isModalVisible, setModalVisible ] = useState(false);
    const { bun, ingredients } = useSelector(store => store.burgerConstructor);

    const toggleModal = useCallback(() => {
        setModalVisible((prev) => !prev);
    }, []);

    const [{ isDragging }, dragRef] = useDrag({
        type: 'ingredient',
        item: { item },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const count = useMemo(() => {
        if (bun && item.type === "bun") {
            return item._id === bun._id ? 2 : 0;
        } 

        return ingredients.filter(ingredient => item._id === ingredient._id).length;
    }
    , [bun, ingredients, item]);

    return (
        <div 
            className={styles.card} 
            onClick={toggleModal}
            ref={dragRef}
        >
            {isModalVisible && 
                <Modal 
                    title="Детали ингредиента"
                    onClose={toggleModal}
                >
                    <IngredientDetails item={item}/>
                </Modal>}
            {count > 0 ? <Counter count={count} size="default" extraClass={styles.counter}/> : null}
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
