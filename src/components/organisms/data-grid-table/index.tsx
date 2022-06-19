import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
	{ field: 'username', headerName: 'username', width: 270 },
	{ field: 'role', headerName: 'role', width: 230 },
	{ field: 'status', headerName: 'status', width: 230 },
	{
		field: 'join_date',
		headerName: 'join date',
		type: 'number',
		width: 190,
	},
	{
		field: 'score',
		headerName: 'score',
		description: 'This column has a value getter and is not sortable.',
		width: 260,
	},
	{
		field: 'activity',
		headerName: '',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 260,
	},
];

const rows = [
	{
		id: 1,
		username: 'sifat',
		role: 'Technician',
		status: 'Active',
		join_date: '1 march 2022',
		score: 4.5,
		activity: <>3 minutes ago</>,
	},
	{
		id: 2,
		username: 'sifat',
		role: 'Technician',
		status: 'Active',
		join_date: '1 march 2022',
		score: 4.5,
		activity: <>3 minutes ago</>,
	},
	{
		id: 3,
		username: 'sifat',
		role: 'Technician',
		status: 'Active',
		join_date: '1 march 2022',
		score: 4.5,
		activity: <>3 minutes ago</>,
	},
	{
		id: 4,
		username: 'kamal',
		role: 'user',
		status: 'Active',
		join_date: '1 march 2022',
		score: 4.5,
		activity: <>3 minutes ago</>,
	},
	{
		id: 5,
		username: 'mijan',
		role: 'user',
		status: 'active',
		join_date: '1 march 2022',
		score: 4.5,
		activity: <>3 minutes ago</>,
	},
];

export default function DataTable() {
	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
			/>
		</div>
	);
}
