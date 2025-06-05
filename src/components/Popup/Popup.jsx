export default function Popup(props) {
  const { onClose, title, children } = props;
  return (
    <>
      <div className="popup__overlay"></div>
      <div className="popup">
        <div className={` ${!title ? "" : "popup_profile"}`}>
          <button
            className="popup__X-button"
            aria-label="Close modal"
            type="button"
            onClick={onClose}
          >
            X
          </button>
          <div className={` ${!title ? "" : "popup__container"}`}>
            {title && <h2 className="popup__title">{title}</h2>}
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
