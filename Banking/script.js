async function requestResources() {
    const processId = document.getElementById("processId").value;
    const resource1 = document.getElementById("resource1").value;
    const resource2 = document.getElementById("resource2").value;
    const resource3 = document.getElementById("resource3").value;

    try {
        const response = await fetch('http://localhost:9000/api/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                processId: parseInt(processId),
                resourcesRequested: [parseInt(resource1), parseInt(resource2), parseInt(resource3)]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to request resources.');
        }

        const data = await response.json();
        showMessage(data.message, 'alert-success');
    } catch (error) {
        console.error('Error requesting resources:', error);
        showMessage('Error requesting resources: ' + error.message, 'alert');
    }
}

async function releaseResources() {
    const processId = document.getElementById("releaseProcessId").value;
    const release1 = document.getElementById("release1").value;
    const release2 = document.getElementById("release2").value;
    const release3 = document.getElementById("release3").value;

    try {
        const response = await fetch('http://localhost:9000/api/release', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                processId: parseInt(processId),
                resourcesReleased: [parseInt(release1), parseInt(release2), parseInt(release3)]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to release resources.');
        }

        const data = await response.json();
        showMessage(data.message, 'alert-success');
    } catch (error) {
        console.error('Error releasing resources:', error);
        showMessage('Error releasing resources: ' + error.message, 'alert');
    }
}

function showMessage(message, className) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = "alert " + className;
}
