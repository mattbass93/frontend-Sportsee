import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from './pages/UserDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route dynamique pour passer l'ID utilisateur */}
        <Route path="/user/:id" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
