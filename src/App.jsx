import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from './services/ingredients/actions';

function App() {
  const dispatch = useDispatch();

  const { ingredients, loading, error } = useSelector(store => store.ingredients)

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  if (loading) {
    return <h2>Загрузка...</h2>
  }

  if(!loading && error) {
    return <p>🛜Произошла ошибка при загрузке. Проверьте интернет-соединение и перезагрузите страницу</p>
  }

  if (ingredients.length == 0){
    return <p>Список ингредиентов пуст🤔</p>
  }

  return (
    <div className="App">
      <AppHeader />
        <main className={styles.burgerAssembly}>
          <BurgerIngredients data={ingredients}/> 
          <BurgerConstructor/>
        </main>
    </div>
  );
}

export default App;
