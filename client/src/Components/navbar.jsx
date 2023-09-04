import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/navbar.css';
import { useSignout } from '../Hooks/useSignout';
import { useAuth } from '../Hooks/useAuth';

const Navbar = () => {
  const { signout } = useSignout();
  const { user } = useAuth();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            <>
              <span>{user.email}</span>
              <button onClick={() => signout()}>Sign out</button>
            </>
          )}
          {!user && (
            <>
              <Link to="/signin">Signin</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
