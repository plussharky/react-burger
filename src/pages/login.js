import { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import { login } from "../services/auth/actions";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorServer, setErrorServer] = useState("");

  const onLogin = (e) => {
    setEmailError("");
    setPasswordError("");
    setErrorServer("");
    e.preventDefault();

    if (!email) {
      setEmailError("Введите почту!");
    }

    if (!password) {
      setPasswordError("Введите пароль!");
    }

    if (emailError || passwordError) {
      return;
    }

    dispatch(login(email, password))
      .then(() => navigate("/"))
      .catch((error) => setErrorServer(error));
  };

  return (
    <form onSubmit={onLogin} className={styles.container}>
      <p className={styles.title}>Вход</p>
      <EmailInput
        value={email}
        name={"email"}
        isIcon={false}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError}
        errorText={emailError}
      />
      <PasswordInput
        value={password}
        name={"password"}
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordError}
        errorText={passwordError}
      />
      {errorServer && <p className={styles.error}>{errorServer}</p>}
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
