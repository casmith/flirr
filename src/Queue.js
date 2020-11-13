import React from 'react';
import './Queue.css'

function Queue({queue}) {
    return (
        <div>
            <label>Queue:
                <table>
                    <tr>
                        <th>Nick</th>
                        <th>Filename</th>
                    </tr>
                    <tbody>
                    {queue.map(item => (
                        <tr>
                            <td>{item.nick}</td>
                            <td>{item.filename}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </label>
        </div>
        )
}

export default Queue;
