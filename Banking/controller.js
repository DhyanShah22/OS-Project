let availableResources = [3, 3, 2]; 
let allocatedResources = [
    [0, 0, 1],
    [2, 1, 0],
    [1, 2, 1]
];
let maxNeededResources = [
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2]
];

const requestResource = async (req,res) => {
    const {processId, resourceRequested} = req.body 

    try {
        for (let i=0; i < resourceRequested.length; i++) {
            if(resourceRequested[i] > maxNeededResources[processId][i]) {
                throw new Error('Requested resources exceed maximum resources.')
            }
    }

    for(let i = 0; i < resourceRequested.length; i++) {
        if (resourceRequested[i] > availableResources[i]) {
            throw new Error('Requested resource exceeds available resources.')
        }
    }

    for(let i = 0; i < resourceRequested.length; i++) {
        allocatedResources[processId][i] += resourceRequested[i]
        availableResources[i] -= resourceRequested[i]
    }

    return res.status(200).json({message: 'Successfully requested resources.'})
        
    } catch (error) {
        console.log(`Error in requesting resource: ${error}`);
        return res.status(400).json({error: error.message })
    }
}

const releaseResource = async(req, res) => {
    const { processId, resourcesReleased } = req.body;

    try {
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


module.exports = {
    requestResource,
    releaseResource
}