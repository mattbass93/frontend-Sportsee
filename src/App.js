import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserDashboard from './pages/UserDashboard';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user/12" replace />} />
        <Route path="/user/:id" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
