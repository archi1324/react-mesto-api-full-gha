export default function InfoTooltip(props) {
    return (
        <div className={`popup popup__login ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container_login popup__container">
                <button type="button" className="popup__exit" onClick={props.onClose}></button>
                <div className={`popup__login-img ${props.isSuccess ? "popup__login-img_true" : "popup__login-img_not-true"}`}></div>
                <h2 className="popup__login-tittle"> {props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз"}</h2>
            </div>
        </div>
    )
}