import {useMemo, forwardRef} from 'react';
import IngredientCard from './ingredient-card/ingredient-card';
import styles from './ingredient-category.module.css';
import TranslationMap from '../../../utils/translation-map';
import { TIngredient } from '../../../utils/types';

type TIngredientCtegoryProps = {
    categoryName: string;
    items: TIngredient[];
}

const IngredientCtegory = forwardRef<HTMLDivElement, TIngredientCtegoryProps>(({ categoryName, items}, ref ) => {
    const translatedCategoryName: string = useMemo(
        () => TranslationMap[categoryName] || categoryName, 
        [categoryName]
    );

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

export default IngredientCtegory;