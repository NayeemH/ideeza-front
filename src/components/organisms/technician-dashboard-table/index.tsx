import React, { useState } from 'react';
import { ITableData } from '@features/technician/dashboard';
import CheckboxAtom from '@atoms/checkbox';
import TableRowCheckbox from '@molecules/table-row-checkbox';
// { loading, data }: any
function TaskDashboardTable({ data }: { data: ITableData[] }) {
	const [headerCheckboxChecked, setHeaderCheckboxChecked] = useState(false);

	const isTimeover = (timeOver: boolean) => {
		if (timeOver) {
			return (
				<div className="space-x-1 flex items-center">
					<img
						src="/images/icon/time.png"
						alt="time"
						className="w-5"
					/>
				</div>
			);
		} else {
			return '';
		}
	};

	const selectedDomain = (domain: string) => {
		return (
			<div className="space-x-1 flex item-center opacity-50">
				{domain === 'electronic' ? (
					<img
						src="/images/icon/domain-type-first.svg"
						className="w-4"
						alt="image"
					/>
				) : (
					<img
						src="/images/icon/domain-type-first.svg"
						className="w-4"
						alt="image"
					/>
				)}
				{domain === 'code' ? (
					<img
						src="/images/icon/domain-type-slash-outline.svg"
						className="w-4"
						alt="image"
					/>
				) : (
					<img
						src="/images/icon/domain-type-slash-outline.svg"
						className="w-4"
						alt="image"
					/>
				)}
				{domain === 'cover' ? (
					<img
						src="/images/icon/domain-type-cube.svg"
						className="w-4"
						alt="image"
					/>
				) : (
					<img
						src="/images/icon/domain-type-cube.svg"
						className="w-4"
						alt="image"
					/>
				)}
			</div>
		);
	};

	return (
		<div className="overflow-x-auto">
			<table className="md:w-full  min-w-max">
				<thead className="border-b border-gray-200">
					<tr>
						<th className="p-3 text-left">
							<CheckboxAtom
								onChange={() => setHeaderCheckboxChecked((prev) => !prev)}
							/>
						</th>
						<th className="p-3 text-center md:pr-28">Title</th>
						<th className="p-3 text-left">Domain</th>
						<th className="p-3 text-center md:pr-28">Due Date</th>
						<th className="p-3 text-left">Progress</th>
						<th className="p-3 text-left"></th>
					</tr>
				</thead>
				<tbody>
					{data?.map((item, i) => (
						<tr
							key={i}
							className="border-b border-gray-200"
						>
							<td className="p-3">
								<TableRowCheckbox isParentChecked={headerCheckboxChecked} />
							</td>
							<td className="p-2">{item?.title || 'Washing Machine Repairment'}</td>
							<td className="p-2">{selectedDomain(item?.domain ?? '')}</td>
							<td className="p-2">{item?.date}</td>
							<td className="p-2">{item?.status?.split('_').join(' ')}</td>
							<td className="p-2">{isTimeover(item?.timeOver ?? false)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
export default TaskDashboardTable;
