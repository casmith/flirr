import React, { useState } from 'react';
import axios from 'axios';

function Search({handleEnqueue}) {
    const [results, setResults] = useState([]);
    const [keywords, setKeywords] = useState("");

    const search = (keywords) => {
        return axios.get('/api/search?keywords=' + keywords)
            .then((response) => response.data)
            .catch((error) => {
                console.error(error);
                setResults([]);
            });
    }
    
    const submitSearch = (e) => {
        e.preventDefault();
        return search(keywords).then((results) => setResults(results));
    }

    const enqueue = (result) => handleEnqueue(result)

    return (
        <form onSubmit={submitSearch}>
            <label>Search:
                <input name="search" onChange={e => setKeywords(e.target.value)}></input>
                <input type="submit" value="Submit" />
            </label>
            <h2>Results</h2>
            <div>
            {results.map((result, i) => (
                <div key={i}>{result.tracks[0].nick} {result.album} {result.filename} <button onClick={() => enqueue(result)}>Enqueue</button>
                {result.tracks.map(track => (
                    <div>{track.filename}</div>
                ))}
                </div>))}
            </div>
        </form>
    )
}

export default Search;
