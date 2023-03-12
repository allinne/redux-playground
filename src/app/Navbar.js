import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <section>
        <h1>Redux Playground</h1>
        <div className={styles.links}>
          <Link to="/">Posts</Link>
          <Link to="/posts/new">Create Post</Link>
        </div>
      </section>
    </nav>
  )
}

export default Navbar
