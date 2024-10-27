import styles from './order-info.module.css';
import { useSelector } from '../hooks/react-redux';
import { useParams } from "react-router-dom";
import { GradientIcon } from '../components/gradient-icon/gradient-icon';
import { TIngredient } from '../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatDate } from '../utils/date-formatter';
import { useMemo } from 'react';


export function OrderInfo() {
    const { id } = useParams();
    const { ingredients, loading, error } = useSelector(store => store.ingredients)
    const order = {
        name: "Black Hole Singularity острый бургер",
        status: "Done",
        ingredients: [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa0947",
            "643d69a5c3f7b9001cfa0949",
            "643d69a5c3f7b9001cfa093c"
        ],
        timestamp: new Date()
    };
    const ingredientsObj: TIngredient[] = ingredients.filter(a => order.ingredients.findIndex(b => b === a._id) > -1);
    const totalPrice = useMemo(() => ingredients.reduce((acc, item) => acc + item.price, 0),
        [ingredientsObj]);

    // if (loading) {
    //     return (<h2>Загрузка...</h2>);
    // }

    // if (!loading && error) {
    //     return (<p>🛜Произошла ошибка при загрузке. Проверьте интернет-соединение и перезагрузите страницу</p>);
    // }

    return (
        <div className={styles.main}>
            <div className={styles.info}>
                <p className={styles.id}>#{id}</p>
                <div className={styles.properties}>
                    <h3 className={styles.name}>{order.name}</h3>
                    <p className={styles.status}>{order.status}</p>
                </div>
                <div className={styles.compound}>
                    <p className={styles.name}>Состав:</p>
                    {
                        ingredientsObj.map(i => (
                            <div className={styles.row}>
                                <GradientIcon>
                                    <img 
                                        className={styles.ingredientImg}
                                        src={i.image_mobile} 
                                    />
                                </GradientIcon>
                                <p className={styles.ingredientName}>{i.name}</p>
                                
                                <p className={styles.price}>{
                                    order.ingredients.filter(ing => ing === i._id).length
                                    }&nbsp;x&nbsp;{
                                    i.price
                                }&nbsp;<CurrencyIcon type="primary" />
                                </p>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.footer}>
                    <p className={styles.timestamp}>{ formatDate(order.timestamp) }</p>
                    <p className={styles.price}>{totalPrice}&nbsp;<CurrencyIcon type="primary" /></p>
                </div>
            </div>
        </div>
    );
}