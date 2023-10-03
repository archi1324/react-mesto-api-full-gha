import React from 'react';
import Card from "./Card";
import { CurrentUserContexts } from '../contexts/CurrentUserContexts.js';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContexts);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar">
            <img src={currentUser.avatar} alt="Фото профиля" className="profile__avatar" onClick={props.editAvatar} />
            <button className="profile__avatar-button"></button>
          </div>
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button onClick={props.editProfile} className="profile__edit-button" type="button"></button>
        </div>
        <button onClick={props.addPlace} className="profile__add-button" type="button"></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card key={card._id} {...card} cardClick={props.cardClick} CardLike={props.CardLike} CardDelete={props.CardDelete}/>
        ))}
      </section>
    </main>
  );
}