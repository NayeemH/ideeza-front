import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import ManagementTableHeader from '@organisms/management-table-header';
import Table from '@organisms/table';
import React, { useState } from 'react';

function AdditionalInfo() {
	//   const dispatch = useAppDispatch();
	//   const [auth, setAuth] = useState(false);
	//   const [userId, setUserId] = useState(null);
	const [popup, SetPopup] = useState(false);
	//   const [loading, setLoading] = useState(false);
	//   const isAuthenticated = useSelector((state) => state?.Auth?.authenticated);
	//   const userIdState = useSelector((state) => state?.Auth?.user?.id);

	//   useEffect(() => {
	//     setAuth(isAuthenticated);
	//   }, [isAuthenticated]);

	//   useEffect(() => {
	//     setUserId(userIdState);
	//   }, [userIdState]);

	//   useEffect(() => {
	//     if (userId !== null && userId !== undefined && auth) {
	//       dispatch(onServiceProviderAdditionalInfo({ id: userId }));
	//     }
	//   }, [userId]);

	const toggleOpen = () => SetPopup(!popup);

	return (
		<div className="pt-4">
			<Label
				value="Additional Info"
				classes={{
					root: 'text-primary tracking-tight font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
				}}
			/>
			<div className="w-full bg-white rounded-lg shadow-lg">
				<ManagementTableHeader
					onClick={toggleOpen}
					iconClass="hidden"
					btnValue="Add new info"
					btnClass="hidden"
					containerClass="flex md:flex-row flex-col items-center justify-between md:px-4 p-4 space-y-3 md:space-y-0"
				/>
				{/* <AdditionalInfoTable data={[1, 2, 3, 4, 5, 6, 7]} /> */}
				<Table />
				<Pagination
					pager={10}
					handlePage={() => {
						('');
					}}
					mainClass="pt-6 pb-12"
				/>
			</div>
			{/* <AddAdditionalInfoPopup open={popup} toggleOpen={toggleOpen} /> */}
		</div>
	);
}

export default AdditionalInfo;
