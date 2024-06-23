import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

function AdminPage() {
const [tickets, setTickets] = useState([]);
const [updateError, setUpdateError] = useState('');

useEffect(() => {
    // Fetch ticket data from backend when the component mounts
    axios.get('http://localhost:8081/ticket_form')
        .then(res => {
            setTickets(res.data);
        })
        .catch(err => {
            console.error('Error fetching tickets:', err);
        });
}, []);

const updateTicket = async (ticketId, status, priority) => {
    try {
        const response = await axios.post('http://localhost:8081/ticket/update', {
            id: ticketId,
            status,
            priority
        });
        console.log('Ticket updated:', response.data);
        // Update the state to reflect the changes
        setTickets(prevTickets => prevTickets.map(ticket =>
            ticket.id === ticketId ? { ...ticket, status, priority } : ticket
        ));
    } catch (error) {
        console.error('Error updating ticket:', error);
        setUpdateError('Failed to update ticket');
    }
};

return (
    <div className="admin-page">
        <header>
            <h1 className="admin-heading">Admin Page</h1>
            <Link to="/dashboard">
                <button className="dashboard-button">View Dashboard</button>
            </Link>
        </header>
        <div className="admin-container">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ticket Type</th>
                            <th>Title</th>
                            <th>Priority</th>
                            <th>Start Time</th>
                            <th>Status</th>
                            <th>Segment</th>
                            <th>Client</th>
                            <th>Project</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>
                                    <Link to={`/ticket/${ticket.id}`}>{ticket.id}</Link>
                                </td>
                                <td>{ticket.ticket_type}</td>
                                <td>{ticket.short_title}</td>
                                <td>
                                    <select
                                        value={ticket.priority}
                                        onChange={(e) => updateTicket(ticket.id, ticket.status, e.target.value)}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </td>
                                <td>{new Date(ticket.start_time).toLocaleString()}</td>
                                <td>
                                    <select
                                        value={ticket.status}
                                        onChange={(e) => updateTicket(ticket.id, e.target.value, ticket.priority)}
                                    >
                                        <option value="open">Open</option>
                                        <option value="in progress">In Progress</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </td>
                                <td>{ticket.segment}</td>
                                <td>{ticket.client}</td>
                                <td>{ticket.project}</td>
                                <td>
                                    <button
                                        onClick={() => updateTicket(ticket.id, ticket.status, ticket.priority)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>                    
);
}
export default AdminPage;
