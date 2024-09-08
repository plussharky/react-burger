import React, {useMemo, useState, useRef, useCallback} from 'react';
import styles from './burger-ingredients.module.css';
import IngredientCtegory from './ingredient-category/ingredient-category';
import Tabs from './ingredient-tab/ingredient-tabs';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
import { current } from '@reduxjs/toolkit';

const BurgerIngredients = ({data}) => {  
    const [activeTab, setActiveTab] = useState("bun");
    const tabsRef = useRef(null);
    const bunsRef = useRef(null);
    const mainsRef = useRef(null);
    const saucesRef = useRef(null);

    const getDistanceToTabs = useCallback((categoryRef) => {
        if (!categoryRef.current || !tabsRef.current) return Infinity;
        return Math.abs(categoryRef.current.getBoundingClientRect().top - tabsRef.current.getBoundingClientRect().bottom)
    }, [tabsRef]);

    const categories = useMemo(() => {
        const getfiltredIngredients = (type) => data.filter(item => item.type === type);

       return [
        {name: "bun", ref: bunsRef, ingredients: getfiltredIngredients("bun"), distanceToTabs: getDistanceToTabs(bunsRef)},
        {name: "main", ref: mainsRef, ingredients: getfiltredIngredients("main"), distanceToTabs: getDistanceToTabs(mainsRef)},
        {name: "sauce", ref: saucesRef, ingredients: getfiltredIngredients("sauce"), distanceToTabs: getDistanceToTabs(saucesRef)},
       ]
    }, [data]);

    const categoryNames = useMemo(() => categories.map(c => c.name), [categories]);


    const handleScroll = useCallback(() => {
        categories.forEach(category => category.distanceToTabs = getDistanceToTabs(category.ref))

        const closestCategory = categories.reduce((closest, current) => 
            current.distanceToTabs < closest.distanceToTabs ? current : closest
        );

        setActiveTab(closestCategory.name);
    }, [categories, getDistanceToTabs]);

    return (
        <div>
            <p className={styles.title}>Соберите бургер</p>
            <Tabs categories={categoryNames} activeTab={activeTab} ref={tabsRef}/>
            <div className={styles.ingredientsContainer} onScroll={handleScroll}>
                {categories.map((category) => (
                    <IngredientCtegory 
                        key={category.name}
                        categoryName={category.name} 
                        items={category.ingredients}
                        ref={category.ref}
                    />
                ))}
            </div>
        </div>
    )  
}

BurgerIngredients.propTypes = { 
    data: PropTypes.arrayOf(ingredientType).isRequired
}

export default BurgerIngredients;