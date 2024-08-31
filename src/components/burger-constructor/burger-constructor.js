import React, { useMemo, useState, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import OrderDetaildsData from '../../utils/odrer-details-data';

const BurgerConstructor = ({data}) => {
    const [isShowOrderDetails, setShowOrderDetails] = useState(false);

    const toggleOrderDetails = useCallback(() => {
        setShowOrderDetails((prev) => !prev);
    }, []);

    const bun = useMemo(() => data.find((item) => item.type === 'bun'), [data]);
    const newItems = useMemo(() => data.filter((item) => item.type !== 'bun'), [data]);

    const getTotalPrice = useMemo(() => {
        let sum = newItems.reduce((acc, item) => acc + item.price, 0);
        if (bun) {
            sum += bun.price * 2;
        }
        return sum;
    }, [bun, newItems]);


    return (
        <div className={styles.burgerConstructor}>
            {isShowOrderDetails && (
                <Modal onClose={toggleOrderDetails}>
                    <OrderDetails order={OrderDetaildsData}/>
                </Modal>
            )}
            {bun && 
                (<ConstructorElement
                    type="top"
                    isLocked={true}
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                />)
            }
            <div className={styles.componentContainer}> 
            {newItems &&  newItems.map(item => (           
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                />                
            ))}
            </div>
            {bun && 
                (<ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                />)
            }
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