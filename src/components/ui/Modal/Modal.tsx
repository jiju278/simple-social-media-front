// Modal.tsx

import React, { useState } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [text, setText] = useState('');

  const handlePost = () => {
    console.log('Text posted:', text);
    onClose();
  };

  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <textarea
          className={styles['modal-textarea']}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className={styles['button-container']}>
          <button className={styles['cancel-button']} onClick={onClose}>
            Cancel
          </button>
          <button className={styles['post-button']} onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
