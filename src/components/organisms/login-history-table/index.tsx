import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(device: string, location: string, recent_activity: string, status: string) {
	return { device, location, recent_activity, status };
}

const rows = [
	createData(
		'Chrome/Windows 10',
		'Sarajevo, BiH, Bosnia and Herzegovina  ',
		'about 3 hours ago',
		'Logout'
	),
	createData('Chrome/Mobile Device', 'NewYork, NY, USA  ', '1 month ago', 'Logout'),
];

export default function LoginHistoryTable() {
	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ maxWidth: '100%' }}
				aria-label="simple table"
			>
				<TableHead>
					<TableRow>
						<TableCell>Browser/Device</TableCell>
						<TableCell align="left">Location</TableCell>
						<TableCell align="left">Recent Activity</TableCell>
						<TableCell align="left"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows?.map((row) => (
						<TableRow
							key={row?.device}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell
								component="th"
								scope="row"
								align="left"
							>
								{row?.device}
							</TableCell>
							<TableCell align="left"> {row?.location}</TableCell>
							<TableCell align="left">{row?.recent_activity}</TableCell>
							<TableCell
								align="left"
								className="text-primary"
							>
								{row?.status}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
