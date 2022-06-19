import Dropdown from '@atoms/drop-down';
import Label from '@atoms/label';
import { Avatar } from '@mui/material';
import { format } from 'date-fns';
import Link from 'next/link';
import { HiOutlineDotsVertical } from 'react-icons/hi';

export default function ProductionList() {
	return (
		<div>
			<table
				className="w-full p-8 text-base font-sans"
				// css={css`
				//   padding: 32px;
				//   font-size: 1rem;
				//   font-family: sans-serif;
				//   tr td,
				//   tr th {
				//     padding: 0.8rem 1rem;
				//     border-bottom: 1px solid #ddd;
				//   }
				// `}
			>
				<thead>
					<tr className="text-left border-b">
						<th className="py-3 px-4">User name</th>
						<th className="py-3 px-4">Project name</th>
						<th className="py-3 px-4">Service providers</th>
						<th className="py-3 px-4">Deadline</th>
						<th className="py-3 px-4">Completed</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{/* {data.map((item) => ( */}
					<tr className="text-left border-b">
						<td className="py-3 px-4">
							<div className="flex items-center space-x-4">
								<Avatar classes={{ root: 'w-8 h-8' }} />
								<Label
									value="Name"
									className="text-gray-700 font-lato text-base md:text-xl my-4"
								/>
							</div>
						</td>
						<td className="py-3 px-4">Project name</td>
						<td className="py-3 px-4">
							<div className="flex items-center">
								<Avatar classes={{ root: 'w-8 h-8 -ml-2' }} />
								<Avatar classes={{ root: 'w-8 h-8 -ml-2' }} />
								<Avatar classes={{ root: 'w-8 h-8 -ml-2' }} />
								<Label
									value="+32"
									className="text-gray-700 text-base md:text-xl font-lato my-4 ml-1"
								/>
							</div>
						</td>
						<td className="py-3 px-4">{format(new Date(), 'MM/dd/yyyy')}</td>
						<td className="py-3 px-4">Status</td>
						<td className="py-3 px-4">
							<div className="space-x-2 flex items-center">
								<Link href="/">
									<a className="bg-primary text-white px-4 shadow rounded whitespace-nowrap tracking-normal font-lato text-sm md:text-base py-1 transform-none">
										Track order
									</a>
								</Link>
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
