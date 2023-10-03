import srcLogo from '../images/logo.svg';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

export default function Header(props) {
  
  return (
    <section className="header">
      <img src={srcLogo} alt="Логотип Место Россия" className="header__logo" />
      <Routes>
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__login">Войти</Link>} />
        <Route path="/sign-in" element={<Link to="/sign-up" className="header__login">Регистрация</Link>} />
        <Route path="/" element={<ul className="header__login-auth">
          <li className="header___list">
            <p className="header__email">{props.profileEmail}</p>
          </li>
          <li className="header___list">
            <Link to="/sign-in" className="header__exit" onClick={props.onExit}>Выйти</Link>
          </li>
        </ul>} />
      </Routes>
    </section>
  )
}