import React from 'react';
import styles from './burger-component-bun.module.css';
import { CurrencyIcon, LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerComponentBun = (props) => {
    const topBun = {...props.item};
    topBun.name = topBun.name + "(верх)"

    const bottomBun = {...props.item};
    bottomBun.name = bottomBun.name + "(низ)"

    const BurgerBun = (props) => (
        <div className={props.bunStyle}>
            <img src={props.item.image_mobile} alt={props.item.name} className={styles.image} />
            <span className={styles.name}>{props.item.name}</span>
            <div className={styles.price}>
                <span>{props.item.price}</span>&nbsp;<CurrencyIcon type="primary" />
            </div>
            <LockIcon type="secondary"/>
        </div>
    )

    return (
        <>
            <BurgerBun bunStyle={styles.topBun} item={topBun} />
                <div className={styles.componentContainer}>
                {props.children}
                </div>
            <BurgerBun bunStyle={styles.bottomBun} item={bottomBun} />
        </>
    );
}

BurgerComponentBun.propTypes = { 
    item: PropTypes.exact({
            image_mobile: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
    })
}

export default BurgerComponentBun;
 