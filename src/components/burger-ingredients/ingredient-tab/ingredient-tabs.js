import {useState, useCallback, useMemo, forwardRef} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import TranslationMap from '../../../utils/translation-map';
import styles from './ingredient-tabs.module.css'
import PropTypes from 'prop-types';

const Tabs = forwardRef(({categories, activeTab}, ref) => {
  return (
    <div className={styles.tabs} ref={ref}>
      {categories.map(category => (
        <Tab 
          key={category}
          value={category} 
          active={category === activeTab} 
        >
          {(TranslationMap[category] || category)}
        </Tab>
      ))}
    </div>
  );
});

Tabs.propTypes = { 
  categories: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Tabs;