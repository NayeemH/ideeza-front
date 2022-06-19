import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import { Avatar, TableContainer } from '@mui/material';
import AdminBlogsTableHeader from '@organisms/blogs-table-header-admin';
import { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import Modal from '@atoms/modal';
import { FORMINPUT } from 'utils/styles';
import Button from '@atoms/button';
import AvatarGenericTable from './AvatarGenericTable';
import AdminCustomSelect from '@molecules/custom-select-admin';
import { apiService } from 'utils/request';
import Loader from '@atoms/loader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function ManageAvatars() {
	interface AvatarDataProps {
		id: any;
		updated_at: any;
		created_at: any;
		is_visible: boolean;
		image: any;
		user_Type: any;
		category: any;
	}

	const [pager, setPager] = useState<any>({ page: 1, count: 1, totalBlogs: 0 });
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [user_Type, setUser_Type] = useState(null);
	const [category, setCategory] = useState(null);
	const [filterCategory, setfilterCategory] = useState(null);
	const [filterUser_Type, setfilterUser_Type] = useState(null);
	const [AvatarData, setAvatarData] = useState<AvatarDataProps>();
	const [dataList, setDataList] = useState<AvatarDataProps[]>([]);
	// const [ImageFile, setImageFile] = useState<File | null>(null);
	const [ImageFile, setImageFile] = useState('');
	const [showImage, setShowImage] = useState('');
	// const [customName, setCustomName] = useState(null);
	const router = useRouter();

	const fetchAvatarData = async () => {
		await apiService(
			{
				method: 'get',
				url: `/core/avatar/?page=${pager.page}&page_size=10`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					// console.log("data: ", data.count);
					// setCount(data.count);
					setDataList(data?.results);
					// setBlogData(data);
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
		fetchAvatarData();
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

	const AddAvatar = () => {
		setOpen((prev) => !prev);
	};

	const handleSubmit = async () => {
		if (!category) {
			toast.warn("Don't forget to select a category!");
			return;
		}
		if (!user_Type) {
			toast.warn("Don't forget to select a User Type!");
			return;
		}
		if (ImageFile === '') {
			toast.warn("Don't forget to select a User Type!");
			return;
		}
		const formData = new FormData();
		formData.append('updated_at', new Date().toString());
		formData.append('created_at', new Date().toString());
		formData.append('is_visible', 'true');
		formData.append('image', ImageFile);
		formData.append('user_Type', user_Type);
		formData.append('category', category);
		setLoading(true);
		await apiService(
			{
				method: 'post',
				url: `/core/avatar/`,
				token: true,
				data: formData,
			},
			(res: any, error: any) => {
				if (res) {
					setLoading(false);
					toast.dismiss();
					toast.success('posted successfully');
					// ConfirmCreate(res?.data);
					handleReset();
					setOpen(false);
					router.reload();
					// router.reload('/admin/users/marketing/avatars');
					return;
				}
				if (error) {
					toast.error('Creating Avatar Failed');
					setLoading(false);
				}
			}
		);
	};

	const ConfirmCreate = (data: any) => {
		setAvatarData(data);
		handleReset();
		setOpen(false);
	};

	const handleReset = () => {
		setUser_Type(null);
		setCategory(null);
		setImageFile('');
		setShowImage('');
	};

	const handleChangeUserType = (value: any) => setUser_Type(value);

	const handleChangeCategory = (value: any) => setCategory(value);

	const handleCategoryFilter = (value: any) => setfilterCategory(value);

	const handleUserTypeFilter = (value: any) => setfilterUser_Type(value);

	const handleImageFile = (e: any) => {
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = () => {
			// console.log("readerResult: ", typeof reader.result);
			if (typeof reader.result === 'string') {
				setShowImage(reader.result);
			}
		};
		setImageFile(e.target.files[0]);
		// console.log("readerResult: ", reader.result);

		// console.log("ImageFile: ", e.target.files[0]);
		// console.log("ImageFileURL: ", URL.createObjectURL(e.target.files[0]));
		// setImage_url(URL.createObjectURL(e.target.files[0]));
	};

	return (
		<div>
			<Modal
				width="sm"
				open={open}
				close={AddAvatar}
				header={
					<div>
						<Label
							value="Add avatars"
							className="text-2xl text-primary font-bold"
						/>
					</div>
				}
				content={
					<div>
						<div className="mb-2">
							<AdminCustomSelect
								unorderedList="absolute overflow-y-auto w-full bg-white shadow-lg flex flex-wrap gap-4 z-10 mt-10"
								placeholder="Choose User Type"
								options={[
									{ name: 'User', value: 'User' },
									{ name: 'Technician', value: 'Technician' },
									{ name: 'Service Provider', value: 'Service Provider' },
									{ name: 'Admin', value: 'Admin' },
								]}
								onchangeSelect={handleChangeUserType}
								// customValue={customName}
							/>
						</div>
						<div className="mb-2">
							<AdminCustomSelect
								placeholder="Choose Category"
								options={[
									{ name: 'Man', value: 'Man' },
									{ name: 'Woman', value: 'Woman' },
									{ name: 'Freelancer', value: 'Freelancer' },
									{ name: 'Engineer', value: 'Engineer' },
									{ name: 'Animals', value: 'Animals' },
								]}
								onchangeSelect={handleChangeCategory}
								// customValue={customName}
							/>
						</div>
						<div className="flex">
							{ImageFile !== '' && (
								<Avatar
									alt=""
									src={showImage}
									className="mr-5"
								/>
							)}
							<input
								type="file"
								onChange={handleImageFile}
								className={FORMINPUT + ' mb-2'}
								placeholder="Upload Avatar"
							/>
						</div>
						<div className="flex">
							<Button
								onClick={handleSubmit}
								loading={loading}
								value="Upload avatar"
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
			<div className="lg:w-4/5 pt-4 mx-auto">
				{loading ? (
					<Loader />
				) : (
					<>
						<Label
							value="Avatars"
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
								onClick={AddAvatar}
								// showDropdown={true}
								showDropDownOneData={{
									placeholder: 'Category',
									options: [
										{ name: 'All', value: 'All' },
										{ name: 'Man', value: 'Man' },
										{ name: 'Woman', value: 'Woman' },
										{ name: 'Freelancer', value: 'Freelancer' },
										{ name: 'Engineer', value: 'Engineer' },
										{ name: 'Animals', value: 'Animals' },
									],
									onchangeSelect: handleCategoryFilter,
								}}
								showDropDownTwoData={{
									placeholder: 'User Type',
									options: [
										{ name: 'All', value: 'All' },
										{ name: 'User', value: 'User' },
										{ name: 'Technician', value: 'Technician' },
										{ name: 'Service Provider', value: 'Service Provider' },
										{ name: 'Admin', value: 'Admin' },
									],
									onchangeSelect: handleUserTypeFilter,
								}}
								// showDropdown={false}
								// containerClass="p-4 md:p-0 md:pr-3"
								// handleSearch={handleSearch}
							/>
							<TableContainer>
								<AvatarGenericTable
									dataList={dataList}
									AvatarData={AvatarData}
									filterCategory={filterCategory}
									filterUser_Type={filterUser_Type}
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
