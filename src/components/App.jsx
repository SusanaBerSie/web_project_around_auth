import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Popup from "./Popup/Popup";
import ImagePopup from "./Form/ImagePopup/ImagePopup";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "./auth";
import Login from "./Login/Login";
import Register from "./Register/Register";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [, setName] = useState(null);
  const [, setLink] = useState();

  const location = useLocation();

  useEffect(() => {
    api.getUserInfo().then((res) => {
      setCurrentUser(res);
    });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((error) => {
        console.error("Error al cargar las tarjetas:", error);
      });
  }, []);

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth.loginUser(email, password);
  };

  const handleUpdateAvatar = async function (avatar) {
    await api
      .switchPhotoProfile(avatar)
      .then((res) => {
        setCurrentUser(res);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al actualizar foto de perfil:", error);
      });
  };

  async function handleUpdateUser(name, description) {
    await api
      .editProfile(name, description)
      .then((res) => {
        setCurrentUser(res);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      });
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    await api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar la tarjeta:", error);
      });
  }

  async function handleAddCard(name, link) {
    await api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al añadir tarjeta:", error);
      });
  }

  function handleOpenPopup(popup, imageName, imageLink) {
    console.log(popup);
    if (imageName && imageLink) {
      setName(imageName);
      setLink(imageLink);
      const updatedImageComponent = {
        children: <ImagePopup name={imageName} link={imageLink} />,
      };
      setPopup(updatedImageComponent);
    } else {
      setPopup(popup);
    }
  }

  function handleClosePopup() {
    setPopup(null);
    setName(null);
    setLink(null);
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddCard,
      }}
    >
      <Header />
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/" element={<ProtectedRoute isLoggedIn={false} />}>
          <Route
            path="/"
            element={
              <>
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onAddCard={handleAddCard}
                  handleOpenPopup={handleOpenPopup}
                />

                {popup && (
                  <Popup onClose={handleClosePopup} title={popup.title}>
                    {popup.children}
                  </Popup>
                )}
              </>
            }
          />
        </Route>
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
