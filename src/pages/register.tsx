import { useState, FormEvent } from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/auth/actions";
import { useForm } from "../hooks/use-form";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialForm = {
    name: "",
    email: "",
    password: "",
  };

  const { values, handleChange, setValues } = useForm(initialForm);
  const [error, setError] = useState<string>("");

  const onRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!values.email) {
      setError(prev => prev + "Введите почту! ");
    }
    if (!values.password) {
      setError(prev => prev + "Введите пароль! ");
    }
    if (!values.name) {
      setError(prev => prev + "Введите имя! ");
    }
    if (error) {
      return;
    }

    //@ts-ignore
    dispatch(register(values.email, values.password, values.name))
      .then(() => navigate("/"))
      .catch((error: Error) => setError(prev => prev + error.message));
  };

  return (
    <form className={styles.container} onSubmit={onRegister}>
      <p className={styles.title}>Регистрация</p>
      <Input
        value={values.name}
        type={"text"}
        placeholder={"Имя"}
        name={"name"}
        onChange={handleChange}
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}  
      />
      <EmailInput
        value={values.email}
        name={"email"}
        isIcon={false}
        onChange={handleChange}
        checked={false}
      />
      <PasswordInput
        value={values.password}
        name={"password"}
        onChange={handleChange}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button
        htmlType="submit"
        type="primary"
        size="large"
      >
        Зарегистрироваться
      </Button>
      <div className={styles.questions}>
        <p className={styles.question}>
          Уже зарегистрированы?&nbsp;
          <Link to="/login" className={styles.button}>
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;