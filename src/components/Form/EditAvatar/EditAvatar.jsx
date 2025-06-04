export default function EditAvatar() {
  return (
    <>
      <form
        className="popup__form popup__form-newPhotoProfile"
        name="form-newPhotoProfile"
        noValidate
      >
        <fieldset className="popup__confirm-fieldset">
          <input
            required
            type="url"
            className="popup__input popup__input_type_error"
            id="photoProfileUrlInput"
            name="url"
            placeholder="URL de la foto"
          />
          <span className="input__error photoUrlInput-error"></span>
        </fieldset>

        <fieldset className="popup__button">
          <button type="submit" className="popup__button-item">
            Guardar
          </button>
        </fieldset>
      </form>
    </>
  );
}
