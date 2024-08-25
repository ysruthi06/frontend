import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(jsonInput);
      const result = await axios.post('https://flask-app-hyvz.onrender.com/bfhl', data);
      setResponse(result.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Invalid JSON input');
    }
  };

  const handleSelectChange = (event) => {
    const { options } = event.target;
    const selected = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;
    const { alphabets, numbers, highest_lowercase_alphabet } = response;

    return (
      <div>
        {selectedOptions.includes('Alphabets') && <div><h3>Alphabets</h3><p>{alphabets.join(', ')}</p></div>}
        {selectedOptions.includes('Numbers') && <div><h3>Numbers</h3><p>{numbers.join(', ')}</p></div>}
        {selectedOptions.includes('Highest lowercase alphabet') && <div><h3>Highest Lowercase Alphabet</h3><p>{highest_lowercase_alphabet.join(', ')}</p></div>}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>JSON Input</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON data here'
        rows="5"
        cols="50"
      />
      <button onClick={handleSubmit}>Submit</button>

      <h2>Select Response Options:</h2>
      <select multiple={true} onChange={handleSelectChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>

      <h2>Response:</h2>
      {renderResponse()}
    </div>
  );
}

export default App;
