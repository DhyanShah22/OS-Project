let requestQueue = [];

function addRequest(trackNumber) {
    requestQueue.push(trackNumber);
}

function SCAN(currentPosition, direction) {
    let sortedQueue = requestQueue.sort((a, b) => a - b);
    let result = [];
    
    if (direction === 'right') {
        let greater = sortedQueue.filter(req => req > currentPosition);
        let lesser = sortedQueue.filter(req => req < currentPosition).reverse();
        result = greater.concat(lesser);
    } else if (direction === 'left') {
        let lesser = sortedQueue.filter(req => req < currentPosition);
        let greater = sortedQueue.filter(req => req > currentPosition).reverse();
        result = lesser.concat(greater);
    } else {
        throw new Error('Invalid direction');
    }

    return result;
}

async function handleRequest(req, res) {
    try {
        const { currentPosition, direction, newRequests } = req.body;

        if (newRequests && Array.isArray(newRequests)) {
            newRequests.forEach(request => addRequest(request));
        }

        const result = SCAN(currentPosition, direction);

        result.forEach(track => {
            const index = requestQueue.indexOf(track);
            if (index !== -1) {
                requestQueue.splice(index, 1);
            }
        });

        res.json({ scheduledRequests: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handleRequest
}
