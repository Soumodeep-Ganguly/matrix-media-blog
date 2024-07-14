import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from './slices/blogSlice';
import Axios from 'axios';
import SignIn from './pages/sign-in';
import CreateBlog from './pages/create-blog';
import BlogList from './pages/blog-list';
import Signup from './pages/sign-up';
import Settings from './settings'
import './App.scss';
import { logout } from './slices/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token);
  Axios.defaults.baseURL = Settings[process.env.NODE_ENV || "development"].server_url;

  useEffect(() => {
    if (isAuthenticated) {
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + isAuthenticated;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <div className="App">
        <nav className="bg-blue-600 p-4 text-white flex">
          <Link to="/" className="mr-4">Home</Link>
          <div className='flex ml-auto'>
            {!isAuthenticated ? <>
              <Link to="/sign-in" className="mr-4">Sign In</Link>
              <Link to="/sign-up">Sign Up</Link>
            </> : <>
              <Link to="/create">Create</Link>
              <a type='button' className='ml-1' onClick={() => {
                Axios.defaults.headers.common['Authorization'] = '';
                dispatch(logout());
              }}>Log Out</a>
            </>}
          </div>
        </nav>
        <div className="container mx-auto">
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/" element={<BlogList />} />
            <Route path="/create" element={isAuthenticated ? (
              <CreateBlog />
            ) : (
              <div>Please log in to see the blog posts.</div>
            )} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;