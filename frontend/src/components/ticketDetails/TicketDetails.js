import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TicketDetails() {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        // Fetch ticket details from backend using the ID from the URL
        axios.get(`http://localhost:8081/ticket_form/${id}`)
            .then(res => {
                setTicket(res.data);
            })
            .catch(err => {
                console.error('Error fetching ticket details:', err);
            });
    }, [id]);

    if (!ticket) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ticket-details">
            <h2>Ticket Details</h2>
            <p><strong>ID:</strong> {ticket.id}</p>
            <p><strong>Ticket Type:</strong> {ticket.ticket_type}</p>
            <p><strong>Title:</strong> {ticket.short_title}</p>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p><strong>Start Time:</strong> {new Date(ticket.start_time).toLocaleString()}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>Segment:</strong> {ticket.segment}</p>
            <p><strong>Client:</strong> {ticket.client}</p>
            <p><strong>Project:</strong> {ticket.project}</p>
        </div>
    );
}

export default TicketDetails;
