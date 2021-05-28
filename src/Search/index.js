import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React, { useState } from 'react';
import ResultsTable from './ResultsTable';

function Search({handleEnqueue}) {
    const [users, setUsers] = useState([]);
    const [keywords, setKeywords] = useState("");
    const [inProgress, setInProgress] = useState(false);
    const [rows, setRows] = useState([]);

    const search = (keywords) => {
        setInProgress(true);
        setRows([]);
        return axios.get('/api/search?keywords=' + keywords)
            .then((response) => response.data)
            .then((searchResults) => axios.get('/api/server/users')
                .then(response => ([searchResults, response.data])))
            .catch((error) => {
                console.error(error);
                return [[], []];
            })
            .finally(results => {
                setInProgress(false)
                setRows([]);
                return results;
            });
    }
    
    const submitSearch = (e) => {
        e.preventDefault();
        return search(keywords).then((response) => {
            const [results, users] = response;
            setUsers(users);
            setRows(results.map(result => { 
                const album = result.album;
                const tracks = result.tracks.map(track => {
                    // enqueue a single track
                    track.enqueue = () => {
                        track.queued = true;
                        enqueue({tracks: [track]});
                    }
                    return track;
                })
                return {
                    nick: result.nick, 
                    album, 
                    tracks,
                    // enqueue the whole album
                    enqueue: () => {
                        result.queued = true;
                        enqueue(result);
                    }
                };
            }));
        });
    }

    const enqueue = (result) => handleEnqueue(result)

    return (
        <form onSubmit={submitSearch}>
            <TextField id="standard-search" label="Search field" type="search" onChange={e => setKeywords(e.target.value)} />
            <h2>Results</h2>
            {inProgress && (<div>Searching...</div>)}
            {!inProgress && (!!rows.length || (<div>No search results</div>))}
            {(!inProgress && !!rows.length) && (<ResultsTable rows={rows} users={users} />)}
        </form>
    )
}

export default Search;
