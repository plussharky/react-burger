import styles from './home.module.css';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';

function Home() {
  return (
    <div className="App">
        <main className={styles.burgerAssembly}>
          <BurgerIngredients /> 
          <BurgerConstructor />
        </main>
    </div>
  );
}

export default Home;