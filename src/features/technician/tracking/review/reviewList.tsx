import Dropdown from '@atoms/drop-down';
import { HiOutlineDotsVertical } from 'react-icons/hi';

export default function ReviewList() {
	return (
		<div>
			<table className="w-full py-8 font-sans">
				<thead>
					<tr className="text-left border-b">
						<th className="py-3 px-4">Reporter Name</th>
						<th className="py-3 px-4">Reported Name</th>
						<th className="py-3 px-4">Source</th>
						<th className="py-3 px-4">Review</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{/* {data.map((item) => ( */}
					<tr className="text-left border-b">
						<td className="py-3 px-4">Michael Scott</td>
						<td className="py-3 px-4">Michael Scott</td>
						<td className="py-3 px-4">Project</td>
						<td className="py-3 px-4">“Perfect innovative gift of my Dreams!”...</td>
						<td className="py-3 px-4">
							<div className="space-x-2 flex items-center">
								<Dropdown
									className="p-0"
									icons={
										<HiOutlineDotsVertical
											className={`text-3xl text-gray-500`}
										/>
									}
									itemsClasses={{
										root: ' text-sm md:text-base px-4 w-34 py-1 tracking-tight font-lato hover:text-current text-gray-700',
									}}
									options={[
										{
											name: `Open a Dispute`,
											value: 'Dispute',
										},
										{
											name: `Download Invoice`,
											value: 'Invoice',
										},
										{
											name: `Dispute Detail`,
											value: 'Detail',
										},
										{
											name: `Cancel Dispute`,
											value: 'Cancel',
										},
									]}
								/>
							</div>
						</td>
					</tr>
					{/* ))} */}
				</tbody>
			</table>
		</div>
	);
}
