import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

const API_URL = "https://norma.nomoreparties.space/api/ingredients"

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchIngredients = async () => {
        try {
          const response = await fetch(API_URL);

          if(!response.ok) {
            throw new Error(`Сервер вернул ответ не ОК по запросу ${API_URL}`)
          }


          const data = await response.json();
          setIngredients(data.data)
        } catch (error) {
          setError(error)
        } finally {
          setLoading(true);
        }
    };

    fetchIngredients();
  }, [])

  return (
    <div className="App">
      <AppHeader />
      {loading ? 
        (
          <main className={styles.burgerAssembly}>
            <BurgerIngredients data={ingredients}/> 
            <BurgerConstructor data={ingredients}/>
          </main>
        )
      :
        (<p>Загрузка...</p>)
      }
    </div>
  );
}

export default App;
