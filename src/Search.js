import React, { useState } from 'react';
import axios from 'axios';

function Search({handleEnqueue}) {
    const [results, setResults] = useState([]);
    const [users, setUsers] = useState([]);
    const [keywords, setKeywords] = useState("");
    const [inProgress, setInProgress] = useState(false);

    const search = (keywords) => {
        setInProgress(true);
        setResults([])
        return axios.get('/api/search?keywords=' + keywords)
            .then((response) => response.data)
            .then((searchResults) => axios.get('/api/server/users')
                .then(response => ([searchResults, response.data])))
            .catch((error) => {
                console.error(error);
                return [];
            })
            .finally(results => {
                setInProgress(false)
                return results;
            });
    }
    
    const submitSearch = (e) => {
        e.preventDefault();
        return search(keywords).then((response) => {
            const [results, users] = response;
            setUsers(users);
            setResults(results);
        });
    }

    const enqueue = (result) => handleEnqueue(result)

    return (
        <form onSubmit={submitSearch}>
            <label>Search:
                <input name="search" onChange={e => setKeywords(e.target.value)}></input>
                <input type="submit" value="Submit" />
            </label>
            <h2>Results</h2>
            {inProgress && (<div>Searching...</div>)}
            <div>
            {!inProgress && (!!results.length || (<div>No search results</div>))}
            {results.map((result, i) => (
                <div key={i}>{result.tracks[0].nick}{users.includes(result.tracks[0].nick) || ' (Offline)'} {result.album} {result.filename} <button onClick={() => enqueue(result)}>Enqueue</button>
                {result.tracks.map(track => (
                    <div>{track.filename}</div>
                ))}
                </div>))}
            </div>
        </form>
    )
}

export default Search;
