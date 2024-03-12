import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import successImage from './success.png';
import failureImage from './failure.jpg';

function App() {
  const [request, setRequest] = useState({ processId: '', resource1: '', resource2: '', resource3: '' });
  const [release, setRelease] = useState({ processId: '', release1: '', release2: '', release3: '' });
  const [requestSuccess, setRequestSuccess] = useState('');
  const [releaseSuccess, setReleaseSuccess] = useState('');
  const [requestError, setRequestError] = useState('');
  const [releaseError, setReleaseError] = useState('');

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/api/request', {
        processId: request.processId,
        resourcesRequested: [parseInt(request.resource1), parseInt(request.resource2), parseInt(request.resource3)]
      });
      setRequestSuccess(`Process ${request.processId} - Success Requesting ${request.resource1} ${request.resource2} ${request.resource3}`);
      setRequestError('');
      setTimeout(() => setRequestSuccess(''), 5000); // Clear success message after 5 seconds
    } catch (error) {
      console.error('Error requesting resources:', error);
      setRequestError('Failed to request resources. Please try again.');
      setRequestSuccess('');
      setTimeout(() => setRequestError(''), 5000); // Clear error message after 5 seconds
    }
  };

  const handleReleaseSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/api/release', {
        processId: release.processId,
        resourcesReleased: [parseInt(release.release1), parseInt(release.release2), parseInt(release.release3)]
      });
      setReleaseSuccess(`Process ${release.processId} - Success Releasing ${release.release1} ${release.release2} ${release.release3}`);
      setReleaseError('');
      setTimeout(() => setReleaseSuccess(''), 5000); // Clear success message after 5 seconds
    } catch (error) {
      console.error('Error releasing resources:', error);
      setReleaseError('Failed to release resources. Please try again.');
      setReleaseSuccess('');
      setTimeout(() => setReleaseError(''), 5000); // Clear error message after 5 seconds
    }
  };

  return (
    <div className="container">
      <div className="request-section">
        <h2>Banker's Algorithm for Deadlock - Request Resources</h2>
        <form onSubmit={handleRequestSubmit}>
          <input type="text" placeholder="Process ID" value={request.processId} onChange={(e) => setRequest({ ...request, processId: e.target.value })} />
          <input type="text" placeholder="Resource 1" value={request.resource1} onChange={(e) => setRequest({ ...request, resource1: e.target.value })} />
          <input type="text" placeholder="Resource 2" value={request.resource2} onChange={(e) => setRequest({ ...request, resource2: e.target.value })} />
          <input type="text" placeholder="Resource 3" value={request.resource3} onChange={(e) => setRequest({ ...request, resource3: e.target.value })} />
          <button type="submit">Request</button>
        </form>
        {requestSuccess && <div className={`success success-green`}>{requestSuccess}</div>}
        {requestError && <div className={`error error-red`}>{requestError}</div>}
      </div>
      <div className="release-section">
        <h2>Banker's Algorithm for Deadlock - Release Resources</h2>
        <form onSubmit={handleReleaseSubmit}>
          <input type="text" placeholder="Process ID" value={release.processId} onChange={(e) => setRelease({ ...release, processId: e.target.value })} />
          <input type="text" placeholder="Resource 1" value={release.release1} onChange={(e) => setRelease({ ...release, release1: e.target.value })} />
          <input type="text" placeholder="Resource 2" value={release.release2} onChange={(e) => setRelease({ ...release, release2: e.target.value })} />
          <input type="text" placeholder="Resource 3" value={release.release3} onChange={(e) => setRelease({ ...release, release3: e.target.value })} />
          <button type="submit">Release</button>
        </form>
        {releaseSuccess && <div className={`success success-green`}>{releaseSuccess}</div>}
        {releaseError && <div className={`error error-red`}>{releaseError}</div>}
      </div>
      <div className="images">
        {requestSuccess && <img src={successImage} alt="Request Success" />}
        {requestError && <img src={failureImage} alt="Request Failure" />}
        {releaseSuccess && <img src={successImage} alt="Release Success" />}
        {releaseError && <img src={failureImage} alt="Release Failure" />}
      </div>
    </div>
  );
}

export default App;
