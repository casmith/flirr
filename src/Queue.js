import React from 'react';

function Queue({queue}) {
    return (
        <div>
            <label>Queue:
                <div>{queue.map(item => (<li>{item.filename}</li>))}</div>
            </label>
        </div>
        )
}

export default Queue;
