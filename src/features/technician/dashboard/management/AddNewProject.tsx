import Label from '@atoms/label';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import Pagination from '@molecules/pagination';
import BlogsTableHeader from '@organisms/blogs-table-header';
import Table from '@organisms/table';
import { useAppDispatch } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';

function ProjectHome(props: any) {
	const { classessort } = props;
	const dispatch = useAppDispatch();
	//   const route = useRouteMatch();

	const [pager, setPager] = useState(null);
	const [auth, setAuth] = useState(false);
	const [tableDate, SetTableData] = useState([]);
	//   const history = useHistory();
	//   const projectdata = useSelector(
	//     ({ Projects }) => Projects?.serviceProjects?.results
	//   );
	//   const Count = useSelector(({ Projects }) => Projects);
	//   const state = useSelector((state) => state?.Auth?.authenticated);

	const getAllProjectData = (payload: any) => dispatch(payload);
	// const getProjectHandler = (id) => {
	//   history.push(`${route.url}/project-coverage/${id}`);
	// };
	const getProjectHandler = () => {
		// history.push(`${route.url}/project-coverage/${1}`);
	};
	const [showPopup, setPopup] = useState(false);

	useEffect(() => {
		if (showPopup) setPopup(showPopup);
	}, [showPopup]);

	//   useEffect(() => {
	//     if (Count) {
	//       setPager({
	//         count: Count?.count,
	//         page: Count?.params?.page,
	//       });
	//     }
	//   }, [Count]);
	//   useEffect(() => {
	//     setAuth(state);
	//   }, [state]);
	//   useEffect(() => {
	//     if (auth) getAllProjectData();
	//   }, [auth]);

	//   useEffect(() => {
	//     if (projectdata) SetTableData(projectdata);
	//   }, [projectdata]);

	return (
		<div className="pt-4 w-full">
			<Label
				value="Projects"
				classes={{
					root: 'text-primary font-sans font-bold pb-3 text-xl xl:text-2xl 2xl:text-3xl tracking-tight',
				}}
			/>
			<div className="w-full bg-white rounded-lg shadow">
				<BlogsTableHeader
					btnValue="Add New"
					iconEnd={<BsPlus className="text-2xl" />}
					labelClass="hidden"
					iconClass="md:-mr-4"
					containerClass="md:flex items-center justify-between px-4 space-y-3 md:space-y-0 pb-3"
					prop={
						<>
							<CustomDropDownMenu
								className={classessort}
								selectOptions={[
									{
										name: 'All',
										value: 'All',
									},
									{
										name: 'Cover',
										value: 'Cover',
									},
									{
										name: 'Electronics',
										value: 'Electronics',
									},
									{
										name: 'Parts',
										value: 'Parts',
									},
								]}
								inputClasses="h-12 rounded-sm w-32 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
								labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
								labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
								labelWrapperClass="flex cursor-pointer md:relative"
								dropDownClasses="origin-top-right z-20 mt-0 w-32 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
							/>
						</>
					}
				/>
				{/* <TableContainer>
          <ProjectHomeTable
            // data={tableDate}
            data={[1, 2, 3, 4, 5, 6, 7]}
            getProjectHandler={getProjectHandler}
          />
        </TableContainer> */}
				<Table />
				<Pagination
					handlePage={(e) => getAllProjectData({ page: e })}
					pager={pager}
					mainClass="py-6"
				/>
			</div>
		</div>
	);
}
ProjectHome.defaultProps = {
	//   containerClass:
	//     "grid md:grid-cols-8 grid-cols-2 gap-2 items-center justify-between px-2 pt-4",
	extraBtn: false,
	classessort: { root: 'font-bold' },
};

export default ProjectHome;
