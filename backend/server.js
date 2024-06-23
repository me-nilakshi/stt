const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.json())

app.use(cors())
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "854301",
    database: "ticketing_tool"
})

//handles post request for login page
app.post('/', (req, res) => {
    const sql = "SELECT * FROM register WHERE email = ? AND password = ?"

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) return res.json("ERROR")
        if(data.length > 0) {
            return res.json("Login Successful")
        } else {
            return res.json("No Record Found")
        }
    })
})


//handles post requests for register page
app.post('/register', (req, res) => {

    const sql = "INSERT INTO register (name, email, password) Values(?,?,?)";

    db.query(sql, [req.body.name, req.body.email, req.body.password], (err, data) => {
        if(err) return res.json("ERROR")
        return res.json(data);

    });

});

//handles post requests for ticket-form page 
app.post('/ticket_form', (req, res) => {

    const { user_id, ticketType, queryOption, issueOption, shortTitle, description, priority, startTime, status, segment, project, client } = req.body;

    // Determine the values of queryOption and issueOption based on ticketType
    let finalQueryOption = null;
    let finalIssueOption = null;

    if (ticketType === 'Query') {
        finalQueryOption = queryOption;
    } else if (ticketType === 'Issue') {
        finalIssueOption = issueOption;
    }
    const sql = "INSERT INTO ticket_form (user_id, ticket_type, query_option, issue_option, short_title, description, priority, start_time, status, segment, project, client) Values(?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [user_id, ticketType, finalQueryOption, finalIssueOption, shortTitle, description, priority, startTime, status, segment, project, client], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.json({ error: "An error occurred" });
        }
        return res.json({ success: true, data });
    });


});

// handles post request for admin page
app.get('/ticket_form', (req, res) => {
    const sql = "SELECT * FROM ticket_form";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching tickets:', err);
            return res.json({ error: "An error occurred while fetching tickets" });
        }
        else res.json(data)
    });
});

// Handle GET request for TicketDetails page
app.get('/ticket_form/:id', (req, res) => {
    const ticketId = req.params.id;
    const sql = "SELECT * FROM ticket_form WHERE id = ?";
    db.query(sql, [ticketId], (err, data) => {
        if (err) {
            console.error('Error fetching ticket details:', err);
            return res.json({ error: "An error occurred while fetching ticket details" });
        }
        if (data.length === 0) {
            return res.json({ error: "No ticket found with the given ID" });
        }
        return res.json(data[0]);
    });
});

// Handles GET request for searching related tickets
app.get('/search_tickets', (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
        return res.status(400).json({ error: "Keyword query parameter is required" });
    }

    const sql = `
        SELECT * FROM ticket_form
        WHERE short_title LIKE ? OR description LIKE ?
    `;
    const likeKeyword = `%${keyword}%`;

    db.query(sql, [likeKeyword, likeKeyword], (err, data) => {
        if (err) {
            console.error('Error searching tickets:', err);
            return res.json({ error: "An error occurred while searching tickets" });
        }
        res.json(data);
    });
});


app.post('/ticket/update', (req, res) => {
    const { id, status, priority } = req.body;

    if (!id || !status || !priority) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `
        UPDATE ticket_form 
        SET status = ?, priority = ? 
        WHERE id = ?
    `;

    db.query(sql, [status, priority, id], (err, result) => {
        if (err) {
            console.error('Error updating ticket:', err);
            return res.status(500).json({ error: 'Failed to update ticket' });
        }
        res.status(200).json({ success: true });
    });
});

app.listen(8081, () => {
    console.log("Listening..")
})