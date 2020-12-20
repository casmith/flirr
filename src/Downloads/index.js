import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Downloads.css';

const loadHistory = () => {
    return axios.get('/api/history')
        .then((response) => response.data)
        .catch((error) => console.error(error))
}





function Downloads({queue}) {
    const [history, setHistory] = useState([]);

    const reloadHistory = () => {
        return loadHistory()
            .then(history => {
    
                console.log(history)
                setHistory(history.slice(0, 50)); // last 50
                // setHistory(q.servers
                //     .flat()
                //     .reduce((acc, item) => {
                //         item.requests.forEach(r => acc.push({nick: item.nick, filename: r.request, status: r.status}))
                //         return acc;
                //     }, []));
            })
            .catch(e => console.error(e));
    }
    useEffect(() => {
        reloadHistory();
        const interval = setInterval(() => {
            reloadHistory();
        }, 5000);
        return () => {clearInterval(interval);};
    }, []);

    return (
        <div>
            <h2>Queue: </h2>
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

            <h2>History:</h2>
            <table>
                <tr>
                    <th>Nick</th>
                    <th>Filename</th>
                </tr>
                <tbody>
                {history.map(item => (
                    <tr>
                        <td>{item.nick}</td>
                        <td>{item.filename}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}

export default Downloads;
