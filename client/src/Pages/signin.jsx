import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignin } from '../Hooks/useSignin';
import '../Styles/signup.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin, error, isLoading } = useSignin();

  const signinHandler = async (e) => {
    e.preventDefault();

    await signin(email, password);
  };

  return (
    <Fragment>
      <form className="signup" onSubmit={signinHandler}>
        <h3>Sign in</h3>
        <div className="fields">
          <>
            <label>Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          </>
          <>
            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          </>
        </div>
        <button disabled={isLoading}>Sign in</button>
        {error && <div className="error">{error}</div>}
      </form>
      <div className="goToSignIn">
        <p>
          Doesn't have account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Signin;
