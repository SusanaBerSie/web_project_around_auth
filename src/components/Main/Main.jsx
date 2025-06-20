import { useState, useContext } from "react";
import NewCard from "../Form/NewCard/NewCard";
import EditAvatar from "../Form/EditAvatar/EditAvatar";
import EditProfile from "../Form/EditProfile/EditProfile";
import Popup from "../Popup/Popup";
import Card from "./components/Card/Card";
import ImagePopup from "../Form/ImagePopup/ImagePopup";
import { api } from "../../utils/api.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function Main(props) {
  const [popup, setPopup] = useState(null);
  const [name, setName] = useState(null);
  const [link, setLink] = useState();

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddCard={handleAddCard} />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar onUpdateAvatar={handleEditAvatar} />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile onProfileSubmit={handleProfileSubmit} />,
  };

  const imageComponent = { children: <ImagePopup name={name} link={link} /> };

  function handleOpenPopup(popup, imageName, imageLink) {
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

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  async function handleAddCard(name, link) {
    await props.onAddCard(name, link);
    handleClosePopup();
  }

  async function handleProfileSubmit(name, description) {
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

  async function handleEditAvatar(avatar) {
    await api
      .switchPhotoProfile(avatar)
      .then((res) => {
        setCurrentUser(res);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al actualizar foto de perfil:", error);
      });
  }
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__box-info">
          <div
            className="profile__avatar"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          >
            <img className="profile__avatar-photo" src={currentUser.avatar} />
          </div>
          <div className="profile__box">
            <div className="profile__info">
              <h1 className="profile__info-name"> {currentUser.name} </h1>
              <h2 className="profile__info-subtitle">{currentUser.about}</h2>
            </div>
            <button
              className="profile__info-edit"
              id="open-edit-profile"
              aria-label="edit profile"
              type="button"
              onClick={() => handleOpenPopup(editProfilePopup)}
            ></button>
          </div>
        </div>
        <button
          className="profile__add-button"
          aria-label="Add card"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="elements">
        {props &&
          props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={() =>
                handleOpenPopup(imageComponent, card.name, card.link)
              }
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
