import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(email, password)
    }

    if (props.isLogin) {
        return <Navigate to="/" />;
    }

    return (
        <section className="login">
            <form className="login__form" name="register" onSubmit={handleSubmit}>
                <h2 className="login__title">Регистрация</h2>
                <input className="login__input" type="email" name="email" value={email}
                    id="register-email" placeholder="Email" onChange={handleEmailChange} required />
                <input className="login__input" type="password" name="password" value={password}
                    id="register-password" placeholder="Пароль" onChange={handlePasswordChange} required />
                <button className="login__button" type="submit">Зарегистрироваться</button>
            </form>
            <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
        </section>
    );
}