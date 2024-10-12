import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../utils/auth-api";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [codeError, setCodeError] = useState<string>("");
  const [errorServer, setErrorServer] = useState<string>("");
  const isBeenOnForgotPasswordPage = useMemo(
    () => localStorage.getItem("isBeenOnForgotPasswordPage"),
    []
  );

  const onSave = (e: FormEvent<HTMLFormElement>) => {
    setCodeError("");
    setPasswordError("");
    setErrorServer("");
    e.preventDefault();

    if (!code) {
      setCodeError("Введите код!");
    }

    if (!password) {
      setPasswordError("Введите пароль!");
    }

    if (codeError || passwordError) {
      return;
    }

    resetPassword(password, code)
      .then(() => {
        localStorage.removeItem("isBeenOnForgotPasswordPage");
        navigate("/login");
      })
      .catch((error) => {
        const errorMsg = error.message || String(error);
        setErrorServer(errorMsg);
      });
  };

  useEffect(() => {
    if (!isBeenOnForgotPasswordPage) {
      navigate("/forgot-password");
    }
  }, [isBeenOnForgotPasswordPage, navigate]);

  return (
    <>
      <form className={styles.container} onSubmit={onSave}>
        <p className={styles.title}>Восстановление пароля</p>
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          name={"name"}
          error={!!codeError}
          errorText={codeError}
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}  
        />
        <PasswordInput
          value={password}
          name={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className={styles.error}>{passwordError}</p>}
        {errorServer && <p className={styles.error}>{errorServer}</p>}
        <Button htmlType="submit" type="primary" size="large">
          Сохранить
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
    </>
  );
};

export default ResetPassword;