import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from '../pages/Home/Home';
import Favorites from '../pages/Favorites/Favorites';
import CharacterDetailPage from '../shared/ui//CharacterDetailPage/CharacterDetailPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="character/:id" element={<CharacterDetailPage />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
