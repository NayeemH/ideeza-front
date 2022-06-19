import CheckboxAtom from '@atoms/checkbox';
import Dropdown from '@atoms/drop-down';
import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import { TableContainer } from '@mui/material';
import BlogsTableHeader from '@organisms/blogs-table-header';
import AdminBlogsTableHeader from '@organisms/blogs-table-header-admin';
import GenericTable from '@organisms/generic-table';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsPlus } from 'react-icons/bs';
import Loader from '@atoms/loader';
import { apiService } from '../../../../utils/request';

export default function ManageBlog() {
	interface BlogDataProps {
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
	const [loading, setLoading] = useState(true);
	const [pager] = useState(null);
	const [dataList, setDataList] = useState<BlogDataProps[]>([]);

	const getAllBlogData = (payload: any) => console.warn(payload); //

	const AddArticle = () => {
		router.push('/admin/investors/add-blog');
	};

	return (
		<div>
			<div className="lg:w-4/5 pt-4 mx-auto">
				<Label
					value="Manage Articles"
					classes={{
						root: 'text-primary font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
					}}
				/>
				<div className="w-full bg-white rounded-lg shadow">
					<BlogsTableHeader
						btnValue="Add New"
						iconEnd={<BsPlus size="30" />}
						labelClass="hidden"
						containerClass=""
						onClick={AddArticle}
						showDropdown={false}
						// containerClass="p-4 md:p-0 md:pr-3"
						// handleSearch={handleSearch}
					/>
					<TableContainer>
						<GenericTable
							headers={['checkbox', 'Article_name', 'Date', 'Status', '']}
							rowClicked="/admin/users/marketing/success-story"
							rows={[
								{
									id: 1,
									checkbox: <CheckboxAtom />,
									Article_name: 'How Ideeza can make the world a better place',
									Date: '10 jul 2019',
									Status: 'Approved',
									'': (
										<Dropdown
											mainClass="p-0 md:p-auto"
											icons={
												<BiDotsVerticalRounded className="text-2xl text-gray-800 relative" />
											}
											itemsClasses={{
												root: 'font-sans px-3 md:py-1 hover:text-current text-gray-700',
											}}
											options={[
												{
													name: 'View',
													value: 'View',
												},
												{
													name: 'Pause',
													value: 'Pause',
												},
												{
													name: 'Approved',
													value: 'Approved',
												},
												{
													name: 'Delete',
													value: 'Delete',
												},
											]}
										/>
									),
								},
								{
									id: 2,
									checkbox: <CheckboxAtom />,
									Article_name: 'How Ideeza can make the world a better place',
									Date: '10 jul 2019',
									Status: 'Approved',
									'': (
										<Dropdown
											mainClass="p-0 md:p-auto"
											icons={
												<BiDotsVerticalRounded className="text-2xl text-gray-800 relative" />
											}
											itemsClasses={{
												root: 'font-sans px-3 md:py-1 hover:text-current text-gray-700',
											}}
											options={[
												{
													name: 'View',
													value: 'View',
												},
												{
													name: 'Pause',
													value: 'Pause',
												},
												{
													name: 'Approved',
													value: 'Approved',
												},
												{
													name: 'Delete',
													value: 'Delete',
												},
											]}
										/>
									),
								},
								{
									id: 3,
									checkbox: <CheckboxAtom />,
									Article_name: 'How Ideeza can make the world a better place',
									Date: '10 jul 2019',
									Status: 'Approved',
									'': (
										<Dropdown
											mainClass="p-0 md:p-auto"
											icons={
												<BiDotsVerticalRounded className="text-2xl text-gray-800 relative" />
											}
											itemsClasses={{
												root: 'font-sans px-3 md:py-1 hover:text-current text-gray-700',
											}}
											options={[
												{
													name: 'View',
													value: 'View',
												},
												{
													name: 'Pause',
													value: 'Pause',
												},
												{
													name: 'Approved',
													value: 'Approved',
												},
												{
													name: 'Delete',
													value: 'Delete',
												},
											]}
										/>
									),
								},
								{
									id: 4,
									checkbox: <CheckboxAtom />,
									Article_name: 'How Ideeza can make the world a better place',
									Date: '10 jul 2019',
									Status: 'Approved',
									'': (
										<Dropdown
											mainClass="p-0 md:p-auto"
											icons={
												<BiDotsVerticalRounded className="text-2xl text-gray-800 relative" />
											}
											itemsClasses={{
												root: 'font-sans px-3 md:py-1 hover:text-current text-gray-700',
											}}
											options={[
												{
													name: 'View',
													value: 'View',
												},
												{
													name: 'Pause',
													value: 'Pause',
												},
												{
													name: 'Approved',
													value: 'Approved',
												},
												{
													name: 'Delete',
													value: 'Delete',
												},
											]}
										/>
									),
								},
							]}
						/>
					</TableContainer>
					<Pagination
						handlePage={(e: any) => getAllBlogData({ page: e })}
						pager={pager}
						mainClass="py-6"
					/>
				</div>
			</div>
		</div>
	);
}
