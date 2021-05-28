import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DoneIcon from '@material-ui/icons/Done';
import GetAppIcon from '@material-ui/icons/GetApp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import RowDetails from './RowDetails';

function DownloadIcon(props) {
    const {row} = props;
    if (!row.queued) {
        return (<GetAppIcon onClick={row.enqueue} color="primary" />);
    } else {
        return (<DoneIcon color="primary"/>);
    }
}

function ResultRow({ row, users }) {
    const [open, setOpen] = React.useState(false);
    return (<>
        <TableRow key={row.name}>
            <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell align="left">
                {users.includes(row.tracks[0].nick) ? <PersonIcon color="primary" /> : <PersonIcon color="disabled" />}
                {row.nick}
            </TableCell>
            <TableCell align="left">{row.album}</TableCell>
            <TableCell align="right">{row.tracks.length}</TableCell>
            <TableCell align="right">
                <DownloadIcon row={row} />
            </TableCell>
        </TableRow>
        <RowDetails row={row} open={open}></RowDetails>
    </>);
}

export default ResultRow;