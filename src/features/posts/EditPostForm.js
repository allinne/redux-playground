import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { postUpdated, selectPostById } from './postsSlice';
import styles from './AddPostForm.module.css';

const EditPostForm = () => {
  const { postId } = useParams();

  const post = useSelector(state => selectPostById(state, Number(postId)));

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [userId, setUserId] = useState('');

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

  function onSavePostClicked() {
    if (title && body) {
      dispatch(postUpdated({ id: post.id, title, body, userId }));
      navigate(`/posts/${post.id}`);
    }
  }

  const canSave = Boolean(title) && Boolean(body) && Boolean(userId);

  const userOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className='content'>
      <h2>Edit post</h2>
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
          <select
            id='postAuthor'
            defaultValue={post.userId}
            onChange={(ev) => onAuthorChange(ev)}
          >
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

export default EditPostForm
