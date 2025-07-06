import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

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
      })
      .catch((error) => {
        console.error("Error al añadir tarjeta:", error);
      });
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <>
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddCard={handleAddCard}
        />
        <Footer />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
