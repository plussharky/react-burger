import { FormEvent, useState} from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { useDispatch } from "../hooks/react-redux";
import { login } from "../services/auth/actions";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/use-form";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const onLogin = (e?: FormEvent<HTMLFormElement>) => {
    if (e) 
      e.preventDefault();
    setError("");

    if (!values.email) {
      setError(prev => prev + `Введите почту! `);
    }

    if (!values.password) {
      setError(prev => prev + `Введите пароль! `);
    }

    if (error) {
      return;
    }
    dispatch(login(values.email, values.password))
      .then(() => navigate("/"))
      .catch((error: string) => setError(prev => prev + error));
  };

  return (
    <form onSubmit={onLogin} className={styles.container}>
      <p className={styles.title}>Вход</p>
      <EmailInput
        value={values.email}
        name={"email"}
        isIcon={false}
        onChange={handleChange}
      />
      <PasswordInput
        value={values.password}
        name={"password"}
        onChange={handleChange}
      />   
      {error && <p className={styles.error}>{error}</p>}
      <Button htmlType="submit" type="primary" size="large">
        Войти
      </Button>

      <div className={styles.questions}>
        <p className={styles.question}>
          Вы — новый пользователь?&nbsp;
          <Link to="/register" className={styles.button}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={styles.question}>
          Забыли пароль?&nbsp;
          <Link to="/forgot-password" className={styles.button}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;