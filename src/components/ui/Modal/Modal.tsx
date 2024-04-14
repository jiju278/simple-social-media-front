// Modal.tsx

import React, { useState } from 'react';
import styles from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/create-store';
import { nanoid } from '@reduxjs/toolkit';
import { postMessage } from '@/lib/timelines/usecases/post-message.usecase';
import { selectAuthUser } from '@/lib/auth/reducer';
import { selectTimelineForUser } from '@/lib/timelines/slices/timelines.slice';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const timelineId = useSelector<RootState, string>((state) => {
    const authUser = selectAuthUser(state);
    const timeline = selectTimelineForUser(authUser, state);
    return timeline.id;
  });
  const messageId = nanoid(5);

  const handlePost = () => {
    dispatch(postMessage({ messageId, text, timelineId }));
    setText('');
    onClose();
  };

  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <textarea
          className={styles['modal-textarea']}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
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
