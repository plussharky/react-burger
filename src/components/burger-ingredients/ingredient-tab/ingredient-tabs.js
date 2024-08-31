import {useState, useCallback, useMemo} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import TranslationMap from '../../../utils/translation-map';
import styles from './ingredient-tabs.module.css'
import PropTypes from 'prop-types';

const Tabs = ({categories}) => {
  const translatedCategories = useMemo(() => 
    categories.map(c => TranslationMap[c] || c)
  , [categories]);

  const [current, setCurrent] = useState(translatedCategories[0]);

  const handleTabClick = useCallback(
    (category) => setCurrent(category)
    , []
  )

  return (
    <div className={styles.tabs}>
      {translatedCategories.map(category => (
        <Tab 
          key={category}
          value={category} 
          active={category === current} 
          onClick={() => handleTabClick(category)}>
            {category}
        </Tab>
      ))}
    </div>
  );
};

Tabs.propTypes = { 
  categories: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Tabs;