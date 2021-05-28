import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import DoneIcon from '@material-ui/icons/Done';
import GetAppIcon from '@material-ui/icons/GetApp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function DownloadIcon(props) {
    const {track} = props;
    if (!track.queued) {
        return (<GetAppIcon onClick={track.enqueue} color="primary" />);
    } else {
        return (<DoneIcon color="primary"/>);
    }
}


function RowDetails({ row, open }) {
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
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.tracks.map((track) => (
                                    <TableRow key={track.filename}>
                                        <TableCell component="th" scope="row">
                                            {track.filename}
                                        </TableCell>
                                        <TableCell>{track.info}</TableCell>
                                        <TableCell>

                                            <DownloadIcon track={track} />
                                            
                                        </TableCell>
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

export default RowDetails;