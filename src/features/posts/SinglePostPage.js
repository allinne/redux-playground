import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const SinglePostPage = () => {
  const { slug } = useParams();
  const post = useSelector(state => state.posts.find(post => post.id === slug));

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
        <p>{post.content}</p>
        <Link to={`/editPost/${post.id}`}>Edit post</Link>
      </article>
    </section>
  )
}

export default SinglePostPage
