import React, { useEffect } from 'react';
import styles from './ingredient-details.module.css';
import { ingredientType } from '../../../../../utils/types';
import { UPDATE_INGREDIENT_DETAILS } from '../../../../../services/ingredient-details/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

const IngredientDetails = () => {
    const { id } = useParams();
    const { ingredients, loading, error } = useSelector(store => store.ingredients)

    const dispatch = useDispatch();

    const item = ingredients.filter(i => i._id === id)[0];

    useEffect(() => {
        if (item) {
            dispatch({
                type: UPDATE_INGREDIENT_DETAILS,
                payload: item
            });
        }
        
        return () => {
            if (item) { 
                dispatch({
                    type: UPDATE_INGREDIENT_DETAILS,
                    payload: null
                });
            }
        }
    }, [item, dispatch])

    if (loading) {
        return <h2>Загрузка...</h2>
    }

    if (!loading && error) {
        return <p>🛜Произошла ошибка при загрузке. Проверьте интернет-соединение и перезагрузите страницу</p>
    }

    if (!item) {
        return null;
    }

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