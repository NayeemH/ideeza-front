import Label from '@atoms/label';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import Pagination from '@molecules/pagination';
import BlogsTableHeader from '@organisms/blogs-table-header';
import GenericTable from '@organisms/generic-table';
import React, { useEffect, useState } from 'react';
import { apiService } from 'utils/request';
import DataTable from '@organisms/data-table';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { team_data } from '../../../../static/data/technician/about_team';

function Team(props: any) {
	const [popup, SetPopup] = useState(false);
	// const [auth, setAuth] = useState(false);
	const [page, setPage] = useState(1);
	const [pager, setPager] = useState({});
	const [search, setSearch] = useState('');
	const [teamData, setTeamData] = useState<any[]>([]);
	const [loader, setLoader] = useState(true);

	const { classessort } = props;

	const getTeamsData = async (search: any = '', sortBy: any = '') => {
		setLoader(true);

		await apiService(
			{
				method: 'get',
				url: `/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					// setTeamData(data.results);
					setTeamData(team_data);
					setLoader(false);
					return;
				}

				setLoader(false);
			}
		);
	};

	const toggleOpen = () => SetPopup(!popup);

	const handlePage = (e: any) => {
		setPage(e);
		// getAllTeamData({
		//   page: e,
		//   search,
		//   page_size: ITEMS_PER_PAGE,
		// });
	};

	useEffect(() => {
		getTeamsData();
	}, []);

	useEffect(() => {
		setPage(1);
		// getAllTeamData({
		//   page: 1,
		//   search,
		//   page_size: ITEMS_PER_PAGE,
		// });
	}, [search]);

	useEffect(() => {
		setPager({
			...pager,
			page,
		});
	}, [page]);

	return (
		<div className="pt-4">
			<Label
				value="Team"
				classes={{
					root: 'text-primary tracking-tight font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
				}}
			/>
			<div className="w-full bg-white rounded-lg shadow-lg">
				<BlogsTableHeader
					btnValue="Add new Team"
					labelClass="hidden"
					containerClass="flex items-center justify-between px-4"
					visible={false}
					prop={
						<CustomDropDownMenu
							className={classessort}
							selectOptions={[
								{
									name: 'All',
									value: 'All',
								},
								{ value: 'no_applied', name: 'No one applied' },
								{ value: '1_applied', name: 'At least 1 applied' },
								{ value: 'status', name: 'Pending status' },
							]}
							inputClasses="h-12 rounded-sm w-32 pl-2 font-sans tracking-wider text-base  cursor-pointer bg-gray-200"
							labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
							labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
							labelWrapperClass="flex cursor-pointer md:relative"
							dropDownClasses="origin-top-right z-20 mt-0 w-64 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
						/>
					}
				/>
				{/* <CareerTable data={teamDataArray} loading={loading} /> */}
				{/* <CareerTable data={[1, 2, 3, 4, 5, 6, 7]} loading={loading} /> */}
				{/*<GenericTable />
				<Pagination
					pager={pager}
					handlePage={handlePage}
					mainClass="pt-6 pb-12"
				/>*/}

				<DataTable.Container>
					<DataTable.Header>
						<DataTable.Row>
							<DataTable.Head>Name</DataTable.Head>
							<DataTable.Head>Status</DataTable.Head>
							<DataTable.Head>Date Applied</DataTable.Head>
							<DataTable.Head />
						</DataTable.Row>
					</DataTable.Header>
					<DataTable.Body>
						{teamData &&
							teamData.length > 0 &&
							teamData.map((item: any, index: number) => (
								<DataTable.Row key={index}>
									<DataTable.Data>{item?.name}</DataTable.Data>
									<DataTable.Data>{item?.status}</DataTable.Data>
									<DataTable.Data>{item?.date_applied}</DataTable.Data>
									<DataTable.Data>
										<MoreVertIcon />
									</DataTable.Data>
								</DataTable.Row>
							))}
					</DataTable.Body>
				</DataTable.Container>
			</div>
		</div>
	);
}
Team.defaultProps = {
	extraBtn: false,
	classessort: { root: 'font-bold' },
};
export default Team;
