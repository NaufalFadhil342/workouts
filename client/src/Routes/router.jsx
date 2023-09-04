import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../Hooks/useAuth';
import Navbar from '../Components/navbar';

const Home = lazy(() => import('../Pages/home'));
const Signup = lazy(() => import('../Pages/signup'));
const Signin = lazy(() => import('../Pages/signin'));

const fallbackStyle = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItem: 'center',
};

const BrowserRouter = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <div className="pages">
        <Suspense fallback={<p style={fallbackStyle}>Loading...</p>}>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={!user ? <Signin /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/signin" />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default BrowserRouter;
