import React from 'react';
import PostsList from './features/posts/PostsList';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import SinglePostPage from './features/posts/SinglePostPage';
import Navbar from './app/Navbar';
import EditPostForm from './features/posts/EditPostForm';
import AddPostForm from './features/posts/AddPostForm';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/posts/new" element={<AddPostForm />} />
        <Route path="/posts/:slug" element={<SinglePostPage />} />
        <Route path="/editPost/:slug" element={<EditPostForm />} />
      </Routes>
    </>
  );
}

export default App;
