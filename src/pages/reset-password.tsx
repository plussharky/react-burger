import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../utils/auth-api";
import { useForm } from "../hooks/use-form";

const ResetPassword = () => {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    password: "",
    code: ""
  });
  const [error, setError] = useState<string>("");
  const isBeenOnForgotPasswordPage = useMemo(
    () => localStorage.getItem("isBeenOnForgotPasswordPage"),
    []
  );

  const onSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!values.code) {
      setError("Введите код!");
    }

    if (!values.password) {
      setError("Введите пароль!");
    }

    if (error) {
      return;
    }

    resetPassword(values.password, values.code)
      .then(() => {
        localStorage.removeItem("isBeenOnForgotPasswordPage");
        navigate("/login");
      })
      .catch((error: Error) => {
        const errorMsg = error.message || String(error);
        setError(errorMsg);
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
          value={values.code}
          onChange={handleChange}
          name={"name"}
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}  
        />
        <PasswordInput
          value={values.password}
          name={"password"}
          onChange={handleChange}
        />
        {error && <p className={styles.error}>{error}</p>}
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