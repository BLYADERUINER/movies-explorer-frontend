import './PopupWithInfo.css';

function PopupWithInfo({ popupTitle, isOpen, onClose }) {
  return (
    <div className={`pop-up ${isOpen ? 'pop-up_opened' : ''}`}>
      <div className="pop-up__container">
        <button className="popup__button pop-up__button-close" type="button" onClick={onClose}></button>
        {
        popupTitle ?
          <h2 className="pop-up__title">{`${popupTitle}`}</h2>
          : null
        }
      </div>
    </div>
  );
}

export default PopupWithInfo;
