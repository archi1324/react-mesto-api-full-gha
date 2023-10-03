import { CurrentUserContexts } from '../contexts/CurrentUserContexts';
import React from 'react';

export default function Card(card) {
  const currentUser = React.useContext(CurrentUserContexts);
  // проверяем владельца
  const isOwn = card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  // const cardDeleteButtonClassName = (`${isOwn ? 'card__trash' : 'card__trash_disabled'}`);
  // есть ли лайк у текущего пользователя, переменная после зададим в класснейм для кнопки лайка
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${isLiked && "card__like_on"}`;

  function handleClick() {
    card.cardClick(card);
  }

  function handleLikeClick() {
    card.CardLike(card);
  }

  function handleDeleteClick() {
    card.CardDelete(card)
  }

  return (
    <div className="card">
      <img src={card.link} alt={card.name} onClick={handleClick} className="card__image" />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div>
          <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName} />
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button type="button" className='card__trash' onClick={handleDeleteClick} />}
    </div>
  );
}