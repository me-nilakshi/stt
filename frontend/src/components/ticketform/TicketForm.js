import React, { useState, useEffect } from 'react';
import './TicketForm.css'; // Import the CSS file
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import tickImage from '../../images/remove.png';
import axios from 'axios';

function TicketForm() {
const [ticketType, setTicketType] = useState('')
const [shortTitle, setShortTitle] = useState('');
const [description, setDescription] = useState('');
const [priority, setPriority] = useState('low');
const [startTime, setStartTime] = useState('');
const [status, setStatus] = useState('open'); // Default status is 'Open'
const [segment, setSegment] = useState('');
const [project, setProject] = useState('');
const [client, setClient] = useState('');
const [errorMessage, setErrorMessage] = useState(''); // Correctly define errorMessage and setErrorMessage
const [showModal, setShowModal] = useState(false);
const [queryOption, setQueryOption] = useState('');
const [issueOption, setIssueOption] = useState('');
const [selectedFiles, setSelectedFiles] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);

useEffect(() => {
    if (searchTerm) {
        // Fetch search results when searchTerm changes
        axios.get(`http://localhost:8081/search_tickets?keyword=${searchTerm}`)
            .then(res => {
                setSearchResults(res.data);
            })
            .catch(err => {
                console.error(err);
                setErrorMessage('Failed to search for tickets');
            });
    }
}, [searchTerm]);

const handleSearchClick = () => {
    if (searchTerm) {
        axios.get(`http://localhost:8081/search_tickets?keyword=${searchTerm}`)
            .then(res => {
                setSearchResults(res.data);
            })
            .catch(err => {
                console.error(err);
                setErrorMessage('Failed to search for tickets');
            });
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    // // Check if start time is earlier than end time
    // if (new Date(startTime) >= new Date(endTime)) {
    //     setErrorMessage('Issue start time must be earlier than ticket end time!');
    //     return;
    // }

    // Handle form submission, e.g., send data to backend
    console.log("Ticket type:", ticketType);
    console.log("Title:", shortTitle);
    if(ticketType === 'Query')  console.log("Query Option:", queryOption)
    else    console.log("Issue Option:", issueOption)
    console.log("Description:", description);
    console.log("Priority:", priority);
    console.log("Issue Start time:", startTime);
    setStatus('open'); // Assuming ticket status will be set to 'Open' upon submission
    console.log("Segment:", segment);
    console.log("Project:", project);
    console.log("Client:", client);

    //prep form data
    const formData = new FormData();
    formData.append('ticketType', ticketType);
    formData.append('queryOption', ticketType === 'Query' ? queryOption : '');
    formData.append('issueOption', ticketType === 'Issue' ? issueOption : '');
    formData.append('shortTitle', shortTitle);
    formData.append('description', description);
    formData.append('priority', priority);
    formData.append('startTime', startTime);
    formData.append('status', 'open');
    formData.append('segment', segment);
    formData.append('project', project);
    formData.append('client', client);
    selectedFiles.forEach(file => formData.append('images', file));

     // Send data to the backend
    axios.post('http://localhost:8081/ticket_form', {
        ticketType,
        queryOption: ticketType === 'Query' ? queryOption : '',
        issueOption: ticketType === 'Issue' ? issueOption : '',
        shortTitle,
        description,
        priority,
        startTime,
        status: 'open', 
        segment,
        project,
        client,
    })
    .then(res => {
        console.log(res.data);
        setShowModal(true);
        // Handle successful response
    })
    .catch(err => {
        console.error(err);
        setErrorMessage('Failed to create ticket');
    });
};

const handleClose = () => {
    setShowModal(false);
};

const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
};

useEffect(() => {
    document.body.classList.add('ticket-form-page');
    return () => {
      document.body.classList.remove('ticket-form-page');
    };
  }, []);
