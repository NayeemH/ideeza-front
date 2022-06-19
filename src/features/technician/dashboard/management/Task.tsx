import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import ManagementTableHeader from '@organisms/management-table-header';
import Table from '@organisms/table';
import React, { useState } from 'react';

function Task() {
	const [popup, SetPopup] = useState(false);
	//   const dispatch = useDispatch();
	//   const [auth, setAuth] = useState(false);
	//   const [loading, setLoading] = useState(false);
	//   const state = useSelector((state) => state?.Auth?.authenticated);

	//   const getTaskData = () => dispatch(onServiceProviderTask());
	//   const [allTaskData, setallTaskData] = useState([]);
	//   const TaskData = useSelector(({ TaskAllData }) => TaskAllData);
	//   const loader = useSelector(({ TaskAllData }) => TaskAllData?.loader);
	const toggleOpen = () => SetPopup(!popup);

	//   useEffect(() => {
	//     setAuth(state);
	//   }, [state]);

	//   useEffect(() => {
	//     if (auth) {
	//       getTaskData();
	//     }
	//   }, [auth]);

	//   useEffect(() => {
	//     if (TaskData) {
	//       setallTaskData(TaskData?.data);
	//     }
	//   }, [TaskData]);

	//   useEffect(() => {
	//     setLoading(loader);
	//   }, [loader]);

	return (
		<div className="pt-4">
			<Label
				value="Task"
				classes={{
					root: 'text-primary tracking-tight font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
				}}
			/>
			<div className="w-full bg-white rounded-lg shadow-lg">
				<ManagementTableHeader
					onClick={toggleOpen}
					iconClass="hidden"
					btnValue="Add new task"
					btnClass="hidden"
					containerClass="flex md:flex-row flex-col items-center justify-between md:px-4 p-4 space-y-3 md:space-y-0"
				/>
				{/* <TaskTable data={allTaskData} loading={loading} /> */}
				{/* <TaskTable data={[1, 2, 3, 4, 5, 6, 7]} /> */}
				<Table />
				<Pagination
					pager={10}
					handlePage={() => {
						('');
					}}
					mainClass="pt-6 pb-12"
				/>
			</div>
			{/* <AddNewTaskPopup open={popup} toggleOpen={toggleOpen} /> */}
		</div>
	);
}

export default Task;
