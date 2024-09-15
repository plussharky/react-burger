import styles from './App.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

function App() {
  return (
    <div className="App">
      <AppHeader />
        <main className={styles.burgerAssembly}>
          <BurgerIngredients /> 
          <BurgerConstructor />
        </main>
    </div>
  );
}

export default App;
