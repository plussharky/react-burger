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
          setLoading(false);
        }
    };

    fetchIngredients();
  }, [])

  if(error) {
    return <p>🛜Произошла ошибка при загрузке. Проверьте интернет-соединение и перезагрузите страницу</p>
  }

  return (
    <div className="App">
      <AppHeader />
      {loading ? 
        (<p>Загрузка...</p>)
      :
        (
          <main className={styles.burgerAssembly}>
            <BurgerIngredients data={ingredients}/> 
            <BurgerConstructor data={ingredients}/>
          </main>
        )
      
        
      }
    </div>
  );
}

export default App;
