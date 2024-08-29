import React from 'react';
import styles from './burger-constructor.module.css';
import BurgerComponent from './burger-component/burger-component';
import BurgerComponentBun from './burger-component-bun/burger-component-bun';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

class BurgerConstructor extends React.Component {
    constructor(props) {
        super(props);

        this.bun = props.data.find(item => item.type === 'bun');
        this.newItems = props.data.filter(item => item.type !== 'bun');

        this.getTotalPrice = this.getTotalPrice.bind(this);
    }

    getTotalPrice() {
        let sum = 0;
        this.newItems.forEach(element => {
            sum += element.price;
        });

        sum += this.bun.price * 2;

        return sum;
    };

    render() {

        return (
            <div className={styles.burgerConstructor}>
                <BurgerComponentBun item={this.bun}>
                {this.newItems.map(item => (           
                    <BurgerComponent 
                        key={item._id}
                        item={item}
                    />
                    ))}
                </BurgerComponentBun>
                <div className={styles.constructorFooter}>
                    <div className={styles.price}>
                        <span>{this.getTotalPrice()}</span>
                        &nbsp;
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button htmlType="button" type="primary" size="medium" extraClass={styles.button}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        )
    }
}

BurgerConstructor.propTypes = { 
    data: PropTypes.arrayOf(
        PropTypes.exact({
            _id: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            image_mobile: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        })
    ).isRequired
}

export default BurgerConstructor;