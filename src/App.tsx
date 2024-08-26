import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import data from './utils/data'

function App() {
  return (
    <div className="App">
      <AppHeader />
      <BurgerIngredients data={data}/>
    </div>
  );
}

export default App;
