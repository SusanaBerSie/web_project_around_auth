import { Children } from "react";
//import ImagePopup from "../../../Form/ImagePopup/ImagePopup";

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { handleOpenPopup } = props;

  return (
    <div className="element">
      <div className="element__image-box">
        <img
          src={link}
          alt=""
          className="element__image"
          onClick={() => {
            handleOpenPopup(null, name, link);
          }}
        />
        <img
          src="/images/trash.png"
          alt="trash"
          className="element__icon-trash"
          type="button"
        />
      </div>
      <div className="element-box">
        <h2 className="element__title">{name}</h2>
        <img
          src="/images/heart.png"
          alt="like"
          className="element__icon-like"
          type="button"
        />
      </div>
    </div>
  );
}
