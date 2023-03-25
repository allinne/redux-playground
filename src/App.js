import React from 'react';
import PostsList from './features/posts/PostsList';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SinglePostPage from './features/posts/SinglePostPage';
import Navbar from './app/Navbar';
import EditPostForm from './features/posts/EditPostForm';
import AddPostForm from './features/posts/AddPostForm';
import UserList from './features/users/UsersList';
import UserPage from './features/users/UserPage';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/posts/new" element={<AddPostForm />} />
        <Route path="/posts/:postId" element={<SinglePostPage />} />
        <Route path="/editPost/:postId" element={<EditPostForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:userId" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
