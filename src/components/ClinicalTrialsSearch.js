import React, { useState } from 'react';

const ClinicalTrialsSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.clinicaltrials.gov/v1/search?term=${searchTerm}`
      );
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setResults(data.trials || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Clinical Trials Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search term"
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {results.map((trial, index) => (
          <div key={index} className="trial">
            <h2>{trial.name}</h2>
            <p>{trial.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicalTrialsSearch;
