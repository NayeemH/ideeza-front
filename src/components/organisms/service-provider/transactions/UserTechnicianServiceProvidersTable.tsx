import Button from '@atoms/button';
import CheckboxAtom from '@atoms/checkbox';
import Dropdown from '@atoms/drop-down';
import Label from '@atoms/label';
import SearchInput from '@molecules/search-input';
import GenericTable from '@organisms/generic-table';
import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';

interface UserTechnicianServiceProvidersTableProps {
	setDispute?: (e?: any) => void;
}

const UserTechnicianServiceProvidersTable: React.FC<UserTechnicianServiceProvidersTableProps> = ({
	setDispute,
}) => {
	return (
		<>
			<div className="bg-white rounded-xl p-4">
				<div className="md:flex justify-between mb-4">
					<Label
						value="Manage Users, Technicians & Service Providers"
						className="text-lg md:text-[22px] font-bold"
					/>
					<div className=" flex items-center">
						<SearchInput />
						<Button
							value="Download invoices"
							className="text-xs md:text-lg text-white bg-primary"
						/>
						<AiFillSetting className="text-3xl text-gray-400 ml-3" />
					</div>
				</div>

				<GenericTable
					headers={['checkbox', 'Date', 'Type', 'User', 'Amount', '']}
					rows={[
						{
							id: 1,
							checkbox: <CheckboxAtom />,
							Date: '12/12/20',
							Description: 'nothing special',
							Type: 'Refund',
							User: 'Alisa Norman',
							Amount: '$12090',
							'': (
								<Dropdown
									mainClass="p-0 md:p-auto"
									icons={
										<BiDotsVerticalRounded className="text-2xl text-gray-800 relative" />
									}
									itemsClasses={{
										root: 'font-sans px-3 md:py-1 hover:text-current text-gray-700',
									}}
									options={[
										{
											name: 'Open a Dispute',
											value: 'Open a Dispute',
											func: setDispute,
										},
										{
											name: 'Download invoice',
											value: 'Download invoice',
										},
									]}
								/>
							),
						},

						{
							id: 2,
							checkbox: <CheckboxAtom />,
							Date: '12/12/20',
							Description: 'nothing special',
							Type: 'Refund',
							User: 'Alisa Norman',
							Amount: '$12090',
							'': (
								<Dropdown
									mainClass="p-0 md:p-auto"
									icons={
										<BiDotsVerticalRounded className="text-2xl text-gray-800 relative" />
									}
									itemsClasses={{
										root: 'font-sans px-3 md:py-1 hover:text-current text-gray-700',
									}}
									options={[
										{
											name: 'Open a Dispute',
											value: 'Open a Dispute',
											func: setDispute,
										},
										{
											name: 'Download invoice',
											value: 'Download invoice',
										},
									]}
								/>
							),
						},
						{
							id: 3,
							checkbox: <CheckboxAtom />,
							Date: '12/12/20',
							Description: 'nothing special',
							Type: 'Refund',
							User: 'Alisa Norman',
							Amount: '$12090',
							'': (
								<Dropdown
									mainClass="p-0 md:p-auto"
									icons={
										<BiDotsVerticalRounded className="text-2xl text-gray-800 relative" />
									}
									itemsClasses={{
										root: 'font-sans px-3 md:py-1 hover:text-current text-gray-700',
									}}
									options={[
										{
											name: 'Open a Dispute',
											value: 'Open a Dispute',
											func: setDispute,
										},
										{
											name: 'Download invoice',
											value: 'Download invoice',
										},
									]}
								/>
							),
						},
					]}
				/>
			</div>
		</>
	);
};

export default UserTechnicianServiceProvidersTable;
