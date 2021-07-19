import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Downloads.css';
import socketIOClient from "socket.io-client";
import MiddleEllipsis from "react-middle-ellipsis";
import HistoryTable from './HistoryTable';

const loadHistory = () => {
    return axios.get('/api/history')
        .then((response) => response.data)
        .catch((error) => console.error(error))
}

function Downloads({queue}) {
    const [history, setHistory] = useState([]);

    const reloadHistory = () => {
        return loadHistory()
            .then(history => setHistory(history.slice(0, 50))) // last 50
            .catch(e => console.error(e));
    }

    useEffect(() => {
        reloadHistory()
    }, []);

    useEffect(() => {
        const socket = socketIOClient();
        socket.on("history-updated", data => {
            setHistory(data.data.slice(0, 50))
        });
      }, []);


    return (
        <div>
            <h2>Queue: </h2>
            <table>
                <thead>
                    <tr>
                        <th>Nick</th>
                        <th>Filename</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {queue.map((item, i) => (
                    <tr key={i}>
                        <td>{item.nick}</td>
                        <td>{item.filename}</td>
                        <td>{item.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2>History:</h2>
            {(!!history.length) && (<HistoryTable rows={history}></HistoryTable>)}
            

        </div>
    )
}

export default Downloads;
