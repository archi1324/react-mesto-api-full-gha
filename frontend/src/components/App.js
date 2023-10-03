import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContexts } from '../contexts/CurrentUserContexts';
import { useEffect } from 'react';

//элементы popup
import InfoTooltip from './InfoTooltip.js';

//элементы pages
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';

// элементы popup
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import AddPlacePopup from './AddPlacePopup.js';
import AvatarPopup from './AvatarPopup.js';
import EditPopup from './EditPopup.js';

//api
import api from '../utils/Api.js'
import * as auth from '../utils/Auth.js';


export default function App() {
  const [profilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [addPopupOpen, setPlacePopupOpen] = React.useState(false);
  const [avatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [profileEmail, setProfileEmail] = React.useState('');
  const [isInfoSuccess, setInfoSuccess] = React.useState(false);
  const [toolTipPopupOpen, settoolTipPopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


  const handleEditProfileClick = () => { setProfilePopupOpen(true) }
  const handleAddPlaceClick = () => { setPlacePopupOpen(true) }
  const handleEditAvatarClick = () => { setAvatarPopupOpen(true) }
  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setProfilePopupOpen(false);
    setPlacePopupOpen(false);
    setAvatarPopupOpen(false);
    setSelectedCard(null);
    settoolTipPopupOpen(false);
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => { setCurrentUser(data) })
      .catch((err) => { console.log(err) })
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => { setCards(data) })
      .catch((err) => { console.log(err) })
  }, []);

  function handleCardLike(card) {
    // проверяем есть ли лайк на карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.likeCard(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => { console.log(err) });
    } else {
      api.deleteCardLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => { console.log(err) });
    }
  }
  // удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== card._id))
      })
      .catch((err) => { console.log(err) })
  }
  // изменение даннных пользователя
  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => { console.error(err) })
  }
  // обновление автара
  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => { console.error(err) })
  }
  // добавление новой карточки
  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => { console.error(err) })
  }
  // Проверка токена пользователя на подленность на сервере
  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setProfileEmail(data.data.email);
            navigate('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }

  const isOpen = avatarPopupOpen || profilePopupOpen || addPopupOpen || selectedCard
  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 


  React.useEffect(() => {
    handleTokenCheck();
  }, [])
  // Регистрации пользователя на сервере
  function handleRegisterNewUser(email, password) {
    auth.registerUser(email, password)
      .then((data) => {
        if (data) {
          setInfoSuccess(true);
          navigate('/sign-in');
        }
      })
      .catch((err) => {
        setInfoSuccess(false);
        console.log(err);
      })
      .finally(() => settoolTipPopupOpen(true));
  }
  //авторизация
  function handleLoginUser(email, password) {
    auth.loginUser(email, password)
      .then((data) => {
        if (data.token) {
          setProfileEmail(email);
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          navigate('/');
        }
      })
      .catch((err) => {
        setInfoSuccess(false);
        settoolTipPopupOpen(true);
        console.log(err);
      });
  }
  // выход из системы
  function handleExit() {
    localStorage.removeItem('jwt');
    setProfileEmail('');
    setLoggedIn(false);
    navigate('/sign-in');
  }

  return (
    <CurrentUserContexts.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header onExit={handleExit} profileEmail={profileEmail}/>
          <Routes>
            <Route path="/" element={<ProtectedRoute element={Main} loggedIn={loggedIn}
            editAvatar={handleEditAvatarClick}
            editProfile={handleEditProfileClick}
            addPlace={handleAddPlaceClick}
            cardClick={handleCardClick}
            CardLike={handleCardLike}
            CardDelete={handleCardDelete}
            cards={cards} />}/>
            <Route path="/" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-up" />} /> 
            <Route path="/sign-up" element={<Register onRegister={handleRegisterNewUser} />} />
            <Route path="/sign-in" element={<Login onLogin={handleLoginUser} />} />
          </Routes>
          <Footer />
          <AddPlacePopup isOpen={addPopupOpen} onClose={closeAllPopups} addPlace={handleAddPlaceSubmit} />
          <EditPopup isOpen={profilePopupOpen} onClose={closeAllPopups} updateUser={handleUpdateUser} />
          <AvatarPopup isOpen={avatarPopupOpen} onClose={closeAllPopups} updateAvatar={handleUpdateAvatar} />
          <ImagePopup isOpen={selectedCard} card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip isOpen={toolTipPopupOpen} onClose={closeAllPopups} isSuccess={isInfoSuccess}/>
        </div>
      </div>
    </CurrentUserContexts.Provider>
  );
}