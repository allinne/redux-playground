import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import { selectPostById } from './postsSlice';

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector(state => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }

  return (
    <section className='content'>
      <article>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <div>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </div>
        <Link to={`/editPost/${post.id}`}>Edit post</Link>
      </article>
    </section>
  )
}

export default SinglePostPage
