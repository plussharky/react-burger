import React, { useMemo, useState, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../services/order/actions';
import { useDrop } from 'react-dnd';
import { addBun, addIngredient } from '../../services/burger-constructor/actions';
import { ORDER_CREATE_ERROR } from '../../services/order/actions'
import IngredientElement from './ingredient-element/ingredient-element';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { number, loading, error } = useSelector(store => store.order);
    const { bun, ingredients } = useSelector(store => store.burgerConstructor);

    const [isShowOrderDetails, setShowOrderDetails] = useState(false);

    const toggleOrderDetails = useCallback(() => {
        setShowOrderDetails((prev) => !prev);
        if (!bun || ingredients.length === 0) {
            dispatch({
                type: ORDER_CREATE_ERROR,
                payload: `Чтобы сделать заказ сделайте следующее: 
                ${bun ? "" : "\nдобавьте булку"} 
                ${ingredients.length > 0 ? "" : "\nдобавьте ингредиенты"}`
            });
            return;
        }
        if (!number && !loading && bun && ingredients.length > 0) {
            dispatch(createOrder([bun._id, ...ingredients.map(i => i._id), bun._id]));
        }
    }, [bun, ingredients, dispatch, loading, number]);

    const [, dropIngredientRef] = useDrop({
        accept: 'ingredient',
        drop: ({item}) => {
            item.type === "bun" 
            ? dispatch(addBun(item)) 
            : dispatch(addIngredient(item));
        },
    });

    const getTotalPrice = useMemo(() => {
        let sum = ingredients.reduce((acc, item) => acc + item.price, 0);
        if (bun) {
            sum += bun.price * 2;
        }
        return sum;
    }, [bun, ingredients]);

    return (
        <div className={styles.burgerConstructor} ref={dropIngredientRef}>
            {isShowOrderDetails && (
                <Modal onClose={toggleOrderDetails}>
                    { error 
                    ? <p>❌Ошибка! {error}</p>
                    : <OrderDetails/>}
                </Modal>
            )}
            <div>
                {bun 
                    ? <ConstructorElement
                        key={bun.uniqueId}
                        text={`${bun.name} (верх)`}
                        type='top'
                        price={bun.price}
                        thumbnail={bun.image}
                        isLocked={true}
                        extraClass={styles.constructorElement}
                        />
                    : <ConstructorElement type='top'/>
                }
            </div>
            <div className={styles.componentContainer}> 
                {ingredients.length === 0 
                    ? <p>Перетащите ингредиенты в конструктор</p>
                    : ingredients.map((item, index) => (
                        <IngredientElement
                            key={item.uniqueId}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            index={index}
                        />
                    ))
                }
            </div>
            <div>
                {bun 
                    ? <ConstructorElement
                        key={bun.uniqueId}
                        text={`${bun.name} (низ)`}
                        type='bottom'
                        price={bun.price}
                        thumbnail={bun.image}
                        isLocked={true}
                        extraClass={styles.constructorElement}
                        />
                    : <ConstructorElement type='bottom'/>
                }
            </div>
            <div className={styles.constructorFooter}>
                <div className={styles.price}>
                    <span>{getTotalPrice}</span>
                    &nbsp;
                    <CurrencyIcon type="primary"/>
                </div>
                <Button 
                    htmlType="button" 
                    type="primary" 
                    size="medium" 
                    extraClass={styles.button}
                    onClick={toggleOrderDetails}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    ) 
}

export default BurgerConstructor;