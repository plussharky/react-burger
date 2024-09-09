import React, { useMemo, useState, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import OrderDetaildsData from '../../utils/odrer-details-data';
import BunElement from './bun-element/bun-element'
import { contractorElementType } from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../services/order-reducer';

const BurgerConstructor = ({data}) => {
    const dispatch = useDispatch();
    const { number, loading, error } = useSelector(store => store.order);

    const [isShowOrderDetails, setShowOrderDetails] = useState(false);

    const toggleOrderDetails = useCallback(() => {
        setShowOrderDetails((prev) => !prev);
        if (!number && !loading) {
            dispatch(createOrder([bun, ...ingredients, bun]));
        }
    }, []);

    const bun = useMemo(() => data.find((item) => item.type === 'bun'), [data]);
    const ingredients = useMemo(() => data.filter((item) => item.type !== 'bun'), [data]);

    const IngredientsElement = () => (
        ingredients.map(item => (
            <ConstructorElement
            key={item._id}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            />
        ))
    );

    const getTotalPrice = useMemo(() => {
        let sum = ingredients.reduce((acc, item) => acc + item.price, 0);
        if (bun) {
            sum += bun.price * 2;
        }
        return sum;
    }, [bun, ingredients]);


    return (
        <div className={styles.burgerConstructor}>
            {isShowOrderDetails && (
                <Modal onClose={toggleOrderDetails}>
                    <OrderDetails order={OrderDetaildsData}/>
                </Modal>
            )}
            <BunElement bunType="top" bun={bun}/>
            <div className={styles.componentContainer}> 
                <IngredientsElement />
            </div>
            <BunElement bunType="bottom" bun={bun}/>
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

BurgerConstructor.propTypes = { 
    data: PropTypes.arrayOf(contractorElementType).isRequired
}

export default BurgerConstructor;