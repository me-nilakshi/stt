import React from 'react';

function Dashboard() {
return (

<div className="dashboard-container" style={{ padding: '0' }}>
    <header className="dashboard-header">
        <h1 style={{marginBottom:'0px'}}>Ticket Summary</h1>
    </header>
    <iframe
        title="ticket_tool"
        width="1470"
        height="650"
        src="https://app.powerbi.com/reportEmbed?reportId=a4a10f30-2af2-4fbf-93d3-21f1dcead5ba&autoAuth=true&ctid=41ff26dc-250f-4b13-8981-739be8610c21&filterPaneEnabled=false&navContentPaneEnabled=false"
        frameBorder="0"
        allowFullScreen="true"
        style={{ margin: '0' }}
    />
</div>
);
}
export default Dashboard;