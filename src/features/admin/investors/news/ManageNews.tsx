import CheckboxAtom from '@atoms/checkbox';
import Dropdown from '@atoms/drop-down';
import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import { TableContainer } from '@mui/material';
import BlogsTableHeader from '@organisms/blogs-table-header';
import GenericTable from '@organisms/generic-table';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsPlus } from 'react-icons/bs';
import { apiService } from 'utils/request';
import Loader from '@atoms/loader';

export default function ManageNews() {
	const router = useRouter();
	const [news, setNews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pager, setPager] = useState<any>({ page: 1, count: 1, totalBlogs: 0 });
	// const getAllBlogData = (payload: any) => console.warn(payload);
	const [row, setRow] = useState<number>(0);
	const [name, setName] = useState<string>('');

	const AddArticle = () => {
		router.push('/admin/investors/news/add-new');
	};
	const getAllNews = async (value: string) => {
		await apiService(
			{
				method: 'get',
				url: `/investor/news/?search=${value || ''}&page=${pager.page}&page_size=10`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					setNews(data?.results);
					setLoading(false);
					return;
				}

				setLoading(false);
			}
		);
	};
	const handleDelete = async () => {
		const confirmDelete = confirm('Are You sure to delete this news?');
		if (confirmDelete) {
			await apiService(
				{
					method: 'delete',
					url: `/investor/news/${row}/`,
					token: true,
				},
				(res: any) => {
					if (res) {
						getAllNews('');

						return;
					}

					setLoading(false);
				}
			);
		}
	};

	useEffect(() => {
		getAllNews('');
	}, [pager.page]);

	const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
		setPager({ ...pager, page: value });
	};

	const showPagination = () => {
		if (news) {
			if (news?.length > 0 && pager.page !== 1) {
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

	let updatedNews: any[] = [];

	if (news?.length !== 0) {
		updatedNews = news.map((n: any) => ({
			id: n.id,
			checkbox: <CheckboxAtom />,
			News_name: n?.title,
			Category: n?.category?.name,
			Date: n?.updated_at ? new Date(n?.updated_at).toDateString() : null,
			// Date: n?.updated_at,
			'': (
				<Dropdown
					mainClass="p-0 md:p-auto"
					icons={<BiDotsVerticalRounded className="text-2xl text-gray-800 relative" />}
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
		}));
	}

	return (
		<div>
			<div className="lg:w-4/5 pt-4 mx-auto">
				{loading ? (
					<Loader />
				) : (
					<>
						<Label
							value="Manage News"
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
									setRow={setRow}
									setName={setName}
									headers={[
										'checkbox',
										'News_name',
										'Category',
										'Date',
										'Status',
										'',
									]}
									rowClicked="/admin/users/marketing/success-story"
									rows={updatedNews}
									dropDownOptions={[
										{
											name: 'View',
											value: 'View',
											func: () =>
												router.push(`/admin/investors/news/${name}/${row}`),
										},
										// {
										//   name: "Pause",
										//   value: "Pause",
										//   func: () => console.log("view"),
										// },
										// {
										//   name: "Approved",
										//   value: "Approved",
										//   func: () => console.log("view"),
										// },
										{
											name: 'Delete',
											value: 'Delete',
											func: handleDelete,
										},
									]}
								/>
							</TableContainer>
							{showPagination()}
							{/* <Pagination
						handlePage={(e: any) => getAllBlogData({ page: e })}
						pager={pager}
						mainClass="py-6"
					/> */}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
