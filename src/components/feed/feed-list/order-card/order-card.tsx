import { TIngredient } from '../../../../utils/types';
import styles from './order-card.module.css'
import { formatDate } from '../../../../utils/date-formatter';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../../../hooks/react-redux';

type TOrderCard = {
    id: number;
    timestamp: Date;
    name: string;
    ingredientIds: string[];
};

export function OrderCard({id, timestamp, name, ingredientIds}: TOrderCard) {
    const location = useLocation();
    const { ingredients } = useSelector(store => store.ingredients)
    const ingredientObjs = ingredientIds.map(id => ingredients.find(i => i._id === id));
    const price = ingredientObjs.reduce((acc, ingredient) => acc + (ingredient?.price || 0), 0); 
    const ingredientsToShow = ingredientObjs.slice(0, 5);
    const ingredientsToHide = ingredientObjs.slice(5);

    return (
        <Link 
            key={id}
            to={`/feed/${id}`}
            state={{background: location}}
            className={styles.card}
        >
            <div className={styles.header}>
                <p className={styles.id}>
                    #{id}
                </p>
                <p className={styles.timestamp}>
                    {formatDate(timestamp)}
                </p>
            </div>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.componentsAndPrice}>
                <div className={styles.components}>
                {ingredientsToShow.map((ingredient, index) => (
                    ingredient && (<div 
                        key={index}
                        className={styles.ingredientIcon}
                        style={{ left: `${48 * index}px`,
                                zIndex: `${10-index}`}}
                    >
                        <div className={styles.iconGradient}>
                            <img 
                                className={styles.ingredientImg}
                                src={ingredient.image_mobile} 
                            />
                        </div>
                    </div>)))
                }
                {
                    ingredientsToHide.length > 0 
                    &&  ingredientsToHide[0] && <div 
                            className={styles.ingredientIcon}
                            style={{ left: `${48 * ingredientsToShow.length}px`,
                                     zIndex: `${10-ingredientsToShow.length}`}}
                        >
                            <div className={styles.iconGradient}>
                                <img 
                                    className={styles.ingredientImgBlur}
                                    src={ingredientsToHide[0].image_mobile} 
                                />
                                <p className={styles.ingredientsCount}>
                                    +{ingredientsToHide.length}
                                </p>
                            </div>
                        </div>
                }
                </div>
                <div className={styles.price}>
                    <span>{price} </span>&nbsp;<CurrencyIcon type="primary" />
                </div>
            </div>
        </Link>
    )
}