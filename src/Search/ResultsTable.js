import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import ResultRow from './ResultRow';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

const ResultsTable = ({rows, users}) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="left">Nick</TableCell>
                    <TableCell align="left">Album</TableCell>
                    <TableCell align="right">Tracks</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (<ResultRow row={row} users={users} />))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ResultsTable;