import React from "react";
import titleLogo from "./titleLogo.jpg";
import "./home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (    
    <div className="home">
      <div className="home__wrapper">
        <div className="home__title">
          <h1 className="home__title_text"><span className="home__title_color">GTB</span> угона нет.</h1>
          <p className="home__title_desc">У Вас украли велосипед? Не знаете что делать? Следуйте простой инструкции, и мы Вам обязательно поможем.</p>
        </div>
        <div>
          <img className="home__img" src={titleLogo}/>
        </div>
      </div>
      <div className="home__wrapper_steps">
        <div className="home__wrapper_step">
          <h2>Шаг 1</h2>
          <Link className="link" to={"/auth/sign_up"}>
                  <p>Зарегистрируйтесь на сайте</p>
          </Link>
        </div>
        <div className="home__wrapper_step">
          <h2>Шаг 2</h2>
          <Link className="link" to={"/public/report"}>
                  <p>Сообщить о краже</p>
          </Link>
        </div>
        <div className="home__wrapper_step">
          <h2>Шаг 3</h2>
          <p>Ожидайте результат</p>
        </div>
      </div>
    </div>
  );
};