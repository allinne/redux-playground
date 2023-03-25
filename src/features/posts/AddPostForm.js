import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';
import styles from './AddPostForm.module.css';
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(state => state.users);

  function onTitleChange(ev) {
    setTitle(ev.target.value);
  }

  function onBodyChange(ev) {
    setBody(ev.target.value);
  }

  function onAuthorChange(ev) {
    setUserId(ev.target.value);
  }

  async function onSavePostClicked() {
    if (canSave) {
      setAddRequestStatus('pending');
      await dispatch(
        addNewPost({ title, body, userId })
      )
    }

    setTitle('');
    setBody('');
    setUserId('');

    navigate('/');
  }

  const canSave = [title, body, userId].every(Boolean) && addRequestStatus === 'idle';

  const userOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="content">
      <h2>Add a new post</h2>
      <form>
        <div className={styles.line}>
          <label htmlFor='postTitle' className={styles.label}>Post title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={(ev) => onTitleChange(ev)}
          />
        </div>
        <div className={styles.line}>
          <label htmlFor='postAuthor' className={styles.label}>Author</label>
          <select id='postAuthor' onChange={(ev) => onAuthorChange(ev)}>
            <option value=""></option>
            {userOptions}
          </select>
        </div>
        <div className={styles.line}>
          <label htmlFor='postContent' className={styles.label}>Post content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={body}
            onChange={(ev) => onBodyChange(ev)}
          />
        </div>
        <button
          type='button'
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
