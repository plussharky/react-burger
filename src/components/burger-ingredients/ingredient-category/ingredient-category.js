import React from 'react';
import IngredientCard from './ingredient-card/ingredient-card';
import styles from './ingredient-category.module.css';
import TranslationMap from '../../../utils/translation-map';
import PropTypes from 'prop-types';

const IngredientCtegory = (props) => {
    return (
    <div className={styles.category}>
        <h2 className={styles.title}>{TranslationMap[props.categoryName] || props.categoryName}</h2>
        <div className={styles.cards}>
            {props.items.map((item) => (
                <IngredientCard key={item._id} item={item} />
            ))}
        </div>
    </div>
    );
};

IngredientCtegory.propTypes = { 
    items: PropTypes.arrayOf(
        PropTypes.exact({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_mobile: PropTypes.string,
            image_large: PropTypes.string.isRequired,
            __v: PropTypes.number
        })
    ).isRequired,
    categoryName: PropTypes.string.isRequired
}

export default IngredientCtegory;