import React from 'react';
import styles from './burger-ingredients.module.css';
import IngredientCtegory from './ingredient-category/ingredient-category';
import Tabs from './ingredient-tab/ingredient-tabs';
import PropTypes from 'prop-types';

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

BurgerIngredients.propTypes = { 
    data: PropTypes.arrayOf(
        PropTypes.exact({
            _id: PropTypes.string,
            type: PropTypes.string,
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number
        })
    )
}

 export default BurgerIngredients;