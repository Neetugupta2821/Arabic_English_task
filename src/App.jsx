import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import './App.css'
import Usertable from './components/Usertable'
import Book from './components/Book'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
 
      <BrowserRouter>
      <Header/>
        <Routes>
           
          <Route path="/" element={<Home />} />
          <Route path="user" element={<Usertable />} />
          <Route path="Book" element={<Book />} />

        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
