import React from "react";
import { useState } from "react";
import "../Report/report.css";
import "./signup.css";
import axios from "axios";
import {useForm} from "react-hook-form";
import {instance} from "../../api/api";

const fields = [
  {name: 'email', label: 'Email', type: "text", required: true},
  {name: 'password', label: 'Пароль', type: "password", required: true},
  {name: 'firstname', label: 'Имя', type: "text", required: true},
  {name: 'lastName', label: 'Фамилия', type: "text", required: true},
  {name: 'clientId', label: 'Client ID', type: "text", required: true},
]


export const Signup = () => {
  const [loading, setLoading] = useState()
  const [message, setMessage] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //
  //
  //   axios
  //     .post(
  //       "https://sf-final-project-be.herokuapp.com/api/auth/sign_up",
  //       { email, password, firstName, lastName, clientId },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then(
  //       (response) => {
  //         setEmail("");
  //         setPassword("");
  //         setFirstName("");
  //         setLastName("");
  //         setClientId("");
  //         setMessage("Вы успешно зарегистрировались!");
  //         console.log(response);
  //       },
  //       {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       }
  //     )
  //     .catch((error) => {
  //       setMessage(error.response.data.message);
  //     });
  // };

  // const changeMail = (e) => {
  //   setEmail(e.target.value);
  // };
  // const changePassword = (e) => {
  //   setPassword(e.target.value);
  // };
  // const changeName = (e) => {
  //   setFirstName(e.target.value);
  // };
  // const changeSurname = (e) => {
  //   setLastName(e.target.value);
  // };
  // const changeId = (e) => {
  //   setClientId(e.target.value);
  // };
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    setLoading(true);
    instance.post('auth/sign_up', data)
      .then((res) => {
        setMessage('')
        console.log(res)
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
  return (
    <div className="report">
      <form className="formPublic" onSubmit={handleSubmit(onSubmit)}>
        {fields.map(({name, label, type, required }) => {
          return(
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'}} key={name}>
            <label>{label}</label>
          <input

            type={type}
            {...register(name, { required: required })}
          />
            </div>
          )
        })}
        <button style={{ width: "200px", marginTop: "15px" }}>
          Зарегистрироваться
        </button>
        <p style={{ textAlign: "center", marginTop: "20px" }}>{message}</p>
      </form>

    </div>
  );
};
