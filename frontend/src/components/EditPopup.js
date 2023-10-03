import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContexts } from '../contexts/CurrentUserContexts';

export default function EditPopup(props) {
  // стейт значений инпутов
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  // подписка на контекст
  const currentUser = React.useContext(CurrentUserContexts);

  // данные пользователя в компонентах
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    // передаем значения во внешний обработчик
    props.updateUser({
      name: name,
      about: description,
    });
  }
  // обработчик изменения инпута
  function handleChangeName(e) {
    setName(e.target.value)
  }
  // обработчик измененния 2 инпута
  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  return (
    <PopupWithForm onSubmit={handleSubmit}
      isOpen={props.isOpen} onClose={props.onClose}
      title={"Редактировать профиль"} buttonSave={"Сохранить"}
      name={"edit"} form={"form popup__form-edit"}>
      <input value={name || ''} onChange={handleChangeName}
        className="popup__input  popup__field" required
        type="text" name="name" id="name__input"
        minLength="2" maxLength="40" placeholder="Имя" />
      <div className="popup__span-container">
        <span id="name__input-error" className="popup__input-error"></span>
      </div>
      <input value={description || ''} onChange={handleChangeDescription}
        className="popup__input  popup__subtitle" required
        type="text" name="about" id="name__input_description"
        minLength="2" maxLength="200" placeholder="Профессия" />
      <div className="popup__span-container">
        <span id="name__input_description-error" className="popup__input-error"></span>
      </div>
    </PopupWithForm>
  )
}