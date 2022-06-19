import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import UserServiceTechnicianTable from '@organisms/user-service-technician-table';
import UserServiceTechnicianTableHeader from '@organisms/userServiceProviderTechnicianTableHeader';
import { useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import { paginateArray } from 'utils/utils';

const UserServiceProviderTechnician = () => {
	//   const dispatch = useAppDispatch();
	//   const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [pager, setPager] = useState({});
	const [pageDataArray, setPageDataArray] = useState([]);
	const [search, setSearch] = useState('');
	const [allUserData, setAllUserData] = useState([]);
	const allData = useAppSelector(({ auth }) => auth.userData?.friends);

	const ITEMS_PER_PAGE = 10;
	//   const loader = useAppSelector(
	//     ({ UserServiceReducer }) => UserServiceReducer?.loader
	//   );
	const handleSearch = (e: any) => setSearch(e.target.value);

	const handlePage = (e: any) => {
		setPage(e);
		setPageDataArray(paginateArray(allUserData, ITEMS_PER_PAGE, e));
	};

	useEffect(() => {
		setPage(1);
		// dispatch(onUserGet({ search }));
	}, [search]);

	//   useEffect(() => {
	//     setLoading(loader);
	//   }, [loader]);

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
		<div className="pt-5 bg-white rounded-lg shadow-lg px-[30px] mt-4 font-proxima-nova">
			<Label
				value="User & Service Provider & Technician"
				classes={{
					root: 'text-primary text-xl xl:text-2xl 2xl:text-[32px] tracking-tight font-bold pb-3',
				}}
			/>
			<div className="w-full   space-y-3">
				<UserServiceTechnicianTableHeader />
				<UserServiceTechnicianTable />
				<Pagination
					pager={pager}
					handlePage={handlePage}
					mainClass="py-6"
				/>
			</div>
		</div>
	);
};

export default UserServiceProviderTechnician;
