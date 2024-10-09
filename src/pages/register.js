import { useState } from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/auth/actions";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorServer, setErrorServer] = useState("");

  const onRegister = (e) => {
    setNameError("");
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
    if (!name) {
      setNameError("Введите имя!");
    }
    if (nameError || emailError || passwordError) {
      return;
    }
    dispatch(register(email, password, name))
      .then(() => navigate("/"))
      .catch((error) => setErrorServer(error));
  };

  return (
    <form className={styles.container} onSubmit={onRegister}>
      <p className={styles.title}>Регистрация</p>
      <Input
        type={"text"}
        placeholder={"Имя"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        name={"name"}
        error={!!nameError}
        errorText={nameError}
      />
      <EmailInput
        value={email}
        name={"email"}
        isIcon={false}
        onChange={(e) => setEmail(e.target.value)}
        checked={false}
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