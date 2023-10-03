import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Login(props) {
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
        props.onLogin(email, password)
    }

    if (props.isLogin) {
        return <Navigate to="/" />;
    }

    return (
        <section className="login">
            <form className="login__form" name="login" onSubmit={handleSubmit}>
                <h2 className="login__title">Вход</h2>
                <input className="login__input" type="email" name="email" value={email}
                    id="login-email" placeholder="Email" onChange={handleEmailChange} required />
                <input className="login__input" type="password" name="password" value={password}
                    id="login-password" placeholder="Пароль" onChange={handlePasswordChange} required />
                <button className="login__button" type="submit">Войти</button>
            </form>
        </section>
    );
}