import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import ManagementTableHeader from '@organisms/management-table-header';
import Table from '@organisms/table';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useState, useEffect } from 'react';

function Machines() {
	//   const [auth, setAuth] = useState(false);
	const [popup, SetPopup] = useState(false);
	const [page, setPage] = useState(1);
	const [pager, setPager] = useState({});
	const [showAddMachine, setShowAddMachine] = useState(false);
	const [allMachineData, setAllMachineData] = useState([]);
	const [processDataArray, setProcessDataArray] = useState([]);
	const ITEMS_PER_PAGE = 10;
	//   const dispatch = useAppDispatch();
	//   const state = useAppSelector((state) => state);

	//   const processData = useAppSelector(
	//     ({ machineReducer }) => machineReducer.processData
	//   );
	//   const machineData = useAppSelector(
	//     ({ machineReducer }) => machineReducer.machineData
	//   );

	//   const getAllMachineData = () => dispatch(onServiceProviderMachine());
	//   const getProcessSubprocess = () => dispatch(onServiceProviderGetProcess());

	const handlePage = (e: any) => {
		setPage(e);
	};

	//   useEffect(() => {
	//     setAuth(state);
	//   }, [state]);

	//   useEffect(() => {
	//     if (auth) {
	//       getAllMachineData();
	//       getProcessSubprocess();
	//     }
	//   }, [auth]);

	//   useEffect(() => {
	//     if (machineData) {
	//       setAllMachineData(machineData);
	//     }
	//   }, [machineData]);

	useEffect(() => {
		setPager({
			...pager,
			count:
				allMachineData.length > ITEMS_PER_PAGE
					? Math.ceil(allMachineData.length / ITEMS_PER_PAGE)
					: 1,
		});
	}, [allMachineData]);

	useEffect(() => {
		setPager({
			...pager,
			page,
		});
	}, [page]);

	//   useEffect(() => {
	//     if (processData) {
	//       const processDataObj = processData.map(
	//         ({ name, subprocesses }, index) => {
	//           return {
	//             value: index,
	//             name: name,
	//             itemIdex: index,
	//             subprocesses: subprocesses.map(({ name }, index) => ({
	//               value: index,
	//               name: name,
	//               itemIdex: index,
	//             })),
	//           };
	//         }
	//       );
	//       setProcessDataArray(processDataObj);
	//     }
	//   }, [processData]);

	const toggleOpen = () => SetPopup(!popup);

	const openAddMachine = () => setShowAddMachine(!showAddMachine);
	const handleAddMachineCancel = () => setShowAddMachine(!showAddMachine);

	return (
		<div className="pt-4">
			<Label
				value="Machines"
				classes={{
					root: 'text-primary tracking-tight font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
				}}
			/>
			<div className="w-full bg-white rounded-lg shadow-lg">
				{showAddMachine ? (
					<></>
				) : (
					//   <AddMachines
					//     cancelAddMachine={handleAddMachineCancel}
					//     processDataArray={processDataArray}
					//   />
					<div className="w-full bg-white rounded-lg shadow-lg">
						<ManagementTableHeader
							onClick={openAddMachine}
							iconClass="hidden"
							btnValue="Create new machine"
							btnClass="hidden"
							containerClass="flex md:flex-row flex-col items-center justify-between md:px-4 p-4 space-y-3 md:space-y-0"
						/>
						{/* <MachinesTable data={allMachineData} /> */}
						{/* <MachinesTable data={[1, 2, 3, 4, 5, 6, 7]} /> */}
						<Table />
						<Pagination
							pager={pager}
							handlePage={handlePage}
							mainClass="pt-6 pb-12"
						/>
					</div>
				)}
			</div>
			{/* <ItemDescriptionPopup open={popup} toggleOpen={toggleOpen} /> */}
		</div>
	);
}

export default Machines;
