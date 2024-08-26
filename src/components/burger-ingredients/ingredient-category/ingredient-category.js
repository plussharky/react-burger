import React from 'react';
import IngredientCard from './ingredient-card/ingredient-card';
import styles from './ingredient-category.module.css';
import TranslationMap from '../../../utils/translation-map';

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

export default IngredientCtegory;