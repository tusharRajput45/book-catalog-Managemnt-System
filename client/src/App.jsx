// src/App.js
import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AddBook from './component/AddBook';
import AllBook from './component/AllBook';
import EditBook from './component/EditBook';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllBook />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/edit-book/:id" element={<EditBook />} /> {/* Capture book ID */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
