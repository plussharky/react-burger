import styles from './gradient-icon.module.css';

type TGradientIcon = {
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export function GradientIcon({style, children}: TGradientIcon): JSX.Element {
    return (
        <div 
            className={styles.ingredientIcon}
            style={style}
        >
            <div className={styles.iconGradient}>
                {children}
            </div>
        </div>
    )
}