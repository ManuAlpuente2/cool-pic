import "./UploadModal.scss";

const UploadModal = ({ isOpen, onClose, onSelectGallery, onSelectCamera }) => {
  if (!isOpen) return null;

  return (
    <div className="upload-modal-overlay" onClick={onClose}>
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="upload-modal__header">
          <h3>SELECT IMAGE</h3>
          <button
            className="upload-modal__close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <i className="icon icon-clear"></i>
          </button>
        </div>

        <div className="upload-modal__options">
          <button className="upload-modal__option" onClick={onSelectGallery}>
            <div className="upload-modal__option__icon">
              <i className="icon icon-image"></i>
            </div>
            <div className="upload-modal__option__content">
              <h4>Gallery</h4>
              <p>Select from your gallery</p>
            </div>
          </button>

          <button className="upload-modal__option" onClick={onSelectCamera}>
            <div className="upload-modal__option__icon">
              <i className="icon icon-camera"></i>
            </div>
            <div className="upload-modal__option__content">
              <h4>Camera</h4>
              <p>Take a new photo</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
