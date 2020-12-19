import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';
import React, { useState } from 'react';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function TracksRow({row, open}) {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
              Tracks
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Filename</TableCell>
                  <TableCell>Info</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.tracks.map((track) => (
                  <TableRow key={track.filename}>
                    <TableCell component="th" scope="row">
                      {track.filename}
                    </TableCell>
                    <TableCell>{track.info}</TableCell>                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

function Row({row, users}) {
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
        <GetAppIcon onClick={row.enqueue} color="primary" />
      </TableCell>
    </TableRow>
    <TracksRow row={row} open={open}></TracksRow>
  </>);
}

function ResultsTable({rows, users}) {
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
            {rows.map((row) => (<Row row={row} users={users} />))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

function Search({handleEnqueue}) {
    const [users, setUsers] = useState([]);
    const [keywords, setKeywords] = useState("");
    const [inProgress, setInProgress] = useState(false);
    const [rows, setRows] = useState([]);

    const search = (keywords) => {
        setInProgress(true);
        setRows([]);
        return axios.get('/api/search?keywords=' + keywords)
            .then((response) => response.data)
            .then((searchResults) => axios.get('/api/server/users')
                .then(response => ([searchResults, response.data])))
            .catch((error) => {
                console.error(error);
                return [];
            })
            .finally(results => {
                setInProgress(false)
                setRows([]);
                return results;
            });
    }
    
    const submitSearch = (e) => {
        e.preventDefault();
        return search(keywords).then((response) => {
            const [results, users] = response;
            setUsers(users);
            console.log(results);
            setRows(results.map(result => { 
                const parts = result.album.split("\\");
                const album = parts.slice(parts.length - 3, parts.length -1).join("\\") || result.album;
                return {nick: result.nick, album, tracks: result.tracks, enqueue: () => enqueue(result)};
            }));
        });
    }

    const enqueue = (result) => handleEnqueue(result)

    return (
        <form onSubmit={submitSearch}>
            <TextField id="standard-search" label="Search field" type="search" onChange={e => setKeywords(e.target.value)} />
            <h2>Results</h2>
            {inProgress && (<div>Searching...</div>)}
            {!inProgress && (!!rows.length || (<div>No search results</div>))}
            {(!inProgress && !!rows.length) && (<ResultsTable rows={rows} users={users} />)}
        </form>
    )
}

export default Search;
