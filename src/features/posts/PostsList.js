import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './PostsList.module.css';

const PostsList = () => {
  const posts = useSelector(state => state.posts);

  const renderedPosts = posts.map(post => (
    <article key={post.id} className={styles.post}>
      <h3>{post.title}</h3>
      <p>{post.content.substr(0, 100)}</p>
      <Link to={`/posts/${post.id}`}>View post</Link>
    </article>
  ));

  return (
    <section className="content">
      <h2>Posts</h2>
      <div className={styles.posts}>
        {renderedPosts}
        </div>
    </section>
  )
}

export default PostsList
