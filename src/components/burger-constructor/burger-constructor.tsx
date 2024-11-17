import { useMemo, useState, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useDispatch, useSelector } from '../../hooks/react-redux';
import { createOrder, orderCreateError } from '../../services/order/actions';
import { useDrop } from 'react-dnd';
import { addBun, addIngredient } from '../../services/burger-constructor/actions';
import { IngredientElement } from './ingredient-element/ingredient-element';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

export function BurgerConstructor() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { bun, ingredients } = useSelector(store => store.burgerConstructor);

    const [isShowOrderDetails, setShowOrderDetails] = useState<boolean>(false);

    const isCanOrder = useMemo(() => bun && ingredients.length > 0, [bun, ingredients]);

    const toggleOrderDetails = useCallback(() => {
        setShowOrderDetails((prev) => !prev);
        if (!isCanOrder) {
            const orderError: string = `Чтобы сделать заказ сделайте следующее: 
                ${bun ? "" : "\nдобавьте булку"} 
                ${ingredients.length > 0 ? "" : "\nдобавьте ингредиенты"}`
            dispatch(orderCreateError(orderError));
            return;
        }
        if (bun && ingredients.length > 0) {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                navigate("/login");
                return;
            }
            const orderIngredients = [bun._id, ...ingredients.map(i => i._id), bun._id];
            dispatch(createOrder(orderIngredients, token!));
        }
    }, [bun, ingredients, dispatch, isCanOrder, navigate]);

    const [{isOverIngredients, draggingIgredient}, dropIngredientRef] = useDrop({
        accept: 'ingredient',
        drop: ({item}: {item: TIngredient}) => {
            if (!item || !item.type) return;
            item.type === "bun" 
                ? dispatch(addBun({...item, uniqueId: uuidv4()})) 
                : dispatch(addIngredient({...item, uniqueId: uuidv4()}));
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

    const bunElement = useCallback((type: "top" | "bottom") => {
        const isDraggingBun = draggingIgredient?.item?.type === 'bun';
        const bunStyle = `${type === "top" ? styles.topBun : styles.bottomBun} 
            ${isDraggingBun ? !isOverIngredients ? styles.glow : `${styles.border} ${styles.glow}` : ""}`;
        return bun ? (
                    <div 
                        data-testId={`container-bun-${type}-full`}
                    >
                        <ConstructorElement
                            key={bun.uniqueId}
                            text={`${bun.name} ${type === "top" ? "(верх)" : "(низ)"}`}
                            type={type}
                            price={bun.price}
                            thumbnail={bun.image}
                            isLocked={true}
                            extraClass={bunStyle} 
                        />
                    </div>
                ) : (
                    <div 
                        className={bunStyle}
                        data-testId={`container-bun-${type}-empty`}
                    >
                        <p>Перетащите булку в конструктор</p>
                    </div>
                )
    }, [bun, isOverIngredients, draggingIgredient])

    const ingredientsElement = useCallback(() => {
        const isDraggingIngredient = draggingIgredient ? draggingIgredient.item?.type !== 'bun' : false;
        const ingredientStyle = ` ${isDraggingIngredient 
            ? !isOverIngredients 
                ? styles.glow 
                : `${styles.border} ${styles.glow}` 
            : ""}`;
        return ingredients.length === 0 ? (
                    <div 
                        className={`${styles.emptyIngredient} ${ingredientStyle}`}
                        data-testId={`container-ingredient-empty`}
                    >
                        <p>Перетащите ингредиенты в конструктор</p>
                    </div>
                ) : (
                    <>
                        {
                        ingredients.map((item, index) => (
                            <div className={styles.ingredientRow}>
                                <DragIcon type="primary"/>
                                <IngredientElement
                                    key={item.uniqueId}
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                    index={index}
                                />
                            </div>
                        ))}
                        {isDraggingIngredient && isOverIngredients && 
                            <div className={styles.ingredientRow}>
                                <DragIcon type="primary"/>
                                <ConstructorElement
                                    text={draggingIgredient.item.name}
                                    price={draggingIgredient.item.price}
                                    thumbnail={draggingIgredient.item.image}
                                    extraClass={`${ingredientStyle}`}
                                />
                            </div>
                        }
                    </>
                )
    }, [ingredients, isOverIngredients, draggingIgredient]);

    return (
        <div className={styles.burgerConstructor} ref={dropIngredientRef}>
            {isShowOrderDetails && (
                <Modal onClose={toggleOrderDetails}>
                    <OrderDetails/>
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
                { 
                    isCanOrder && <Button 
                        htmlType="button" 
                        type="primary" 
                        size="medium" 
                        extraClass={styles.button}
                        onClick={toggleOrderDetails}>
                        Оформить заказ
                    </Button>
                }
            </div>
        </div>
    ) 
}