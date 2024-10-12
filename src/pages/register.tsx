import { useState, FormEvent } from "react";
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

  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [errorServer, setErrorServer] = useState<string>("");

  const onRegister = (e: FormEvent<HTMLFormElement>) => {
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
    //@ts-ignore
    dispatch(register(email, password, name))
      .then(() => navigate("/"))
      .catch((error: Error) => setErrorServer(error.message));
  };

  return (
    <form className={styles.container} onSubmit={onRegister}>
      <p className={styles.title}>Регистрация</p>
      <Input
        value={name}
        type={"text"}
        placeholder={"Имя"}
        name={"name"}
        onChange={(e) => setName(e.target.value)}
        error={!!nameError}
        errorText={nameError}
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}  
      />
      <EmailInput
        value={email}
        name={"email"}
        isIcon={false}
        onChange={(e) => setEmail(e.target.value)}
        checked={false}
      />
      <PasswordInput
        value={password}
        name={"password"}
        onChange={(e) => setPassword(e.target.value)}
      />
      {emailError && <p className={styles.error}>{emailError}</p>}
      {passwordError && <p className={styles.error}>{passwordError}</p>}
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