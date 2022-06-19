import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import { TableContainer } from '@mui/material';
// import BlogsTableHeader from '@organisms/blogs-table-header';
import AdminBlogsTableHeader from '@organisms/blogs-table-header-admin';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import StoryGenericTable from './StoryGenericTable';
import Loader from '@atoms/loader';
import { apiService } from '../../../../utils/request';

export default function ManageStory() {
	interface StoryDataProps {
		id: any;
		updated_at: any;
		created_at: any;
		category: any;
		status: any;
		title: any;
		description: any;
		cover_file: any;
	}

	const router = useRouter();
	// const [showGear, setShowGear] = useState(false);
	const [pager, setPager] = useState<any>({ page: 1, count: 1, totalBlogs: 0 });
	const [loading, setLoading] = useState(true);
	const [filterCategory, setfilterCategory] = useState(null);
	const [filterStatus, setfilterStatus] = useState(null);
	const [dataList, setDataList] = useState<StoryDataProps[]>([]);
	// const userId = useAppSelector((state) => state?.auth?.userData?.id);

	const fetchStoryData = async () => {
		await apiService(
			{
				method: 'get',
				url: `/core/success-story/?page=${pager.page}&page_size=10`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					// console.log("data: ", data.count);
					setDataList(data?.results);
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
		fetchStoryData();
	}, [pager.page]);

	const AddArticle = () => {
		router.push('/admin/users/marketing/add-story');
	};

	const handleCategoryFilter = (value: any) => setfilterCategory(value);

	const handleStatusFilter = (value: any) => setfilterStatus(value);

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

	return (
		<div>
			<div className="lg:w-4/5 pt-4 mx-auto">
				{loading ? (
					<Loader />
				) : (
					<>
						<Label
							value="Manage Stories"
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
								onClick={AddArticle}
								// showDropdown={false}
								// showGear={showGear}
								// containerClass="p-4 md:p-0 md:pr-3"
								// handleSearch={handleSearch}
								showDropDownOneData={{
									placeholder: 'Category',
									options: [
										{ name: 'All', value: 'All' },
										{ name: 'Code', value: 'Code' },
										{ name: 'Cover', value: 'Cover' },
										{ name: 'Electronics', value: 'Electronics' },
										{ name: 'Parts', value: 'Parts' },
									],
									onchangeSelect: handleCategoryFilter,
								}}
								showDropDownTwoData={{
									placeholder: 'Status',
									options: [
										{ name: 'All', value: 'All' },
										{ name: 'Approved', value: 'Approved' },
										{ name: 'Pending', value: 'Pending' },
									],
									onchangeSelect: handleStatusFilter,
								}}
							/>
							<TableContainer>
								<StoryGenericTable
									dataList={dataList}
									// StoryData={StoryData}
									filterCategory={filterCategory}
									filterStatus={filterStatus}
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
