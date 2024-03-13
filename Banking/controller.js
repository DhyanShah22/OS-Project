let availableResources = [];
let allocatedResources = [];
let maxNeededResources = [];

const requestResource = async (req, res) => {
    const { processId, resourcesRequested } = req.body; 

    try {

        console.log("Resources requested:", resourcesRequested)

        if (!Array.isArray(resourcesRequested)) {
            throw new Error('Requested resources must be an array.');
        }

        if (processId < 0 || processId >= allocatedResources.length) {
            throw new Error('Invalid processId.');
        }

        for (let i = 0; i < resourcesRequested.length; i++) {
            if(resourcesRequested[i] > maxNeededResources[processId][i]) {
                throw new Error('Requested resources exceed maximum resources.');
            }
        }

        for(let i = 0; i < resourcesRequested.length; i++) {
            if (resourcesRequested[i] > availableResources[i]) {
                throw new Error('Requested resource exceeds available resources.');
            }
        }

        for(let i = 0; i < resourcesRequested.length; i++) {
            allocatedResources[processId][i] += resourcesRequested[i];
            availableResources[i] -= resourcesRequested[i];
        }

        return res.status(200).json({ message: 'Successfully requested resources.' });
        
    } catch (error) {
        console.log(`Error in requesting resource: ${error}`);
        return res.status(400).json({ error: error.message });
    }
}


const releaseResource = async(req, res) => {
    const { processId, resourcesReleased } = req.body;

    try {

        console.log("Resources released:", resourcesReleased)


        if (!resourcesReleased || !Array.isArray(resourcesReleased)) {
            throw new Error('Invalid or missing resourcesReleased data.');
        }

        if (resourcesReleased.length !== availableResources.length) {
            throw new Error('Number of released resources does not match the expected length.');
        }
        
        for (let i = 0; i < resourcesReleased.length; i++) {
            if (resourcesReleased[i] > allocatedResources[processId][i]) {
                throw new Error('Released resources exceed allocated resources.');
            }
        }

        // Release resources
        for (let i = 0; i < resourcesReleased.length; i++) {
            allocatedResources[processId][i] -= resourcesReleased[i];
            availableResources[i] += resourcesReleased[i];
        }

        return res.status(200).json({ message: 'Resources released successfully.' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const setResources = (req, res) => {
    const { available, allocated, maxNeeded } = req.body;

    availableResources = available;
    allocatedResources = allocated;
    maxNeededResources = maxNeeded;

    return res.status(200).json({ message: 'Resources set successfully.' });
}

module.exports = {
    requestResource,
    releaseResource,
    setResources
}
