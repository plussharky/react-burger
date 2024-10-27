import React, { useMemo, useState, useRef, useCallback } from 'react';
import styles from './burger-ingredients.module.css';
import { IngredientCtegory } from './ingredient-category/ingredient-category';
import { Tabs } from './ingredient-tab/ingredient-tabs';
import { useSelector } from "../../hooks/react-redux";

export function BurgerIngredients() {
    const [activeTab, setActiveTab] = useState<string>("bun");
    const { ingredients, loading, error } = useSelector(store => store.ingredients)
    const tabsRef = useRef<HTMLDivElement>(null);
    const bunsRef = useRef<HTMLDivElement>(null);
    const mainsRef = useRef<HTMLDivElement>(null);
    const saucesRef = useRef<HTMLDivElement>(null);

    const categories = useMemo(() => {
        const getfiltredIngredients = (type: string) => ingredients.filter(item => item.type === type);

        return [
            { name: "bun", ref: bunsRef, ingredients: getfiltredIngredients("bun") },
            { name: "main", ref: mainsRef, ingredients: getfiltredIngredients("main") },
            { name: "sauce", ref: saucesRef, ingredients: getfiltredIngredients("sauce") },
        ]
    }, [ingredients]);

    const categoryNames = useMemo(() => categories.map(c => c.name), [categories]);

    const handleScroll = useCallback(() => {
        const distances = categories.map(category => ({
            name: category.name,
            distance: Math.abs(category.ref.current!.getBoundingClientRect().top - tabsRef.current!.getBoundingClientRect().bottom)
        }));

        const closestCategory = distances.reduce((closest, current) =>
            current.distance < closest.distance ? current : closest
        );

        setActiveTab(closestCategory.name);
    }, [categories]);

    const handleOnClickTab = (tabName: string) => {
        const category = categories.find(c => c.name === tabName);
        if (!category || !category.ref.current) {
            return;
        }
        category.ref.current.scrollIntoView({ behavior: 'smooth' });
        setActiveTab(tabName);
    }

    if (loading) {
        return (<h2>Загрузка...</h2>)
    }

    if (!loading && error) {
        return (<p>🛜Произошла ошибка при загрузке. Проверьте интернет-соединение и перезагрузите страницу</p>)
    }

    if (ingredients.length === 0) {
        return (<p>Список ингредиентов пуст🤔</p>)
    }

    return (
        <div>
            <p className={styles.title}>Соберите бургер</p>
            <Tabs
                categories={categoryNames}
                activeTab={activeTab}
                handleOnClickTab={handleOnClickTab}
                ref={tabsRef}
            />
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