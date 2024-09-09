import React from 'react';
import styles from './ingredient-details.module.css';
import { ingredientType } from '../../../../../utils/types';

const IngredientDetails = ({item}) => {
    return (
        <div className={styles.ingredientCardModal}>
            <img src={item.image_large} alt={item.name} className={styles.image} />
            <p className={styles.name}>{item.name}</p>
            <div className={styles.properties}>
                <div className={styles.property}>
                   <p className={styles.propertyTitle}>Калории, ккал&nbsp;</p>
                   <p className={styles.propertyDigits}>{item.calories}</p>
                </div>
                <div className={styles.property}>
                   <p className={styles.propertyTitle}>Белки, г&nbsp;</p>
                   <p className={styles.propertyDigits}>{item.proteins}</p>
                </div>
                <div className={styles.property}>
                   <p className={styles.propertyTitle}>Жиры, г&nbsp;</p>
                   <p className={styles.propertyDigits}>{item.fat}</p>
                </div>
                <div className={styles.property}>
                   <p className={styles.propertyTitle}>Углеводы, г &nbsp;</p>
                   <p className={styles.propertyDigits}>{item.carbohydrates}</p>
                </div> 
            </div>
        </div>
    )
}

IngredientDetails.propTypes = { 
    item: ingredientType
}

export default IngredientDetails;