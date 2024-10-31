import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "../../hooks/react-redux";
import { TIngredient } from "../../utils/types";
import { useEffect, useMemo } from "react";
import styles from "./order-info.module.css"
import { GradientIcon } from "../gradient-icon/gradient-icon";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatDate } from "../../utils/date-formatter";
import { useDispatch } from "../../hooks/react-redux";
import { wsConnect, wsDisconnect } from "../../services/feed/actions";
import { WS_ORDERS_ALL_URL, WS_ORDERS_USER_URL } from "../../utils/api-config";
import Preloader from "../preloader/preloader";
import TranslationMap from "../../utils/translation-map";

export function OrderInfo() {
    const { number } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    const { ingredients, loading, error } = useSelector(store => store.ingredients);
    const { orders, isConnected } = useSelector(state => state.feed);

    useEffect(() => {
        console.log(isConnected);
        if (isConnected) {
            return;
        }

        if (location.pathname.startsWith("/profile/orders")) {
            const wssUrl = new URL(WS_ORDERS_USER_URL);
            wssUrl.searchParams.set(
                "token",
                localStorage.getItem("accessToken") ?? ""
            )
            dispatch(wsConnect(wssUrl.toString()));
            console.log(wssUrl.toString());
        } else if (location.pathname.startsWith("/feed")) {
            dispatch(wsConnect(WS_ORDERS_ALL_URL));
            console.log(WS_ORDERS_ALL_URL);
        }
    
        return () => {
          dispatch(wsDisconnect());
        }
      }, [isConnected, dispatch, location]) 

    const order = useMemo(() => 
        orders.find(o => o.number.toString() === number)
    , [orders, number])

    const translatedStatusName = useMemo(
        () => order && (TranslationMap[order.status] || order?.status), 
        [order]
    );
    const ingredientsObj: TIngredient[] | undefined = order && ingredients.filter(a => order.ingredients.findIndex(b => b === a._id) > -1);
    const totalPrice = useMemo(() => ingredientsObj && ingredientsObj.reduce((acc, item) => acc + item.price, 0),
        [ingredientsObj]);


    if (loading || !isConnected) {
        return (<Preloader />);
    }

    if (!order) {
        return (<h2>Заказ не найден 😔</h2>)
    }

    if (!loading && error) {
        return (<p>🛜Произошла ошибка при загрузке. Проверьте интернет-соединение и перезагрузите страницу</p>);
    }

    return (
        <div className={styles.main}>
            <div className={styles.info}>
                <p className={styles.id}>#{number}</p>
                <div className={styles.properties}>
                    <h3 className={styles.name}>{order.name}</h3>
                    <p className={styles.status}>{translatedStatusName}</p>
                </div>
                <div className={styles.compound}>
                    <p className={styles.name}>Состав:</p>
                    {
                        ingredientsObj && ingredientsObj.map(i => (
                            <div className={styles.row}>
                                <GradientIcon>
                                    <img 
                                        className={styles.ingredientImg}
                                        src={i.image_mobile}
                                        alt={i.name} 
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
                    <p className={styles.timestamp}>{ formatDate(order.createdAt) }</p>
                    <p className={styles.price}>{totalPrice}&nbsp;<CurrencyIcon type="primary" /></p>
                </div>
            </div>
        </div>
    );
}