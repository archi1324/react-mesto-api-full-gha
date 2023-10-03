import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.updateAvatar({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect(() => { avatarRef.current.value = '' }, [props.isOpen]);

  return (
    <PopupWithForm onSubmit={handleSubmit}
    isOpen={props.isOpen} onClose={props.onClose}
    title={"Обновить аватар"} buttonSave={"Обновить"}
    name={"avatar"} form={"form popup__form-avatar"} container={"popup_avatar"}>
      <input ref={avatarRef}
        className="popup__input popup__input-avatar" required
        type="url" name="avatar" id="avatar__input_url"
        placeholder="Ссылка на аватар" />
      <div className="popup__span-container">
        <span id="name__input_url-error" className="popup__input-error"></span>
      </div>
    </PopupWithForm>
  )
}