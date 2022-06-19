import React from 'react';
import Pagination from '@molecules/pagination';
import ServiceProviderOrdersHeader from '@organisms/service-provider/service-provider-orders-header';
import Label from '@atoms/label';
import GenericTable from '@organisms/generic-table';
import CheckboxAtom from '@atoms/checkbox';
import { AiOutlineMore } from 'react-icons/ai';

const ServiceProviderOrders = () => {
	return (
		<div>
			<Label
				value="Orders"
				className="text-3xl text-primary font-bold my-10"
			/>
			<div className="bg-white rounded-xl p-4">
				<ServiceProviderOrdersHeader />
				{/* <Table /> */}
				<GenericTable
					headers={[
						'checkbox',
						'Title',
						'Username',
						'Type',
						'Quantity',
						'Price',
						'Order_Status',
						'Start',
						'End',
						'',
					]}
					rows={[
						{
							id: 1,
							checkbox: <CheckboxAtom />,
							Title: 'Lamborgini',
							Username: 'John Doe',
							Type: 'all',
							Quantity: '2',
							Price: '$220',
							Order_Status: 'Opened',
							Start: '04/24/2018',
							End: '04/24/2018',
							'': <AiOutlineMore className="text-2xl text-gray-500" />,
						},
						{
							id: 2,
							checkbox: <CheckboxAtom />,
							Title: 'Lamborgini',
							Username: 'John Doe',
							Type: 'all',
							Quantity: '2',
							Price: '$220',
							Order_Status: 'Opened',
							Start: '04/24/2018',
							End: '04/24/2018',
							'': <AiOutlineMore className="text-2xl text-gray-500" />,
						},
						{
							id: 3,
							checkbox: <CheckboxAtom />,
							Title: 'Lamborgini',
							Username: 'John Doe',
							Type: 'all',
							Quantity: '2',
							Price: '$220',
							Order_Status: 'Opened',
							Start: '04/24/2018',
							End: '04/24/2018',
							'': <AiOutlineMore className="text-2xl text-gray-500" />,
						},
					]}
				/>
				<Pagination
					pager={10}
					handlePage={() => {
						('');
					}}
					mainClass="py-6"
				/>
			</div>
		</div>
	);
};

export default ServiceProviderOrders;
