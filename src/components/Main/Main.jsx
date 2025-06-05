import avatarImage from "../../images/avatar.jpg";
import { useState } from "react";
import NewCard from "../Form/NewCard/NewCard";
import EditAvatar from "../Form/EditAvatar/EditAvatar";
import EditProfile from "../Form/EditProfile/EditProfile";
import Popup from "../Popup/Popup";
import Card from "./components/Card/Card";
import ImagePopup from "../Form/ImagePopup/ImagePopup";

const cards = [
  {
    isLiked: false,
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:10:57.741Z",
  },
  {
    isLiked: false,
    _id: "5d1f064ed321eb4bdcd707de",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:11:58.324Z",
  },
];

console.log(cards);

export default function Main() {
  const [popup, setPopup] = useState(null);
  const [name, setName] = useState(null);
  const [link, setLink] = useState();

  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
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

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__box-info">
          <div
            className="profile__avatar"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          >
            <img
              className="profile__avatar-photo"
              src={avatarImage}
              alt="Avatar"
            />
          </div>
          <div className="profile__box">
            <div className="profile__info">
              <h1 className="profile__info-name">Jacques Cousteau</h1>
              <h2 className="profile__info-subtitle">Explorador</h2>
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
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            handleOpenPopup={() =>
              handleOpenPopup(imageComponent, card.name, card.link)
            }
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
