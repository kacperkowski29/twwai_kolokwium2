import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import ChartData from '../components/ChartData';

function App() {

  return (
    <Router>
      <div>
        <Link to="/chart-data">View Chart Data</Link>
      </div>
      <Routes>
        <Route path="/chart-data" element={<ChartData />} /> {/* Add a route for the chart data page */}
      </Routes>
    </Router>
  );
}

export default App;