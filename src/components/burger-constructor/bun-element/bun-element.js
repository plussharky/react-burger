import React, { useMemo } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { contractorElementType } from '../../../utils/types';

const BunElement = ({ bun, bunType }) => {
  
    const bunText = useMemo(() => {
        const position = bunType === "top" ? "верх" : "низ";
        return `${bun.name} (${position})`;
    }, [bun.name, bunType]);

    if (!bun) return null;

    return (
        <ConstructorElement
            type={bunType}
            isLocked={true}
            text={bunText}
            price={bun.price}
            thumbnail={bun.image}
        />
    );
};

BunElement.propTypes = { 
    bun: contractorElementType,
    bunType: PropTypes.string.isRequired
}

export default BunElement;