import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAdded } from './postsSlice';
import styles from './AddPostForm.module.css';
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onTitleChange(ev) {
    setTitle(ev.target.value);
  }

  function onContentChange(ev) {
    setContent(ev.target.value);
  }

  function onSavePostClicked() {
    if (title && content) {
      dispatch(
        postAdded(title, content)
      )
    }

    setTitle('');
    setContent('');

    navigate('/');
  }

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
          <label htmlFor='postContent' className={styles.label}>Post content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={(ev) => onContentChange(ev)}
          />
        </div>
        <button type='button' onClick={onSavePostClicked}>Save</button>
      </form>
    </section>
  )
}

export default AddPostForm
