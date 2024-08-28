import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import TranslationMap from '../../../utils/translation-map';
import PropTypes from 'prop-types';

const Tabs = (props) => {
  const translatedCategories = props.categories.map(c => TranslationMap[c] || c)
  const [current, setCurrent] = React.useState(translatedCategories[0]);

  return (
    <div style={{ display: 'flex'}}>
      {translatedCategories.map(category => (
        <Tab value={category} active={category === current} onClick={() => setCurrent(category)}>
            {category}
        </Tab>
      ))}
    </div>
  );
};

Tabs.propTypes = { 
  categories: PropTypes.arrayOf(PropTypes.string)
}

export default Tabs;