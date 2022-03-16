/*
로그인
로그인 폼, 기능
@author Wendy
@version 1.0.0
생성일 2022-03-07
마지막 수정일 2022-03-15
*/
import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import styles from "../components/loginSignup/loginsignup.module.css";
import Link from "next/link";
import { apiLogin } from "../api/user";
import Router from "next/router";
import Image from "next/image";

interface LoginInput {
  result: string;
  id: string;
  password: string;
}

const Login: NextPage = () => {
  const isLoggedIn = false;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm<LoginInput>({
    mode: "onChange",
  });

  const onValidSubmit: SubmitHandler<LoginInput> = async () => {
    const { id, password } = getValues();
    try {
      const res = await apiLogin(id, password);
      localStorage.setItem("id", res.token);
      Router.push("/");
    } catch (e) {
      const error = e as AxiosError;
      console.error(error);
    }
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  const resultError = errors.result?.message ? (
    <div className={`${styles.message} ${styles.resultMessage}`}>{errors.result?.message}</div>
  ) : (
    <div />
  );

  const idError = errors.id?.message ? (
    <div className={`${styles.message} ${styles.idMessage}`} role="alert">
      {errors.id?.message}
    </div>
  ) : (
    <div />
  );
  const pwError = errors.password?.message ? (
    <div className={`${styles.message} ${styles.pwMessage}`} role="alert">
      {errors.password?.message}
    </div>
  ) : (
    <div />
  );

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper2}>
        {/* <Image className={styles.logoImage} src={logo} layout="fill" /> */}
        <Image src={logo} alt="dd" />
      </div>
      <h1 className={styles.title}>로그인</h1>
      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit(onValidSubmit)}>
          {resultError}
          <label htmlFor="id">
            <input
              className={`${styles.inputForm} ${styles.idForm}`}
              {...register("id", {
                required: "아이디를 입력하세요.",
                pattern: {
                  value: /^[a-z0-9]+$/,
                  message: "잘못된 아이디 형식입니다. 영소문자나 숫자만 가능합니다.",
                },
                minLength: {
                  value: 8,
                  message: "아이디는 8자 이상, 16자 이하입니다.",
                },
                maxLength: {
                  value: 16,
                  message: "아이디는 8자 이상, 16자 이하입니다.",
                },
              })}
              type="text"
              placeholder="ID"
              onInput={clearLoginError}
              aria-label="id"
            />
          </label>
          {idError}
          <label htmlFor="password">
            <input
              className={`${styles.inputForm} ${styles.pwForm}`}
              {...register("password", {
                required: "비밀번호를 입력하세요.",
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message: "잘못된 비밀번호 형식입니다. 영어, 숫자만 가능합니다.",
                },
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상, 16자 이하입니다.",
                },
                maxLength: {
                  value: 16,
                  message: "비밀번호는 8자 이상, 16자 이하입니다.",
                },
              })}
              type="password"
              placeholder="Password"
              onInput={clearLoginError}
              aria-label="password"
            />
          </label>
          {pwError}
          <button
            className={`${styles.inputForm} ${styles.inputBtn}`}
            type="submit"
            value="로그인"
            disabled={!isValid}
            aria-label="loginBtn"
          >
            로그인
          </button>
        </form>
        <span className={styles.guide}>향해 회원이 아니신가요?</span>{" "}
        <Link href="/signup">
          <strong className={`${styles.guide} ${styles.signup}`}>지금 가입하세요</strong>
        </Link>
        <p className={`${styles.guide} ${styles.main}`}>그냥 둘러 볼게요.</p>
        <div className={styles.find}>
          <Link href="/findid">
            <span className={`${styles.guide} ${styles.signup}`}>
              아이디 찾기
            </span>
          </Link>{" "}
          |{" "}
          <Link href="/findpw">
            <span className={`${styles.guide} ${styles.signup}`}>
              비밀번호 찾기
            </span>
          </Link>
        </div>
        <Link href="http://localhost:8181/oauth2/authorization/google">
          <button className={styles.socialLogin} aria-label="socialBtn">
            <div className={styles.imageWrapper}>
              <Image
                className={styles.logoImage}
                alt="googleLogo"
                src="/images/login_files/googleLogo.png"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className={styles.socialLoginText}>구글 로그인</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
