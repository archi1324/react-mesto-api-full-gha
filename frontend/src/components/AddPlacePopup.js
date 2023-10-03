import React from 'react';
import PopupWithForm from './PopupWithForm';


export default function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    props.addPlace({ name, link });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm onSubmit={handleSubmit}
      isOpen={props.isOpen} onClose={props.onClose}
      title={"Новое место"} buttonSave={"Создать"}
      name={"add"} form={"form popup__form-add"}>
      <input onChange={handleChangeName} value={name}
        className="popup__input popup__field popup__field-add" required
        type="text" name="place" id="name__input_card"
        minLength="2" maxLength="30" placeholder="Название" />
      <div className="popup__span-container">
        <span id="name__input_card-error" className="popup__input-error"></span>
      </div>
      <input value={link} onChange={handleChangeLink}
        className="popup__input popup__subtitle popup__subtitle-add" required
        type="url" name="link" id="name__input_url"
        placeholder="Ссылка" />
      <div className="popup__span-container">
        <span id="name__input_url-error" className="popup__input-error"></span>
      </div>
    </PopupWithForm>
  )
}