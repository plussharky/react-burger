import { FormEvent, useState } from "react";
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

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [errorServer, setErrorServer] = useState<string>("");

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setErrorServer("");

    if (!email) {
      setEmailError("Введите почту!");
    }

    if (!password) {
      setPasswordError("Введите пароль!");
    }

    if (emailError || passwordError) {
      return;
    }
    //@ts-ignore
    dispatch(login(email, password))
      .then(() => navigate("/"))
      .catch((error: string) => setErrorServer(error));
  };

  return (
    <form onSubmit={onLogin} className={styles.container}>
      <p className={styles.title}>Вход</p>
      <EmailInput
        value={email}
        name={"email"}
        isIcon={false}
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordInput
        value={password}
        name={"password"}
        onChange={(e) => setPassword(e.target.value)}
      />
      {emailError && <p className={styles.error}>{emailError}</p>}
      {passwordError && <p className={styles.error}>{passwordError}</p>}
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
