import { useMemo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd'
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import styles from './ingredient-element.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { MOVE_INGREDIENT } from '../../../services/burger-constructor/actions'

const IngredientElement = ({name, price, image, index}) => {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const uuid = useMemo(() => uuidv4(), []);

    const [{ isDragging }, drag] = useDrag({
        type: 'sortableIngredient',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{ hoverID }, drop] = useDrop({
        accept: 'sortableIngredient',
        hover: (item, monitor) => {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch({
                type: MOVE_INGREDIENT,
                payload: {
                    fromIndex: item.index,
                    toIndex: index
                }
            });

            item.index = hoverIndex;
        }
    })

    drag(drop(ref));

    const opacity = isDragging ? 0 : 1;

    return (
        <div ref={ref}>
            <ConstructorElement
                key={uuid}
                text={name}
                price={price}
                thumbnail={image}
                extraClass={styles.constructorElement}
                style={{opacity}}
                draggable
            />
        </div>
    )
}

IngredientElement.propTypes = { 
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
}

export default IngredientElement;