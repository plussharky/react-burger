import { useState } from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../utils/auth-api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorServer, setErrorServer] = useState("");

  const onRestore = (e) => {
    setEmailError("");
    setErrorServer("");
    e.preventDefault();

    if (!email) {
      setEmailError("Введите почту!");
      return;
    }

    forgotPassword(email)
      .then(() => {
        localStorage.setItem("isBeenOnForgotPasswordPage", true);
        navigate("/reset-password");
      })
      .catch((error) => {
        const errorMsg = error.message || String(error);
        setErrorServer(errorMsg);
      });
  };

  return (
    <form className={styles.container} onSubmit={onRestore}>
      <p className={styles.title}>Восстановление пароля</p>
      <EmailInput
        placeholder={"Укажите e-mail"}
        value={email}
        name={"email"}
        isIcon={false}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError}
        errorText={emailError}
      />
      {errorServer && <p className={styles.error}>{errorServer}</p>}
      <Button htmlType="submit" type="primary" size="large">
        Восстановить
      </Button>
      <div className={styles.questions}>
        <p className={styles.question}>
          Вспомнили пароль?&nbsp;
          <Link to="/login" className={styles.button}>
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ForgotPassword;
