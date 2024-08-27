import React from 'react';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import IngredientCtegory from './ingredient-category/ingredient-category';
import Tabs from './ingredient-tab/ingredient-tabs';
import data from '../../utils/data'

class BurgerIngredients extends React.Component {
    constructor(props) {
        super(props);

        this.burgerIngredientsByCategory = this.props.data.reduce((acc, item) => {
            if (!acc[item.type]) {
                acc[item.type] = [];
            }
        
            acc[item.type].push(item);
        
            return acc;
        }, {});
    }

    render() {
        const categories = Object.keys(this.burgerIngredientsByCategory);

        return (
        <div>
            <p className={styles.title}>Соберите бургер</p>
            <Tabs categories={categories} />
            <div className={styles.ingredientsContainer}>
                {Object.keys(this.burgerIngredientsByCategory).map(category => (
                    <IngredientCtegory 
                        key={category}
                        categoryName={category} 
                        items={this.burgerIngredientsByCategory[category]} 
                    />
                ))
                }
            </div>
        </div>
        )
    }
 }

 export default BurgerIngredients;