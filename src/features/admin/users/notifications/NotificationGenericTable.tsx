import CheckboxAtom from '@atoms/checkbox';
import { useEffect, useState } from 'react';
import Dropdown from '@atoms/drop-down';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import AdminGenericTable from '@organisms/generic-table-admin';
import Pagination from '@molecules/pagination';
import { useAppSelector } from 'app/hooks';
// import { apiService } from 'utils/request';
import { useRouter } from 'next/router';

interface NotificationData {
	id?: any;
	description?: any;
	date?: string;
	group_Type?: string;
	type?: string;
	userName?: string;
}

interface NotificationGenericTableProps {
	NotificationData?: NotificationData;
	filterGroupType?: string | null;
	filterType?: string | null;
	dataList?: NotificationData[];
}

const NotificationGenericTable: React.FC<NotificationGenericTableProps> = (props) => {
	interface NotificationItemProps {
		id: any;
		checkbox: any;
		description: any;
		date: any;
		group_Type: any;
		type: any;
		ellipsis: any;
	}
	const [pager, setPager] = useState<any>({ page: 1, count: 1, totalBlogs: 0 });
	const [rows, setRows] = useState<NotificationItemProps[]>([]);
	const [displayRows, setdisplayRows] = useState<NotificationItemProps[]>([]);
	const [pageRows, setPageRows] = useState<NotificationItemProps[]>([]);
	// const [loading, setLoading] = useState(true);
	const userId = useAppSelector((state) => state?.auth?.userData?.id);
	const router = useRouter();

	useEffect(() => {
		fetchNotificationsData();
	}, [props.dataList]);

	useEffect(() => {
		if (
			props.NotificationData?.id &&
			props.NotificationData.description &&
			props.NotificationData.date &&
			props.NotificationData.group_Type &&
			props.NotificationData.type
		) {
			const item = {
				id: props.NotificationData?.id,
				checkbox: <CheckboxAtom />,
				description: props.NotificationData?.description,
				date: props.NotificationData.date
					? new Date(props.NotificationData?.date).toDateString()
					: null,
				group_Type: props.NotificationData?.group_Type,
				type: props.NotificationData?.type,
				ellipsis: (
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
								name: 'View',
								value: 'View',
								func: () =>
									router.push(
										`/admin/users/marketing/notification-center/${props.NotificationData?.id}`
									),
							},
							{
								name: 'Pause',
								value: 'Pause',
							},
							{
								name: 'Approved',
								value: 'Approved',
							},
							{
								name: 'Delete',
								value: 'Delete',
							},
						]}
					/>
				),
			};
			setRows((prev) => [...prev, item]);
			if (
				(props.filterType === 'All' ||
					!props.filterType ||
					props.filterType === item.type) &&
				(props.filterGroupType === 'All' ||
					!props.filterGroupType ||
					props.filterGroupType === item.group_Type)
			) {
				setdisplayRows((prev) => [...prev, item]);
			}
		}
	}, [props.NotificationData]);

	useEffect(() => {
		setPager({
			...pager,
			totalBlogs: displayRows?.length,
			count: Math.ceil(displayRows?.length / 10),
		});
		getBlogs();
	}, [displayRows]);

	const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
		setPager({ ...pager, page: value });
	};

	const showPagination = () => {
		if (displayRows) {
			if (displayRows?.length > 0 && pager.page !== 1) {
				return (
					<Pagination
						handlePage={handlePagination}
						pager={pager}
						mainClass="py-6"
					/>
				);
			} else if (pager.page == 1 && pager.count > 1) {
				return (
					<Pagination
						handlePage={handlePagination}
						pager={pager}
						mainClass="py-6"
					/>
				);
			} else {
				return '';
			}
		}
	};

	const getBlogs = async () => {
		if (pager.page === 1) {
			// console.log("pager page: ", pager.page);
			// console.log("displayRows: ", displayRows);
			const newRows = displayRows.filter((data: any, index: any) => index >= 0 && index < 10);
			setPageRows(newRows);
		} else {
			const newRows = displayRows.filter(
				(data: any, index: any) => index >= (pager.page - 1) * 10 && index < pager.page * 10
			);
			setPageRows(newRows);
		}
		// if (userId) {
		// 	await apiService(
		// 		{
		// 			method: 'get',
		// 			url: `/notifications/?user__id=${userId}&search=${value || ''}&page=${pager.page
		// 				}&page_size=10`,
		// 			token: true,
		// 		},
		// 		(res: any) => {
		// 			if (res) {
		// 				const { data } = res;
		// 				setdisplayRows(data);
		// 				setLoading(false);
		// 				setPager({
		// 					...pager,
		// 					totalBlogs: data?.count,
		// 					count: Math.ceil(data?.count / 10),
		// 				});
		// 				return;
		// 			}
		// 		}
		// 	);
		// }
	};

	useEffect(() => {
		getBlogs();
	}, [userId, pager?.page]);

	useEffect(() => {
		if (props.filterType) {
			const filterRowList = rows.filter(
				(data) =>
					(props.filterGroupType === 'All' || !props.filterGroupType
						? data.group_Type
						: data.group_Type === props.filterGroupType) &&
					(props.filterType === 'All' || !props.filterType
						? data.type
						: data.type === props.filterType)
			);
			setdisplayRows(filterRowList);
			setPager({ page: 1, count: 1, totalBlogs: 0 });
		}
	}, [props.filterType]);

	useEffect(() => {
		if (props.filterGroupType) {
			const filterRowList = rows.filter(
				(data) =>
					(props.filterGroupType === 'All' || !props.filterGroupType
						? data.group_Type
						: data.group_Type === props.filterGroupType) &&
					(props.filterType === 'All' || !props.filterType
						? data.type
						: data.type === props.filterType)
			);
			setdisplayRows(filterRowList);
			setPager({ page: 1, count: 1, totalBlogs: 0 });
		}
	}, [props.filterGroupType]);

	// const PinkSwitch = styled(Switch)(({ theme }) => ({
	//     '& .MuiSwitch-switchBase.Mui-checked': {
	//         color: pink[700],
	//         '&:hover': {
	//             backgroundColor: alpha(pink[700], theme.palette.action.hoverOpacity),
	//         },
	//     },
	//     '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
	//         backgroundColor: pink[700],
	//     },
	// }));

	// const label = { inputProps: { 'aria-label': 'Switch demo' } };

	const fetchNotificationsData = () => {
		// const NotificationData = [
		//     {
		//         id: 1,
		//         description: 'How Ideeza can make the world a better place',
		//         date: '10 jul 2019',
		//         group_Type: 'Personal',
		//         type: 'Marketing',
		//         userName: 'John',
		//     },
		//     {
		//         id: 2,
		//         description: 'How Ideeza can make the world a better place',
		//         date: '10 jul 2019',
		//         group_Type: 'Broadcast',
		//         type: 'System',
		//         userName: 'Michael',
		//     },
		//     {
		//         id: 3,
		//         description: 'How Ideeza can make the world a better place',
		//         date: '10 jul 2019',
		//         group_Type: 'Group',
		//         type: 'Marketing',
		//         userName: 'Rachel',
		//     },
		//     {
		//         id: 4,
		//         description: 'How Ideeza can make the world a better place',
		//         date: '10 jul 2019',
		//         group_Type: 'Group',
		//         type: 'System',
		//         userName: 'John',
		//     },
		//     {
		//         id: 5,
		//         description: 'How Ideeza can make the world a better place',
		//         date: '10 jul 2019',
		//         group_Type: 'Broadcast',
		//         type: 'System',
		//         userName: 'Chris'
		//     },

		// ];

		props.dataList &&
			props.dataList.forEach((data) => {
				const item = {
					id: data?.id,
					checkbox: <CheckboxAtom />,
					description: data?.description,
					date: data.date ? new Date(data?.date).toDateString() : null,
					group_Type: data?.group_Type,
					type: data?.type,
					ellipsis: (
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
									name: 'View',
									value: 'View',
									func: () =>
										router.push(
											`/admin/users/marketing/notification-center/${data?.id}`
										),
								},
								{
									name: 'Pause',
									value: 'Pause',
								},
								{
									name: 'Approved',
									value: 'Approved',
								},
								{
									name: 'Delete',
									value: 'Delete',
								},
							]}
						/>
					),
				};
				setRows((prev) => [...prev, item]);
				setdisplayRows((prev) => [...prev, item]);
			});
	};

	const onClickOrder = (value: any) => {
		// console.log('ordervalue: ', value);
		const dataList = [...displayRows];
		if (value === 'type' || value === 'group_Type') {
			dataList.sort(function (a, b) {
				if (value === 'type') {
					return a.type.localeCompare(b.type); //using String.prototype.localCompare()
				}
				if (value === 'group_Type') {
					return a.group_Type.localeCompare(b.group_Type); //using String.prototype.localCompare()
				}
			});
		}
		setdisplayRows(dataList);
	};

	// const getAllBlogData = (payload: any) => console.warn(payload); //

	return (
		<>
			<AdminGenericTable
				headers={['checkbox', 'description', 'date', 'group_Type', 'type', 'ellipsis']}
				rowClicked="/admin/users/marketing/notification-center"
				// rows={displayRows}
				rows={pageRows}
				onClickOrder={onClickOrder}
			/>
			{showPagination()}
		</>
	);
};

export default NotificationGenericTable;
