import Label from '@atoms/label';
import { TableContainer } from '@mui/material';
import { useEffect, useState } from 'react';
// import { BsPlus } from 'react-icons/bs';
import SmsVerification from '@organisms/sms-verifications';
import TeamGenericTable from './TeamGenericTable';
// import TeamJsonData from './TeamjsonData.json';
import AdminBlogsTableHeader from '@organisms/blogs-table-header-admin';
import AdminCustomSelect from '@molecules/custom-select-admin';
import Modal from '@atoms/modal';
import Button from '@atoms/button';
import { FORMINPUT } from 'utils/styles';
import Loader from '@atoms/loader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Pagination from '@molecules/pagination';
import { apiService } from 'utils/request';

export default function ManageTeam() {
	interface TeamDataProps {
		id: any;
		is_visible: boolean;
		name: any;
		position: any;
		type: any;
		role: any;
		first_name: any;
		last_name: any;
		about_me: any;
	}

	const [pager, setPager] = useState<any>({ page: 1, count: 1, totalBlogs: 0 });
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [openSMS, setOpenSMS] = useState(false);
	const [userName, setUserName] = useState(null);
	const [filterPosition, setfilterPosition] = useState(null);
	const [filterType, setfilterType] = useState(null);
	const [TeamData, setTeamData] = useState<TeamDataProps>();
	const [dataList, setDataList] = useState<TeamDataProps[]>([]);
	const [position, setPosition] = useState(null);
	const [type, setType] = useState(null);
	const router = useRouter();

	const fetchTeamData = async () => {
		await apiService(
			{
				method: 'get',
				url: `/account/team/public-list/?page=${pager.page}&page_size=10`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					console.log('data: ', data);
					setDataList(data);
					setLoading(false);
					setPager({
						...pager,
						totalBlogs: data?.count,
						count: Math.ceil(data?.count / 10),
					});
					return;
				}
			}
		);
	};

	useEffect(() => {
		fetchTeamData();
	}, [pager.page]);

	const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
		setPager({ ...pager, page: value });
	};

	const showPagination = () => {
		if (dataList) {
			if (dataList?.length > 0 && pager.page !== 1) {
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

	const AddTeam = () => {
		setOpen((prev) => !prev);
	};

	const handleSMS = () => {
		setOpenSMS((prev) => !prev);
	};

	const handleCheckFields = () => {
		if (!userName) {
			toast.warn("Don't forget to put a UserName!");
			return;
		}
		if (!position) {
			toast.warn("Don't forget to select a Position!");
			return;
		}
		if (!type) {
			toast.warn("Don't forget to select a type!");
			return;
		}
		handleSMS();
	};

	const handlerSubmit = async () => {
		const formData = new FormData();
		if (userName) formData.append('name', userName);
		if (position) formData.append('position', position);
		if (type) formData.append('type', type);
		formData.append('is_visible', 'true');
		setLoading(true);
		ConfirmCreate(formData);
	};

	const ConfirmCreate = (data: any) => {
		setTeamData(data);
		handleReset();
		AddTeam();
		handleSMS();
	};

	const handleReset = () => {
		setUserName(null);
		setPosition(null);
		setType(null);
	};

	const handlePositionFilter = (value: any) => setfilterPosition(value);

	const handleTypeFilter = (value: any) => setfilterType(value);

	return (
		<div>
			<Modal
				width="sm"
				open={open}
				close={AddTeam}
				header={
					<div>
						<Label
							value="Add Team"
							className="text-2xl text-primary font-bold"
						/>
					</div>
				}
				content={
					<div>
						<div className="mb-2">
							<span>UserName</span>{' '}
							<input
								type="text"
								className={FORMINPUT}
								placeholder="Type Username"
								// value={planName}
								onChange={(e: any) => setUserName(e.target.value)}
							/>
						</div>
						<div className="mb-2">
							<AdminCustomSelect
								unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 mt-10"
								placeholder="Choose Position"
								options={[
									{ name: 'Web Designer', value: 'Web Designer' },
									{ name: 'Web Developer', value: 'Web Developer' },
									{ name: 'Lawyer', value: 'Lawyer' },
								]}
								onchangeSelect={(value: any) => setPosition(value)}
							/>
						</div>
						<div className="mb-2">
							<AdminCustomSelect
								placeholder="Choose User Type"
								options={[
									{ name: 'Executives', value: 'Executives' },
									{ name: 'Regular', value: 'Regular' },
								]}
								onchangeSelect={(value: any) => setType(value)}
							/>
						</div>
						<div className="flex">
							<Button
								onClick={handleCheckFields}
								value="Upload Team"
								className="text-white bg-primary mr-1"
								color="primary"
							/>
							<Button
								onClick={() => setOpen(false)}
								value="Cancel"
								className="text-gray-600"
								variant="outlined"
							/>
						</div>
					</div>
				}
			/>
			<SmsVerification
				open={openSMS}
				toggleOpen={handleSMS}
				handleNext={handlerSubmit}
			/>
			<div className="lg:w-4/5 pt-4 mx-auto">
				{loading ? (
					<Loader />
				) : (
					<>
						<Label
							value="Team"
							classes={{
								root: 'text-primary font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
							}}
						/>
						<div className="w-full bg-white rounded-lg shadow">
							<AdminBlogsTableHeader
								addButton={false}
								containerClass=""
								// onClick={AddTeam}
								// showDropdown={true}
								showDropDownOneData={{
									placeholder: 'Position',
									options: [
										{ name: 'All', value: 'All' },
										{ name: 'Web Designer', value: 'Web Designer' },
										{ name: 'Web Developer', value: 'Web Developer' },
										{ name: 'Lawyer', value: 'Lawyer' },
									],
									onchangeSelect: handlePositionFilter,
								}}
								showDropDownTwoData={{
									placeholder: 'Type',
									options: [
										{ name: 'All', value: 'All' },
										{ name: 'Executives', value: 'Executives' },
										{ name: 'Regular', value: 'Regular' },
									],
									onchangeSelect: handleTypeFilter,
								}}
							/>
							<TableContainer>
								<TeamGenericTable
									dataList={dataList}
									TeamData={TeamData}
									filterPosition={filterPosition}
									filterType={filterType}
								/>
							</TableContainer>
							{showPagination()}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
