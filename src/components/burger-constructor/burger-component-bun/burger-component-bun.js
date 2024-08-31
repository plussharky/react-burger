import { useMemo } from 'react';
import styles from './burger-component-bun.module.css';
import { CurrencyIcon, LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerComponentBun = ({item, children}) => {
    const topBun = useMemo(() => ({...item, name: `${item.name} (верх)`}));
    const bottomBun = useMemo(() => ({...item, name: `${item.name} (низ)`}));

    const BurgerBun = useMemo(({bunStyle, item}) => (
        <div className={bunStyle}>
            <img src={item.image_mobile} alt={item.name} className={styles.image} />
            <span className={styles.name}>{item.name}</span>
            <div className={styles.price}>
                <span>{item.price}</span>&nbsp;<CurrencyIcon type="primary" />
            </div>
            <LockIcon type="secondary"/>
        </div>
    ), []);

    return (
        <>
            <BurgerBun bunStyle={styles.topBun} item={topBun} />
                <div className={styles.componentContainer}>{children}</div>
            <BurgerBun bunStyle={styles.bottomBun} item={bottomBun} />
        </>
    );
}

BurgerComponentBun.propTypes = { 
    item: PropTypes.exact({
            _id: PropTypes.string,
            name: PropTypes.string.isRequired,
            type: PropTypes.string,
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
}

export default BurgerComponentBun;