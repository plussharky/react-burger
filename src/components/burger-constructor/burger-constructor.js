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
import { useNavigate } from 'react-router-dom';

const BurgerConstructor = () => {
    const navigate = useNavigate();
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
        if (!loading && bun && ingredients.length > 0) {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                navigate("/login");
            }
            const orderIngredients = [bun._id, ...ingredients.map(i => i._id), bun._id];
            console.log(token);
            dispatch(createOrder(orderIngredients, token));
        }
    }, [bun, ingredients, dispatch, loading, number]);

    const [{isOverIngredients, draggingIgredient}, dropIngredientRef] = useDrop({
        accept: 'ingredient',
        drop: ({item}) => {
            if (!item || !item.type) return;
            item.type === "bun" ? dispatch(addBun(item)) : dispatch(addIngredient(item));
        },
        collect: (monitor) => ({
            isOverIngredients: monitor.isOver(),
            draggingIgredient: monitor.getItem()
        }),
    });

    const getTotalPrice = useMemo(() => {
        const ingredientsPrice = ingredients.reduce((acc, item) => acc + item.price, 0);
        const bunPrice = bun ? bun.price * 2 : 0;
        return ingredientsPrice + bunPrice;
    }, [bun, ingredients]);

    const bunElement = useCallback((type) => {
        const isDraggingBun = draggingIgredient?.item?.type === 'bun';
        const bunStyle = `${type === "top" ? styles.topBun : styles.bottomBun} 
            ${isDraggingBun ? !isOverIngredients ? styles.glow : `${styles.border} ${styles.glow}` : ""}`;
        return bun ? (
                    <ConstructorElement
                        key={bun.uniqueId}
                        text={`${bun.name} ${type === "top" ? "(верх)" : "(низ)"}`}
                        type={type}
                        price={bun.price}
                        thumbnail={bun.image}
                        isLocked={true}
                        extraClass={bunStyle}
                    />
                ) : (
                    <div className={bunStyle}>
                        <p>Перетащите булку в конструктор</p>
                    </div>
                )
    }, [bun, isOverIngredients, draggingIgredient])

    const ingredientsElement = useCallback(() => {
        const isDraggingIngredient = draggingIgredient?.item?.type !== 'bun';
        const ingredientStyle = ` ${isDraggingIngredient ? !isOverIngredients ? styles.glow : `${styles.border} ${styles.glow}` : ""}`;
        return ingredients.length === 0 ? (
                    <div className={`${styles.emptyIngredient} ${ingredientStyle}`}>
                        <p>Перетащите ингредиенты в конструктор</p>
                    </div>
                ) : (
                    <>
                        {ingredients.map((item, index) => (
                            <IngredientElement
                                key={item.uniqueId}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                                index={index}
                            />
                        ))}
                        {isDraggingIngredient && isOverIngredients && 
                            <ConstructorElement
                                text={draggingIgredient.item.name}
                                price={draggingIgredient.item.price}
                                thumbnail={draggingIgredient.item.image}
                                extraClass={`${ingredientStyle}`}
                                draggable
                            />
                        }
                    </>
                )
    }, [ingredients, isOverIngredients, draggingIgredient]);

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
                {bunElement("top")}
            </div>
            <div className={styles.componentContainer}> 
                {ingredientsElement()}
            </div>
            <div>
                {bunElement("bottom")}
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