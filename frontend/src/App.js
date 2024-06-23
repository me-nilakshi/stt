import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import TicketForm from './components/ticketform/TicketForm';
import Register from './components/register/Register';
import Admin from './components/admin/Admin';
import TicketDetails from './components/ticketDetails/TicketDetails';
import Dashboard from './components/dashboard/Dashboard'

function App() {


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ticket-form" element={<TicketForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

