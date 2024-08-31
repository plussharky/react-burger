import React, {useMemo} from 'react';
import styles from './burger-ingredients.module.css';
import IngredientCtegory from './ingredient-category/ingredient-category';
import Tabs from './ingredient-tab/ingredient-tabs';
import PropTypes from 'prop-types';

const BurgerIngredients = ({data}) => {
    const burgerIngredientsByCategory = useMemo(() => {
        return data.reduce((acc, item) => {
            if (!acc[item.type]) {
                acc[item.type] = [];
            }
    
            acc[item.type].push(item);
            return acc;

        }, {});
    }, [data]);
        
    const categories = useMemo(() => 
        Object.keys(burgerIngredientsByCategory)
    ,[burgerIngredientsByCategory]);

    return (
        <div>
            <p className={styles.title}>Соберите бургер</p>
            <Tabs categories={categories} />
            <div className={styles.ingredientsContainer}>
                {categories.map(category => (
                    <IngredientCtegory 
                        key={category}
                        categoryName={category} 
                        items={burgerIngredientsByCategory[category]} 
                    />
                ))}
            </div>
        </div>
    )  
}

BurgerIngredients.propTypes = { 
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
            image: PropTypes.string.isRequired,
            image_mobile: PropTypes.string,
            image_large: PropTypes.string,
            __v: PropTypes.number
        })
    ).isRequired
}

export default BurgerIngredients;