import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import useHttp from "./http.hook";
import IResponseError from "../models/response-error";

const useAuthentication = (): {
  loading: boolean;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  signUpHandler: (evt: React.SyntheticEvent<Element, Event>) => Promise<void>;
  signInHandler: (evt: React.SyntheticEvent<Element, Event>) => Promise<void>;
  getError: (field?: string | undefined) => string;
} => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    userImage: [""],
  });
  const { loading, request, errors, clearError } = useHttp();
  const auth = useContext(AuthContext);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // eslint-disable-next-line consistent-return
  const getError = (field?: string) => {
    if (errors) {
      const errs = JSON.parse(errors);
      if (errs.error) {
        if (field) {
          return errs.error.errors.find((e: IResponseError) => {
            return e.field === field;
          })?.message;
        }
      } else if (!field) {
        return errors;
      }
    }
  };

  const signUp = () => {
    return request(
      "https://rnovikov-rs-lang-back.herokuapp.com/users",
      "POST",
      {
        ...form,
      }
    );
  };

  const signIn = (email: string, password: string) => {
    return request(
      "https://rnovikov-rs-lang-back.herokuapp.com/signin",
      "POST",
      {
        ...{ email, password },
      }
    );
  };

  const signUpHandler = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    clearError();
    signUp().then((signUpData) => {
      signIn(signUpData.email, form.password).then((signInData) => {
        auth.login(
          signInData.token,
          signInData.refreshToken,
          signInData.userId,
          signInData.name,
          "",
          [""]
        );
      });
    });
  };

  const signInHandler = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    clearError();
    signIn(form.email, form.password).then((res) => {
      auth.login(res.token, res.refreshToken, res.userId, res.name, "", [""]);
    });
  };

  return { loading, changeHandler, signUpHandler, signInHandler, getError };
};

export default useAuthentication;
