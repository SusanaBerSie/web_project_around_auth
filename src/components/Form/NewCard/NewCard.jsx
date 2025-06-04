export default function NewCard() {
  return (
    <>
      <form
        className="popup__form"
        name="form-card"
        id="new-card-form"
        noValidate
      >
        <fieldset className="popup__fieldset">
          <input
            required
            type="text"
            className="popup__input popup__input_type_error"
            id="photoTitleInput"
            name="title"
            placeholder="Title"
            minLength="2"
            maxLength="30"
          />
          <span className="input__error" id="card-name-error"></span>
        </fieldset>
        <fieldset className="popup__fieldset">
          <input
            required
            type="url"
            className="popup__input popup__input_type_error"
            id="photoUrlInput"
            name="url"
            placeholder="URL de la foto"
          />
          <span className="input__error" id="card-link-error"></span>
        </fieldset>
        <fieldset className="popup__button">
          <button type="submit" className="button popup__button-item">
            Guardar
          </button>
        </fieldset>
      </form>
    </>
  );
}
