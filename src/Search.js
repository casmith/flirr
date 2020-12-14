import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';

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
            <TextField id="standard-search" label="Search field" type="search" onChange={e => setKeywords(e.target.value)} />
            <h2>Results</h2>
            {inProgress && (<div>Searching...</div>)}
            <div>
            {!inProgress && (!!results.length || (<div>No search results</div>))}
            {results.map((result, i) => (
                <div key={i}>{users.includes(result.tracks[0].nick) ? <PersonIcon color="primary" /> : <PersonIcon color="disabled" />}{result.tracks[0].nick} {result.album} {result.filename} <Button variant="contained" color="primary" onClick={() => enqueue(result)}>Enqueue</Button>
                {result.tracks.map(track => (
                    <div>{track.filename}</div>
                ))}
                </div>))}
            </div>
        </form>
    )
}

export default Search;
