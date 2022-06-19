import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import AddProcessPopup from '@organisms/add-process-popup';
import ManagementTableHeader from '@organisms/management-table-header';
import Table from '@organisms/table';
import React, { useState, useEffect } from 'react';

function Process() {
	//   const dispatch = useDispatch();
	const [auth, setAuth] = useState(false);
	//   const state = useSelector((state) => state?.Auth?.authenticated);
	const [popup, SetPopup] = useState(false);
	//   const [loading, setLoading] = useState(false);
	const toggleOpen = () => SetPopup(!popup);
	//   const processDataArray = useSelector(
	//     ({ processDataReducer }) => processDataReducer?.data
	//   );
	//   const loader = useSelector(
	//     ({ processDataReducer }) => processDataReducer?.loader
	//   );
	const [page, setPage] = useState(1);
	const [pager, setPager] = useState({});
	//   const [pageDataArray, setPageDataArray] = useState([]);

	const handlePage = (e: any) => {
		setPage(e);
		// setPageDataArray(paginateArray(processDataArray, ITEMS_PER_PAGE, e));
	};

	//   useEffect(() => {
	//     setAuth(state);
	//   }, [state]);

	useEffect(() => {
		if (auth) {
			//   dispatch(
			//     onServiceProviderProcess({
			//       loader: true,
			//       data: [],
			//     })
			//   );
		}
	}, [auth]);

	//   useEffect(() => {
	//     if (processDataArray) {
	//       setPager({
	//         ...pager,
	//         count:
	//           processDataArray.length > ITEMS_PER_PAGE
	//             ? Math.ceil(processDataArray.length / ITEMS_PER_PAGE)
	//             : 1,
	//       });
	//       if (processDataArray.length > ITEMS_PER_PAGE) {
	//         setPageDataArray(paginateArray(processDataArray, ITEMS_PER_PAGE, 1));
	//       } else {
	//         setPageDataArray(processDataArray);
	//       }
	//     }
	//   }, [processDataArray]);

	useEffect(() => {
		setPager({
			...pager,
			page,
		});
	}, [page]);

	//   useEffect(() => {
	//     setLoading(loader);
	//   }, [loader]);

	return (
		<div className="pt-4">
			<Label
				value="Process & Sub-process"
				classes={{
					root: 'text-primary tracking-tight font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
				}}
			/>
			<div className="w-full bg-white rounded-lg shadow-lg">
				<ManagementTableHeader
					onClick={toggleOpen}
					iconClass="hidden"
					btnValue="Create new sub-process"
					btnValue2="Create new process"
					containerClass="flex md:flex-row flex-col items-center justify-between md:px-4 p-4 space-y-3 md:space-y-0"
				/>
				{/* <ProcessTable data={pageDataArray} loading={loader} /> */}
				{/* <ProcessTable data={[1, 2, 3, 4, 5, 6, 7]} /> */}
				<Table />
				<Pagination
					pager={pager}
					handlePage={handlePage}
					mainClass="pt-6 pb-12"
				/>
			</div>
			<AddProcessPopup
				open={popup}
				toggleOpen={toggleOpen}
			/>
		</div>
	);
}

export default Process;
