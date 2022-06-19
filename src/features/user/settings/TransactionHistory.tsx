import React, { useEffect, useState } from 'react';
import Pagination from '@molecules/pagination';
import TransactionTabs from '@molecules/transaction-tab';
import { TableContainer } from '@mui/material';
import BlogTableHeader from '@organisms/technician-blog-table-header';
import { paginateArray } from 'utils/utils';
import { useAppSelector } from 'app/hooks';
import GenericTable from '@organisms/generic-table';
import CheckboxAtom from '@atoms/checkbox';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import Dropdown from '@atoms/drop-down';
import Label from '@atoms/label';

function Transaction() {
	//   const [popup, SetPopup] = useState(false);
	const [page, setPage] = useState(1);
	const [index, setIndex] = useState(0);
	const [pager, setPager] = useState({});
	const [pageDataArray, setPageDataArray] = useState([]);
	const [allUserData, setAllUserData] = useState([]);
	const allData = useAppSelector(({ auth }) => auth.userData?.friends);
	const handleChange = (event: any, newValue: any) => {
		setIndex(newValue);
	};

	const ITEMS_PER_PAGE = 10;
	const handlePage = (e: any) => {
		setPage(e);
		setPageDataArray(paginateArray(allUserData, ITEMS_PER_PAGE, e));
	};

	useEffect(() => {
		if (allData) {
			if (allData[0]?.data.length > ITEMS_PER_PAGE) {
				setPageDataArray(paginateArray(allData[0]?.data, ITEMS_PER_PAGE, 1));
			} else {
				setPageDataArray(allData[0]?.data);
			}
			setAllUserData(allData[0]?.data);
			setPager({
				...pager,
				count: Math.ceil(allData[0]?.data.length / ITEMS_PER_PAGE),
			});
		} else {
			setPager({
				...pager,
				count: 1,
			});
		}
	}, [allData]);

	useEffect(() => {
		setPager({
			...pager,
			page,
		});
	}, [page]);
	return (
		<>
			<div className="pb-4 flex items-center justify-between overflow-x-hidden w-full">
				<TransactionTabs
					index={index}
					handleChange={handleChange}
					tabsClasses=""
					tabClasses="bg-transparent  text-xl xl:text-2xl font-semibold tracking-tight news-tabs  transition-all duration-500 ease-in-out transform-none  text-gray-300 w-[110px]"
					tabsData={[
						{
							name: (
								<Label
									value="My Orders"
									className={index === 0 ? 'text-primary' : ``}
								/>
							),
							component: (
								<>
									<div className="bg-white rounded-lg shadow-lg p-[30px]">
										<BlogTableHeader
											btnValue="Download Invoices"
											iconClass="text-gray-500"
											labelClass="text-[22px] font-bold text-[#333333]"
										/>
										<GenericTable
											rowClicked="/user/settings/transaction"
											headers={[
												'checkbox',
												'Name',
												'Product_No',
												'Built_Time',
												'Quantity',
												'Price',
												'Manufacturers',
												'Order_Status',
												'',
											]}
											rows={[
												{
													id: 1,
													checkbox: <CheckboxAtom />,
													Name: 'Lamborghini',
													Product_No: '11',
													Built_Time: '1 month',
													Quantity: 1,
													Price: '$100.00',
													Manufacturers: 'PCB Way',
													Order_Status: 'In Progress',
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
																},
																{
																	name: 'Download Invoice',
																	value: 'Download Invoice',
																},
															]}
														/>
													),
												},
												{
													id: 2,
													checkbox: <CheckboxAtom />,
													Name: 'Lamborghini',
													Product_No: '11',
													Built_Time: '1 month',
													Quantity: 1,
													Price: '$100.00',
													Manufacturers: 'PCB Way',
													Order_Status: 'In Progress',
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
																},
																{
																	name: 'Download Invoice',
																	value: 'Download Invoice',
																},
															]}
														/>
													),
												},
											]}
										/>

										{/* <TableContainer>
                      <MyOrderTable />
                    </TableContainer> */}
										<Pagination
											pager={pager}
											handlePage={handlePage}
											mainClass="py-6"
										/>
									</div>
								</>
							),
						},
						{
							name: (
								<Label
									value="System"
									className={index === 1 ? 'text-primary news-tabs' : ``}
								/>
							),
							component: (
								<>
									<div className="bg-white rounded-md shadow-lg mt-4">
										<BlogTableHeader
											btnValue="Download Invoices"
											iconClass="text-gray-500"
											labelClass="text-[22px] font-bold text-[#333333]"
										/>
										<TableContainer>
											{/* <SystemTable /> */}
											<GenericTable
												rowClicked="/user/settings/transaction"
												headers={[
													'checkbox',
													'Date',
													'Type',
													'Service_Provider',
													'Amount',

													'',
												]}
												rows={[
													{
														id: 1,
														checkbox: <CheckboxAtom />,
														Date: '12/12/20',
														Type: 'Refund',
														Service_Provider: 'Julian Brant',
														Amount: '$100.00',

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
																	},
																	{
																		name: 'Download Invoice',
																		value: 'Download Invoice',
																	},
																]}
															/>
														),
													},
													{
														id: 2,
														checkbox: <CheckboxAtom />,
														Date: '12/12/20',
														Type: 'Refund',
														Service_Provider: 'Julian Brant',
														Amount: '$100.00',

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
																	},
																	{
																		name: 'Download Invoice',
																		value: 'Download Invoice',
																	},
																]}
															/>
														),
													},
												]}
											/>
										</TableContainer>
										<Pagination
											pager={pager}
											handlePage={handlePage}
											mainClass="py-6"
										/>
									</div>
								</>
							),
						},
					]}
				/>
			</div>
		</>
	);
}

export default Transaction;
