export default function ImagePopup(props) {
  // const { handleOpenPopup } = props.card;
  return (
    <>
      {/*   <div className="popup popup__image popup__image-zoom">
        <div className="popup"></div> */}
      <img className="popup__photo" src={props.link} alt="" />
      <p className="popup__photo-title">{props.name}</p>
      {/* </div> */}
    </>
  );
}

/* Crea el componente ImagePopup siguiendo un proceso similar 
que con el componente Card. Debe recibir una card como props.
- Pasa handleOpenPopup como props al componente Card.
- Crea el objeto imageComponenten Card.jsx;
- Llama a handleOpenPopup(imageComponent) onClick en el elemento img. */
