import {useMemo, forwardRef} from 'react';
import IngredientCard from './ingredient-card/ingredient-card';
import styles from './ingredient-category.module.css';
import TranslationMap from '../../../utils/translation-map';
import PropTypes from 'prop-types';
import { ingredientType } from '../../../utils/types';

const IngredientCtegory = forwardRef(({ categoryName, items}, ref ) => {
    const translatedCategoryName = useMemo(() => 
        TranslationMap[categoryName] || categoryName
    , [categoryName]);

    return (
    <div className={styles.category} ref={ref}>
        <h2 className={styles.title}>{translatedCategoryName}</h2>
        <div className={styles.cards}>
            {items.map((item) => (
                <IngredientCard key={item._id} item={item} />
            ))}
        </div>
    </div>
    );
});

IngredientCtegory.propTypes = { 
    items: PropTypes.arrayOf(ingredientType).isRequired,
    categoryName: PropTypes.string.isRequired
}

export default IngredientCtegory;