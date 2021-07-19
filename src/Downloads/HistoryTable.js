import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import HistoryRow from './HistoryRow';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

const HistoryTable = ({rows}) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table size="small" className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="left">Nick</TableCell>
                    <TableCell align="left">Filename</TableCell>
                    <TableCell align="right">Completed</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (<HistoryRow row={row} />))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default HistoryTable;