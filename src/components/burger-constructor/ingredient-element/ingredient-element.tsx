import { useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import PropTypes from 'prop-types';
import styles from './ingredient-element.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { MOVE_INGREDIENT, DELETE_INGREDIENT } from '../../../services/burger-constructor/actions';

type TIngredientElementProps = {
    name: string;
    price: number;
    image: string;
    index: number;
}

type DragItem = {
    type: string;
    index: number;
};

function IngredientElement({name, price, image, index}: TIngredientElementProps) {
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);

    const [, drag] = useDrag<DragItem, unknown, unknown>({
        type: 'sortableIngredient',
        item: { type: 'ingredient', index },
    });

    const [, drop] = useDrop<DragItem, unknown, unknown>({
        accept: 'sortableIngredient',
        hover: (item, monitor: DropTargetMonitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
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
    });

    const handleDelete = () => {
        dispatch({
            type: DELETE_INGREDIENT,
            payload: index
        });
    };

    drag(drop(ref));

    return (
        <div ref={ref}>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                extraClass={styles.constructorElement}
                handleClose={handleDelete}
            />
        </div>
    );
}

export default IngredientElement;