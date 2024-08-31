import React, { useMemo, useState, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import BurgerComponent from './burger-component/burger-component';
import BurgerComponentBun from './burger-component-bun/burger-component-bun';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import OrderDetaildsData from '../../utils/odrer-details-data';

const BurgerConstructor = ({data}) => {
    const [isShowOrderDetails, setShowOrderDetails] = useState(false);

    const handleClick = useCallback(() => {
        setShowOrderDetails(!isShowOrderDetails);
    }, [isShowOrderDetails]);

    const bun = data.find(item => item.type === 'bun');
    const newItems = data.filter(item => item.type !== 'bun');

    const getTotalPrice = useMemo(() => {
        let sum = newItems.reduce((acc, item) => acc + item.price, 0);
        if (bun) {
            sum += bun.price * 2;
        }
        return sum;
    }, [bun, newItems]);

    return (
        <div className={styles.burgerConstructor}>
            {isShowOrderDetails && 
                <Modal onClose={handleClick}>
                    <OrderDetails order={OrderDetaildsData}/>
                </Modal>}
            <BurgerComponentBun item={bun}>
            {newItems.map(item => (           
                <BurgerComponent 
                    key={item._id}
                    item={item}
                />
                ))}
            </BurgerComponentBun>
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
                    onClick={handleClick}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    ) 
}

BurgerConstructor.propTypes = { 
    data: PropTypes.arrayOf(
        PropTypes.exact({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
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
    ).isRequired
}

export default BurgerConstructor;