
// import './App.css';
import React from 'react';
import { Container } from '@mui/material'
import Navbar from './components/Navbar/navbar';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import PostDetails from './components/postdetails/PostDetails';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <>
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Navigate to="/posts" replace/> } />
            <Route path="/posts" exact element={<Home />} />
            <Route path="/posts/:id" exact element={<PostDetails />} />
            <Route path="/auth" exact element={user ? <Navigate to="/posts" replace /> : <Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
