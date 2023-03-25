import React from 'react';
import { selectUserById } from './usersSlice';
import { selectAllPosts } from '../posts/postsSlice';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';;

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector(state => selectUserById(state, userId));

  const postsForUser = useSelector(state => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter(post => post.userId === Number(userId));
  });

  const postTitles = postsForUser.map(post => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  if (!user) {
    return (
      <section>
        <h2>Page not found</h2>
      </section>
    )
  }

  return (
    <section className='content'>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}

export default UserPage