return (
    <div className="ticket-form-container">
        <h2>Create a New Ticket</h2>
        <form onSubmit={handleSubmit}>
        {/* <div className='form-section'> */}
            <div className='form-row full-width'>
            <div className="form-group">
                    <label htmlFor="ticketType">Ticket Type:</label>
                    <select id="ticketType" value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
                        <option value="">Select type</option>
                        <option value="Query">Query</option>
                        <option value="Issue">Issue</option>
                        <option value="Other">Other</option>
                    </select>
            </div>
            
            <div className='form-row'>
            {ticketType === 'Query' && (
                <div className="form-row full-width">
                <div className="form-group">
                    <label htmlFor="queryOption">Query Option:</label>
                    <select id="queryOption" value={queryOption} onChange={(e) => setQueryOption(e.target.value)}>
                        <option value="">Select a query</option>
                        <option value="Connectivity">General</option>
                        <option value="Technical">Technical</option>
                        <option value="Password Reset">Password Reset</option>
                        <option value="Data Loss">Data Loss</option>
                        <option value="Data Retrieval">Data Retrieval</option>
                        <option value="License and subscription management">License and subscription management</option>
                    </select>
                </div>
                </div>
            )}

            {ticketType === 'Issue' && (
                <div className="form-row full-width">
                <div className="form-group">
                    <label htmlFor="issueOption">Issue Option:</label>
                    <select id="issueOption" value={issueOption} onChange={(e) => setIssueOption(e.target.value)}>
                        <option value="">Select an issue</option>
                        <option value="Connectivity">Connectivity</option>
                        <option value="Software Installation">Software Installation</option>
                        <option value="Software Bug">Software Bug</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="Access to shared resources">Access to shared resources</option>
                        <option value="Software update">Software Update</option>
                        <option value="Meeting room equipment">Meeting room equipment</option>
                        <option value="Hardware malfunction">Hardware malfunction</option>
                    </select>
                </div>
                </div>
            )}
            </div>
            {/* <div className="form-row"> */}
                <div className="form-row full-width">
                    <div className="form-group">
                        <label htmlFor="shortTitle">Title:</label>
                    
                    <textarea 
                        id="shortTitle"
                        placeholder="Enter ticket title (Limit: 60 characters)" 
                        value={shortTitle} 
                        onChange={(e) => setShortTitle(e.target.value)} 
                        required 
                        maxLength={60}
                    />
                </div>
            </div>
            <div className="form-row full-width">
            <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        id="description"
                        placeholder="Enter ticket description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                {/* </div> */}
            </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select id="status" value="open" disabled>
                        <option value="open">Open</option>
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="startTime">Issue Start Time:</label>
                    <input 
                        id="startTime"
                        type="datetime-local" 
                        value={startTime} 
                        onChange={(e) => setStartTime(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                <label htmlFor="images">Attach Images:</label>
                <input 
                    id="images"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                />
            </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="segment">Segment:</label>
                    <select 
                        id="segment"
                        value={segment}
                        onChange={(e) => setSegment(e.target.value)}
                        required
                    >
                        <option value="">Select a segment</option>
                        <option value="Production System">Production System</option>
                        <option value="Data & Infrastructure">Data & Infrastructure</option>
                        <option value="Reservoir Performance">Reservoir Performance</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="client">Client:</label>
                    <select 
                        id="client"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        required
                    >
                        <option value="">Select a client</option>
                        <option value="Reliance">Reliance</option>
                        <option value="OIL">OIL</option>
                        <option value="ONGC">ONGC</option>
                        <option value="Cairn Oil & Gas Vedanta Ltd.">Cairn Oil & Gas Vedanta Ltd.</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="project">Project:</label>
                    <select 
                        id="project"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        required
                    >
                        <option value="">Select a project</option>
                        <option value="E&P Data Bank">E&P Data Bank</option>
                        <option value="DM Project">DM Project</option>
                        <option value="Project C">Project C</option>
                    </select>
                </div>
            </div>
                <div className="search-container">
                        <label htmlFor="search">Search by Title:</label>
                        <input 
                            type="text" 
                            id="Search..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            placeholder="Enter title to search"
                        />
                        <button onClick={handleSearchClick}><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                    {searchResults.length > 0 && (
                            <div className="search-results">
                            <label htmlFor="search">Search Results:</label>
                            <ul>
                                {searchResults.map(result => (
                                    <li key={result.id}>
                                        <span className="search-result-title">{result.title}</span>
                                        <span className="search-result-description">{result.description}</span>
                                    </li>
                                ))}
                            </ul>
                          </div>
                )}
            
            </div>
            
            {/* </div> */}
            <div className="form-actions">
                <button type="submit" className="submit-button">Create Ticket</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
           </div>
        </form>

    <Modal show={showModal} onHide={handleClose} centered>
    <Modal.Header closeButton>
    </Modal.Header>
    <Modal.Body>
      <img src={tickImage} alt="Success" style={{ width: '100px', display: 'block', margin: '0 auto' }} />
      <p className="text-center"><h5><strong>Congratulations!</strong></h5>Your ticket has been successfully generated.</p>
    </Modal.Body>
    <Modal.Footer className="justify-content-center">
      <Button variant="primary" style={{ backgroundColor: 'rgb(0, 20, 220)', borderColor: 'rgb(0, 20, 220)' }} onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
    </div>
);
}
export default TicketForm;