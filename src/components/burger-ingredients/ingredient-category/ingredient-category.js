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
            image: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        })
    ).isRequired,
    categoryName: PropTypes.string.isRequired
}

export default IngredientCtegory;