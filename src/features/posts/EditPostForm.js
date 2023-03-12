import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { postUpdated } from './postsSlice';
import styles from './AddPostForm.module.css';

const EditPostForm = () => {
  const { slug } = useParams();

  const post = useSelector(state => state.posts.find(post => post.id === slug));

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

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
      dispatch(postUpdated({ id: post.id, title, content }));
      navigate(`/posts/${post.id}`);
    }
  }

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

export default EditPostForm
