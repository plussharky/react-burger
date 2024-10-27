import { forwardRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import TranslationMap from '../../../utils/translation-map';
import styles from './ingredient-tabs.module.css'

type TTabsProps = {
  categories: string[];
  activeTab: string;
  handleOnClickTab: (value: string) => void;
}

export const Tabs = forwardRef<HTMLDivElement, TTabsProps>(({ categories, activeTab, handleOnClickTab }, ref) => {
  return (
    <div className={styles.tabs} ref={ref}>
      {categories.map(category => (
        <Tab
          key={category}
          value={category}
          active={category === activeTab}
          onClick={handleOnClickTab}
        >
          {(TranslationMap[category] || category)}
        </Tab>
      ))}
    </div>
  );
});