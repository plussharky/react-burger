import { useMemo } from 'react';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from '../../../../hooks/react-redux';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from '../../../../utils/types';

export function IngredientCard ({ item }: { item: TIngredient}) {
    const location = useLocation();
    const { bun, ingredients } = useSelector(store => store.burgerConstructor);

    const [, dragRef] = useDrag<{item: TIngredient}, unknown, unknown>({
        type: 'ingredient',
        item: { item }
    });

    const count = useMemo(() => {
        if (bun && item.type === "bun") {
            return item._id === bun._id ? 2 : 0;
        } 

        return ingredients.filter(ingredient => item._id === ingredient._id).length;
    }
    , [bun, ingredients, item]);

    return (
        <Link
            key={item._id}
            to={`/ingredients/${item._id}`}
            state={{ background: location }}
            className={styles.card}
            ref={dragRef}
            data-testid="ingredient-card"
        >
                {count > 0 ? <Counter count={count} size="default" extraClass={styles.counter}/> : null}
                <img src={item.image} alt={item.name} className={styles.image} />
                <div className={styles.price}>
                    <span>{item.price} </span>&nbsp;<CurrencyIcon type="primary" />
                </div>
                <p 
                    className={styles.name}
                    data-testId={`ingredient-card-name`}
                >
                    {item.name}
                </p>
        </Link>
    );
};