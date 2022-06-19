import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// interface Column {
//   id: "title" | "domain" | "dueDate" | "progress";
//   label: string;
//   minWidth?: number;
//   align?: "right";
//   // format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: "title", label: "Title", minWidth: 170 },
//   { id: "domain", label: "Domain", minWidth: 100 },
//   {
//     id: "dueDate",
//     label: "Due Date",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "progress",
//     label: "Progress",
//     minWidth: 170,
//     align: "right",
//   },
// ];

export default function StickyHeadTable({ data, columns }: { data: any; columns: any }) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const date = new Date();

	const rows = [
		{
			id: 1,
			title: 'Washing machine repairment',
			domain: 'code cover',
			dueDate: date.toLocaleDateString(),
			progress: 'complete',
		},
		{
			id: 2,
			title: 'Washing machine repairment',
			domain: 'code cover',
			dueDate: date.toLocaleDateString(),
			progress: 'complete',
		},
		{
			id: 3,
			title: 'Washing machine repairment',
			domain: 'code cover',
			dueDate: date.toLocaleDateString(),
			progress: 'complete',
		},
		{
			id: 4,
			title: 'Washing machine repairment',
			domain: 'code cover',
			dueDate: date.toLocaleDateString(),
			progress: 'complete',
		},
	];

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table
					stickyHeader
					aria-label="sticky table"
				>
					<TableHead>
						<TableRow>
							{columns.map((column: any) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row: any) => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row.id}
									>
										{columns.map((column: any) => {
											const value = row[column.id];
											return (
												<TableCell
													key={column.id}
													align={column.align}
												>
													{value}
													{/* {column.format && typeof value === "number"
                            ? column.format(value)
                            : value} */}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
