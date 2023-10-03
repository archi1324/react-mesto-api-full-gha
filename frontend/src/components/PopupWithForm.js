export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? `popup_opened` : ""}`}>
      <div className={`popup__container`}>
        <button type="button" className="popup__exit popup__exit-zoom" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`form ${props.form}`} onSubmit={props.onSubmit}>{props.children}
          <button type="submit" className="popup__submit">{props.buttonSave}</button>
        </form>
      </div>
    </div>
  );}