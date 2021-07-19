import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

function HistoryRow({ row, users }) {
    const [open, setOpen] = React.useState(false);
    return (<>
        <TableRow key={row.name}>
            <TableCell align="left">{row.nick}</TableCell>
            <TableCell align="left">{row.filename}</TableCell>
            <TableCell>{new Date(row.timestamp).toLocaleDateString()} {new Date(row.timestamp).toLocaleTimeString()}</TableCell>
        </TableRow>
    </>);
}

export default HistoryRow;