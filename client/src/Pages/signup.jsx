import React, { useState } from 'react';
import '../Styles/signup.css';
import { useSignup } from '../Hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, error, isLoading } = useSignup();

  const signUpHandler = async (e) => {
    e.preventDefault();

    await signUp(email, password);
  };

  return (
    <form className="signup" onSubmit={signUpHandler}>
      <h3>Sign up</h3>
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
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
