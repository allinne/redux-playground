import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './PostsList.module.css';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import { selectAllPosts } from './postsSlice';
import Spinner from '../../components/Spinner';

const PostExcerpt = ({ post }) => {
  return (
    <article className={styles.post}>
      <h3>{post.title}</h3>
      <p>{post.body.substr(0, 75)}</p>
      <div>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <Link to={`/posts/${post.id}`}>View post</Link>
    </article>
  )
}

const PostsList = () => {
  const posts = useSelector(selectAllPosts);

  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  let content;

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..."/>
  } else if (postStatus === 'succeeded') {
    content = posts.map(post => (
      <PostExcerpt key={post.id} post={post}/>
    ));
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="content">
      <h2>Posts</h2>
      <div className={styles.posts}>
        {content}
      </div>
    </section>
  )
}

export default PostsList
