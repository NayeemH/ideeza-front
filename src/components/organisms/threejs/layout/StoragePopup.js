import React from 'react';

function StoragePopup({ onSave, onExit }) {
  return (
    <div className="storage-popup">
      <div className="storage-popup__popup">
        <p>Load previous project?</p>
        <div className="storage-popup__popup__buttons">
          <button type="button" onClick={onSave}>
            Yes
          </button>
          <button type="button" onClick={onExit}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoragePopup;
