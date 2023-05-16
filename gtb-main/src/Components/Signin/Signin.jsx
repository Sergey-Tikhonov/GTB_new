import React, {useState} from "react";
import "../Report/report.css";
import "./signin.css";
import {useForm} from "react-hook-form";
import {instance} from "../../api/api";
import {
  Navigate,
} from "react-router-dom";

export const Signin = ({admin, setAdmin}) => {
  const [loading, setLoading] = useState()
  const [message, setMessage] = useState("");
  const token = localStorage.getItem('token')
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    setLoading(true);
    instance.post('auth/sign_in', data)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        setAdmin(!admin)
      })
      .catch((err) => setMessage(err.response.data.message
      ))
      .finally(() =>  setLoading(false))
  };
  if(loading){
    return (
      <div style={{textAlign: 'center'}}>loading</div>
    )
  }
  if(token){
    return <Navigate to = '/' />
  }
  return (
    <div style={{ marginTop: "90px" }} className="report">
    <form className="formPublic" onSubmit={handleSubmit(onSubmit)}>
      <h2>Авторизация</h2>
      <label>E-mail</label>
      <input {...register("email", { required: true })} />
      <label>Пароль</label>
      <input type={'password'} {...register("password", { required: true })} />
      <button style={{ margin: "30px 0 20px 0" }} className="register">
        Войти
      </button>
      <p>{message}</p>
    </form>
    </div>
  );
};
