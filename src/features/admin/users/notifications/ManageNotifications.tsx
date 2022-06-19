import Button from '@atoms/button';
// import CheckboxAtom from '@atoms/checkbox';
// import Dropdown from '@atoms/drop-down';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
// import CustomSelect from '@molecules/custom-select';
import AdminCustomSelect from '@molecules/custom-select-admin';
import { TableContainer } from '@mui/material';
// import BlogsTableHeader from '@organisms/blogs-table-header';
import AdminBlogsTableHeader from '@organisms/blogs-table-header-admin';
// import GenericTable from '@organisms/generic-table';
import { useEffect, useState } from 'react';
// import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsPlus } from 'react-icons/bs';
import { FORMINPUT } from 'utils/styles';
import NotificationGenericTable from './NotificationGenericTable';
import { v1 as uuidv1 } from 'uuid';
import NotificationJsonData from './NotificationJsonData.json';

export default function ManageNotifications() {
	const [open, SetOpen] = useState(false);
	const [id, setId] = useState(uuidv1().toString());
	const [description, setDescription] = useState(null);
	const [group_Type, setGroup_Type] = useState(null);
	const [type, setType] = useState(null);
	const [userName, setUserName] = useState(null);
	const [NotificationData, setNotificationData] = useState({});
	const [filterGroupType, setfilterGroupType] = useState(null);
	const [filterType, setfilterType] = useState(null);
	// const [user_Type, setUser_Type] = useState(null);
	const getAllBlogData = (payload: any) => console.warn(payload); //

	interface NotificationDataProps {
		id: any;
		description: any;
		date: any;
		group_Type: any;
		type: any;
	}

	const [dataList, setDataList] = useState<NotificationDataProps[]>([]);

	const AddNotification = () => {
		SetOpen((prev) => !prev);
	};

	const getNotificationData = () => {
		NotificationJsonData.forEach((data) => setDataList((prev) => [...prev, data]));
	};

	useEffect(() => {
		getNotificationData();
	}, []);

	// const handleChangeUserType = (value: any) => setUser_Type(value);

	const handleSubmit = () => {
		const data = {
			id: id,
			description: description,
			date: new Date().toString(),
			group_Type: group_Type,
			type: type,
			userName: userName,
		};

		// console.log("data: ", data);
		id && description && group_Type && type && userName
			? ConfirmCreate(data)
			: alert('Fill All the fields');
		// console.log("avatarData", data);
		// handleReset();
	};

	const ConfirmCreate = (data: any) => {
		setNotificationData(data);
		handleReset();
		SetOpen(false);
	};

	const handleReset = () => {
		setId(uuidv1().toString());
		setDescription(null);
		setGroup_Type(null);
		setType(null);
		setUserName(null);
	};

	const handleGroupType = (value: any) => setGroup_Type(value);

	const handleType = (value: any) => setType(value);

	const handleGroupTypeFilter = (value: any) => setfilterGroupType(value);

	const handleTypeFilter = (value: any) => setfilterType(value);

	const handleDescription = (e: any) => setDescription(e.target.value);

	const handleUserName = (e: any) => setUserName(e.target.value);

	return (
		<div>
			<Modal
				width="md"
				header={
					<div>
						<Label
							value="Notification Sender"
							className="text-3xl font-bold text-primary mb-2"
						/>
						<div className="flex float-right">
							<Label
								value="Group Type"
								className="text-xl mr-2"
							/>
							<AdminCustomSelect
								placeholder="Group"
								options={[
									{ name: 'Group', value: 'Group' },
									{ name: 'Broadcast', value: 'Broadcast' },
									{ name: 'Personal', value: 'Personal' },
								]}
								onchangeSelect={handleGroupType}
							/>
						</div>
					</div>
				}
				content={
					<div>
						<Label
							value="Description"
							className="text-xl"
						/>
						<textarea
							name=""
							id=""
							cols={40}
							rows={10}
							className="border border-gray-300 focus:outline-none p-2 w-full"
							placeholder="Type Description here..."
							onChange={handleDescription}
						/>
						<div className="w-full flex justify-between mt-2">
							<div className="flex">
								<Label
									value="Type"
									className="text-xl mr-2"
								/>
								<AdminCustomSelect
									options={[
										{ name: 'System', value: 'System' },
										{ name: 'Marketing', value: 'Marketing' },
									]}
									onchangeSelect={handleType}
								/>
							</div>
							<div className="flex">
								<Label
									value="User Name"
									className="text-xl mr-2"
								/>
								<input
									type="text"
									className={FORMINPUT}
									placeholder="Type User Name"
									onChange={handleUserName}
								/>
							</div>
						</div>
						<div className="w-full flex flex-row-reverse mt-2">
							<Button
								onClick={AddNotification}
								value="Cancel"
								variant="outlined"
								className="bg-white text-gray-600 text-xl font-semibold"
							/>
							<Button
								onClick={handleSubmit}
								value="Send"
								color="primary"
								className="text-white text-xl font-semibold px-6 mr-1"
							/>
						</div>
					</div>
				}
				open={open}
				close={AddNotification}
			/>
			<div className="lg:w-4/5 pt-4 mx-auto">
				<Label
					value="Manage Notifications"
					classes={{
						root: 'text-primary font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
					}}
				/>
				<div className="w-full bg-white rounded-lg shadow">
					<AdminBlogsTableHeader
						btnValue="Add New"
						iconEnd={<BsPlus size="30" />}
						// labelClass="hidden"
						containerClass=""
						onClick={AddNotification}
						showDropDownOneData={{
							placeholder: 'Group Type',
							options: [
								{ name: 'All', value: 'All' },
								{ name: 'Group', value: 'Group' },
								{ name: 'Broadcast', value: 'Broadcast' },
								{ name: 'Personal', value: 'Personal' },
							],
							onchangeSelect: handleGroupTypeFilter,
						}}
						showDropDownTwoData={{
							placeholder: 'Type',
							options: [
								{ name: 'All', value: 'All' },
								{ name: 'Marketing', value: 'Marketing' },
								{ name: 'System', value: 'System' },
							],
							onchangeSelect: handleTypeFilter,
						}}
						// showDropdown={false}
						// containerClass="p-4 md:p-0 md:pr-3"
						// handleSearch={handleSearch}
					/>
					<TableContainer>
						<NotificationGenericTable
							dataList={dataList}
							NotificationData={NotificationData}
							filterGroupType={filterGroupType}
							filterType={filterType}
						/>
						{/* <Pagination
							handlePage={(e: any) => getAllBlogData({ page: e })}
							pager={pager}
							mainClass="py-6"
						/> */}
					</TableContainer>
				</div>
			</div>
		</div>
	);
}
