import axios from 'axios';
import React, { useState } from 'react';
import './Queue.css'

const loadQueue = () => {
    return axios.get('/api/queue')
        .then((response) => response.data)
        .catch((error) => console.error(error))
}

function Queue() {
    const [queue, setQueue] = useState([]);

    const reloadQueue = () => {
        return loadQueue()
            .then(q => {
                setQueue(q.servers
                    .flat()
                    .reduce((acc, item) => {
                        item.requests.forEach(r => acc.push({nick: item.nick, filename: r.request, status: r.status}))
                        return acc;
                    }, []));
            })
            .catch(e => console.error(e));
    }

    return (
        <div>
            <label>Queue: <button onClick={reloadQueue}>Reload</button>
                <table>
                    <tr>
                        <th>Nick</th>
                        <th>Filename</th>
                        <th>Status</th>
                    </tr>
                    <tbody>
                    {queue.map(item => (
                        <tr>
                            <td>{item.nick}</td>
                            <td>{item.filename}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </label>
        </div>
    )
}

export default Queue;
