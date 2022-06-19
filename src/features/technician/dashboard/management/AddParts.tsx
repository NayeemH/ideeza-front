import Label from '@atoms/label';
import AddPartsTableHeader from '@organisms/addparts-table-header';
import { useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import TabsMoleculeAbout from '@molecules/tabs-about';
import Table from '@organisms/table';
import Pagination from '@molecules/pagination';
import GenericTable from '@organisms/generic-table';
import { apiService } from '../../../../utils/request';
import DataTable from '@organisms/data-table';
import CustomPagination from '@molecules/custom-pagination';
import { MoreVertIcon } from '@mui/icons-material/MoreVert';

const AddParts = () => {
	const [loading, setLoading] = useState<boolean | any>(false);
	const [addedCodeData, setAddedCodeData] = useState([]);
	const [search, setSearch] = useState('');
	const [pager, setPager] = useState({});
	const [page, setPage] = useState(1);
	const [selectedTabApiUrl, setSelectedTabApiUrl] = useState('electronics');
	const ITEMS_PER_PAGE = 10;
	const Alldata = useAppSelector(({ code }) => code); //in this case code is used only to resolve errors
	const loader = useAppSelector(({ code }) => code);
	const handleSearch = (e: any) => setSearch(e.target.value);

	const [electronicBlocks, setElectronicBlocks] = useState<any[]>([]);
	const [codeBlocks, setCodeBlocks] = useState<any[]>([]);
	const [coverBlocks, setCoverBlocks] = useState<any[]>([]);

	const getElectronicBlocks = async (search_query = '') => {
		let url = `/electronic-blocks/`;

		if (search_query !== '') {
			url += `?search=${search_query}`;
		}

		await apiService(
			{
				method: 'get',
				url,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { results } = res.data;
					setElectronicBlocks(results);
					return;
				}
			}
		);
	};

	const getCodeBlocks = async (search_query = '') => {
		let url = `/code-blocks/`;

		if (search_query !== '') {
			url += `?search=${search_query}`;
		}

		await apiService(
			{
				method: 'get',
				url,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { results } = res.data;
					setCodeBlocks(results);
					return;
				}
			}
		);
	};

	const getCoverBlocks = async (search_query = '') => {
		let url = `/cover-blocks/`;

		if (search_query !== '') {
			url += `?search=${search_query}`;
		}

		await apiService(
			{
				method: 'get',
				url,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { results } = res.data;
					setCoverBlocks(results);
					return;
				}
			}
		);
	};

	const handlePage = (e: any) => {
		setPage(e);
		// return dispatch(
		//   onPartsGet({
		//     page: e,
		//     search,
		//     page_size: ITEMS_PER_PAGE,
		//     apiUrl: selectedTabApiUrl,
		//   })
		// );
	};

	useEffect(() => {
		setPage(1);
		// dispatch(
		//   onPartsGet({
		//     page: 1,
		//     search,
		//     page_size: ITEMS_PER_PAGE,
		//     apiUrl: selectedTabApiUrl,
		//   })
		// );
	}, [search, selectedTabApiUrl]);

	useEffect(() => {
		setLoading(loader);
	}, [loader]);

	useEffect(() => {
		// console.log("Alldata = ", JSON.stringify(Alldata));
		if (Alldata) {
			setAddedCodeData(Array.isArray(Alldata) && Alldata.length ? Alldata[0]?.data : []);
			if (Array.isArray(Alldata) && Alldata.length) {
				setPager({
					...pager,
					count: Math.ceil(Alldata[0]?.count / ITEMS_PER_PAGE),
				});
			}
		} else {
			setPager({
				...pager,
				count: 1,
			});
		}
	}, [Alldata]);

	useEffect(() => {
		setPager({
			...pager,
			page,
		});
	}, [page]);

	const [index, setIndex] = useState(0);
	const handleChange = (event: any, newValue: any) => {
		if (newValue === 0) {
			setSelectedTabApiUrl('electronics');
		} else {
			if (newValue === 2) {
				setSelectedTabApiUrl('covers');
			} else {
				setSelectedTabApiUrl('codes');
			}
		}
		setIndex(newValue);
	};

	useEffect(() => {
		if (index === 0) {
			getElectronicBlocks();
		} else if (index === 1) {
			getCodeBlocks();
		} else if (index === 2) {
			getCoverBlocks();
		}
	}, [index]);

	return (
		<div className="pt-4">
			<Label
				value="Manage Electronic, Code & Cover Parts"
				classes={{
					root: 'text-primary tracking-tight font-sans font-bold pb-3 texl-lg 2xl:text-2xl',
				}}
			/>
			<TabsMoleculeAbout
				index={index}
				handleChange={handleChange}
				tabsClasses="md:w-1/3"
				tabClasses="text-base 2xl:text-xl text-left font-sans whitespace-nowrap tracking-tight focus:text-current transform-none text-gray-700"
				tabsData={[
					{
						name: 'Added Electronics',
						component: (
							<div className="w-full bg-white rounded-lg shadow-lg space-y-3 pl-3">
								<AddPartsTableHeader
									handleSearch={handleSearch}
									search={{
										keyDown: (e: any) => {
											if (e.keyCode === 13) {
												const search_content = e.target.value;
												getElectronicBlocks(search_content);
											}
										},
									}}
								/>
								{/* <AddedElectronicTable loading={loading} data={addedCodeData} /> */}
								{/* <AddedElectronicTable
                  loading={loading}
                  data={[1, 2, 3, 4, 5, 6, 7]}
                /> */}

								{/* <GenericTable
									headers={['Name', 'Description', 'Block Type', 'Image']}
									rows={electronicBlocks.map((block: any) => ({
										Name: block?.name,
										Description: block?.description,
										'Block Type': block?.block_type,
										Image: block?.image_svg ? (
											<img
												src={block?.image_svg}
												alt={''}
												style={{ width: 60 }}
											/>
										) : (
											''
										),
									}))}
								/>

								<Pagination
									pager={pager}
									handlePage={handlePage}
									mainClass="py-6"
								/> */}

								<DataTable.Container>
									<DataTable.Header>
										<DataTable.Row>
											<DataTable.Head>Role</DataTable.Head>
											<DataTable.Head>Id</DataTable.Head>
											<DataTable.Head>Name</DataTable.Head>
											<DataTable.Head>Type</DataTable.Head>
											<DataTable.Head>Visibility</DataTable.Head>
											<DataTable.Head>Category</DataTable.Head>
											<DataTable.Head>Sub-Category</DataTable.Head>
											<DataTable.Head />
										</DataTable.Row>
									</DataTable.Header>
									<DataTable.Body>
										{/* {appliedFreelancers &&
											appliedFreelancers.length > 0 &&
											appliedFreelancers.map((item: any, index: number) => (
												<DataTable.Row key={index}>
													<DataTable.Data>{item?.name}</DataTable.Data>
													<DataTable.Data>{item?.status}</DataTable.Data>
													<DataTable.Data>{item?.date_registered}</DataTable.Data>
													<DataTable.Data>{item?.date_applied}</DataTable.Data>
													<DataTable.Data>
														<MoreVertIcon />
													</DataTable.Data>
												</DataTable.Row>
											))} */}
									</DataTable.Body>
								</DataTable.Container>

								<div className={'p-5'}>
									<CustomPagination
										count={100}
										handleChange={handlePage}
										showFirstButton
										showLastButton
									/>
								</div>
							</div>
						),
					},
					{
						name: 'Added Code',
						component: (
							<div className="w-full bg-white rounded-lg shadow-lg space-y-3 pl-3">
								<AddPartsTableHeader
									handleSearch={handleSearch}
									search={{
										keyDown: (e: any) => {
											if (e.keyCode === 13) {
												const search_content = e.target.value;
												getCodeBlocks(search_content);
											}
										},
									}}
								/>
								{/* <AddedElectronicTable loading={loading} data={addedCodeData} /> */}
								{/*<Table />*/}
								{/*<div className="overflow-x-auto">
                  <table className="w-full ml-6 ">
                      <thead>
                      <th>Hello</th>
                      </thead>
                  </table>
                  </div>*/}
								{/* <GenericTable
									headers={['Name', 'Description', 'Block Type', 'Image']}
									rows={codeBlocks.map((block: any) => ({
										Name: block?.name,
										Description: block?.description,
										'Block Type': block?.block_type,
										Image: block?.image_svg ? (
											<img
												src={block?.image_svg}
												alt={''}
												style={{ width: 60 }}
											/>
										) : (
											''
										),
									}))}
								/> */}
								{/* <AddedElectronicTable
                  loading={loading}
                  data={[1, 2, 3, 4, 5, 6, 7]}
                /> */}
								{/* <Pagination
									pager={pager}
									handlePage={handlePage}
									mainClass="py-6"
								/> */}
								Code Blocks
							</div>
						),
					},
					{
						name: 'Added Cover',
						component: (
							<div className="w-full bg-white rounded-lg shadow-lg space-y-3 pl-3">
								<AddPartsTableHeader
									handleSearch={handleSearch}
									search={{
										keyDown: (e: any) => {
											if (e.keyCode === 13) {
												const search_content = e.target.value;
												getCoverBlocks(search_content);
											}
										},
									}}
								/>
								{/* <AddedElectronicTable loading={loading} data={addedCodeData} /> */}
								{/* <AddedElectronicTable
                  loading={loading}
                  data={[1, 2, 3, 4, 5, 6, 7]}
                />{" "} */}
								{/* <GenericTable
									headers={['Name', 'Description', 'Block Type', 'Image']}
									rows={coverBlocks.map((block: any) => ({
										Name: block?.name,
										Description: block?.description,
										'Block Type': block?.block_type,
										Image: block?.image_svg ? (
											<img
												src={block?.image_svg}
												alt={''}
												style={{ width: 60 }}
											/>
										) : (
											''
										),
									}))}
								/>

								<Pagination
									pager={pager}
									handlePage={handlePage}
									mainClass="py-6"
								/> */}
								Cover Blocks
							</div>
						),
					},
				]}
			/>
		</div>
	);
};

export default AddParts;
