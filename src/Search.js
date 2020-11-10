import React, { useState } from 'react';

const exampleResults = [
    {nick: 'someguy', filename: '01 - name of the song.mp3', artist: 'Starving Musician', album: 'Self Titled', song: 'Title Track'}
];

function Search({handleEnqueue}) {
    const [results, setResults] = useState([]);
    const [keywords, setKeywords] = useState("");
    

    const search = (keywords) => {
        const localResults = exampleResults
            .filter(candidate => candidate.filename.includes(keywords))
        return Promise.resolve(localResults);
    }
    
    const submitSearch = (e) => {
        e.preventDefault();
        search(keywords)
        .then((results) => setResults(results));
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
                {results.map((result, i) => (<div key={i}>result: {result.filename} <button onClick={() => enqueue(result)}>Enqueue</button></div>))}
            </div>
        </form>
    )
}

export default Search;
