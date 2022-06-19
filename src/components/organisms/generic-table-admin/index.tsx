import CheckboxAtom from '@atoms/checkbox';
// import Dropdown from '@atoms/drop-down';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import TableRowCheckbox from '@molecules/table-row-checkbox';
// import { BiDotsVerticalRounded } from 'react-icons/bi';
import UiEmptyPlaceholder from '@molecules/ui-empty-placeholder';

const AdminGenericTable: React.FC<any> = ({
	rowClicked = '/service-provider/dashboard/task',
	headers = [
		'checkbox',
		'Project',
		'Domain',
		'Assigned_to',
		'TimeLine',
		'Task_Status',
		'Notifications',
		'ellipsis',
	],
	rows,
	// rows = [
	// 	{
	// 		id: 1,
	// 		checkbox: <CheckboxAtom />,
	// 		Project: 'simple project man',
	// 		Domain: 'all',
	// 		Assigned_to: 'everyone',
	// 		TimeLine: 'all',
	// 		Task_Status: 'all',
	// 		Notifications: 'all',
	// 		ellipsis: '',
	// 	},
	// ],
	tableHeaderClass,
	tableHeaderColor,
	setRow,
	setName,
	onClickOrder,
}) => {
	const router = useRouter();

	const [headerCheckboxChecked, setHeaderCheckboxChecked] = useState(false);

	return (
		<>
			{rows.length !== 0 ? (
				<TableContainer component={Paper}>
					<Table
						sx={{ minWidth: 650 }}
						aria-label="simple table"
					>
						<TableHead className={tableHeaderClass}>
							<TableRow sx={{ whiteSpace: 'nowrap' }}>
								{headers.map((header: any, index: number) =>
									header === 'checkbox' ? (
										<TableCell
											className="font-bold"
											align="center"
											key={index}
										>
											<CheckboxAtom
												onChange={() =>
													setHeaderCheckboxChecked((prev) => !prev)
												}
											/>
											{/* <input type="checkbox" onChange={handleHeaderCheckbox} /> */}
										</TableCell>
									) : header === 'ellipsis' ? (
										<TableCell
											className="font-bold"
											align="center"
											key={index}
										></TableCell>
									) : (
										<TableCell
											className={
												'font-semibold text-[18px] ' + tableHeaderColor
											}
											align="left"
											key={index}
											onClick={() => onClickOrder(header)}
											style={{ cursor: 'pointer' }}
										>
											{/* {header.split('_').join(' ').toUpperCase()} */}
											{header.split('_').join(' ').toUpperCase()}
										</TableCell>
									)
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row: any, index: number) => (
								<TableRow
									// key={row?.Project?.id}
									key={index}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}
									onClick={() => {
										setRow ? setRow(row?.id) : '';
										setName ? setName(row?.News_name) : '';
									}}
									className="cursor-pointer"
								>
									{headers.map((header: any, index: number) =>
										header === 'checkbox' ? (
											<TableCell
												key={index}
												align="center"
											>
												<TableRowCheckbox
													isParentChecked={headerCheckboxChecked}
												/>
											</TableCell>
										) : (
											<TableCell
												onClick={() =>
													header === 'ellipsis'
														? setRow
															? setRow(row?.id)
															: ''
														: router.push(`${rowClicked}/${row?.id}`)
												}
												key={index}
												align="left"
											>
												{typeof row[header] === 'string' ? (
													<div
														className=""
														dangerouslySetInnerHTML={{
															__html: row[header]?.slice(0, 100),
														}}
													></div>
												) : (
													row[header]
												)}
											</TableCell>
										)
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<UiEmptyPlaceholder
					title="No Item Found"
					description={'Please click Add Button to create a new one'}
				/>
			)}
		</>
	);
};

export default AdminGenericTable;
