import Loader from '@atoms/loader';
import { setOpenBlockMenu } from '@layouts/private/sidebar/reducer';
import { IBlockCategory } from '@models/code';
import { TreeView } from '@mui/lab';
import ChildCategories from '@organisms/child-categories';
import CustomTreeView from '@organisms/custom-treeview';
import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useThrottle } from 'utils/utils';
import { ApiDataType, apiService } from '../../../utils/request';
import BuiltInBlocks from '../blockly/BuiltInBlocks';

const BlocklySidebar = (props: any) => {
	const { initLoading, categories } = props;
	const dispatch = useDispatch();

	const [search, setSearch] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(initLoading);
	const [category, setCategory] = useState<IBlockCategory[]>(categories);
	const [initRender, setInitRender] = useState<boolean>(true);

	const throttleSearch = useThrottle(search, 700);

	useEffect(() => {
		if (initRender) {
			setInitRender(false);
		}
	}, []);

	useEffect(() => {
		if (!initRender) {
			getCategories();
		}
	}, [throttleSearch]);

	const getCategories = async (page = 1, pageSize = 100) => {
		const params = `?category_type=CODE&page=${page}&page_size=${pageSize}${
			search ? `&search=${search}` : ''
		}`;
		let result: IBlockCategory[] = [];
		setLoading(true);
		const apiData: ApiDataType = {
			method: 'get',
			url: `core/category-project/${params}`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) result = res?.data?.results;
		});
		setCategory(result);
		setLoading(false);
	};

	return (
		<div>
			<div className="border-t pt-4 mb-6">
				<input
					className="form-input search bg-gray-100"
					placeholder="Search"
					onChange={(e: any) => setSearch(e.target.value)}
				/>
			</div>
			<div
				className="w-full custom-treeview"
				id="SideBar-Blockly"
			>
				<TreeView
					aria-label="multi-select"
					defaultCollapseIcon={<FiChevronDown />}
					defaultExpandIcon={<FiChevronRight />}
					multiSelect
					sx={{
						flexGrow: 1,
						maxWidth: 400,
						overflowY: 'auto',
					}}
				>
					<div
						className="relative"
						style={{ minHeight: 'calc(100vh - 400px)' }}
					>
						{loading && (
							<Loader
								type="relative"
								isTransparentBg
							/>
						)}
						<BuiltInBlocks />

						<div
							style={{
								border: '1px solid #eeeeee',
								borderRadius: '10px',
								marginBottom: 10,
								padding: '10px 23px',
							}}
						>
							<div className={'text-sm mb-1'}>
								<b>Categories</b>
							</div>
							{category && Array.isArray(category) && category.length > 0 ? (
								category.map((item: any, index: number) => (
									<CustomTreeView
										key={index}
										title={item?.name}
										onClick={() => {
											item?.has_children
												? undefined
												: dispatch(setOpenBlockMenu(item?.name));
										}}
									>
										{item?.has_children && <ChildCategories parentCat={item} />}
									</CustomTreeView>
								))
							) : (
								<>{!loading && <p>No Category found!</p>}</>
							)}
						</div>
					</div>
				</TreeView>
			</div>
		</div>
	);
};

export default BlocklySidebar;
