import React from 'react';
import styles from './App.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import data from './utils/data';
import dataBurgerComponents from "./utils/data-for-burger-constructor";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className={styles.burgerAssembly}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={dataBurgerComponents}/>
      </div>
    </div>
  );
}

export default App;
