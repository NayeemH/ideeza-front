import SidebarDrawer from '@organisms/drawer';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { NextRouter, withRouter } from 'next/router';
import { useAppSelector } from 'app/hooks';
import BlocklySidebar from '@organisms/blockly-sidebar';
import ElectronicsSidebar from '@organisms/electronics-sidebar';
import CoverSidebar from '@organisms/cover-sidebar';
import PackageSidebar from '@organisms/packages-sidebar';
import ProductsSidebar from '@organisms/products-sidebar';
import SidebarBlockMenu from '@organisms/sidebar-block-menu';
import { IBlockCategory } from '@models/code';
import { ApiDataType, apiService } from 'utils/request';
import { BLOCK_CATEGORY_TYPE } from 'enums/common';

interface WithRouterProps {
	router: NextRouter;
}

interface PrivateSidebarProps extends WithRouterProps {
	openMobile: boolean;
	open: boolean;
	toggle: () => void;
	toggleMobile: () => void;
	list: any;
	hasBackBtn?: boolean;
}

const SidebarBlockMenuList = () => {
	return <SidebarBlockMenu />;
};

const PrivateSidebar: React.FC<PrivateSidebarProps> = ({
	open,
	toggle,
	list,
	hasBackBtn,
	openMobile,
	toggleMobile,
}) => {
	const router = useRouter();
	const currentTabMenu = useAppSelector((state) => state.sidebar.currentTabMenu);
	const customizeMenu = useAppSelector((state) => state.sidebar.customizeMenu);
	const [catLoading, setCatLoading] = useState<boolean>(false);
	const [blockCategories, setBlockCategories] = useState<IBlockCategory[]>([]);

	useEffect(() => {
		if (
			currentTabMenu === 'Customize' &&
			(customizeMenu === 'blockly' ||
				customizeMenu === 'electronics' ||
				customizeMenu === 'cover')
		) {
			getBlockCategories(BLOCK_CATEGORY_TYPE[customizeMenu]);
		}
	}, [customizeMenu, currentTabMenu]);

	const getBlockCategories = async (type: string, page = 1, pageSize = 100) => {
		const params = `?category_type=${type}&page=${page}&page_size=${pageSize}`;
		let result: IBlockCategory[] = [];
		setCatLoading(true);
		const apiData: ApiDataType = {
			method: 'get',
			url: `core/category-project/${params}`,
			token: true,
		};

		await apiService(apiData, (res: any) => {
			if (res) result = res?.data?.results;
		});
		setBlockCategories(result);
		setCatLoading(false);
	};

	return (
		<div className="absolute">
			<SidebarDrawer
				hasBackBtn={hasBackBtn}
				open={open}
				toggle={toggle}
				toggleMobile={toggleMobile}
				openMobile={openMobile}
				location={router.pathname}
				list={list}
				hasSidebarTab={customizeMenu !== 'none'}
			>
				<div className="w-full px-5 mt-4">
					{customizeMenu === 'cover' && (
						<>
							<CoverSidebar
								categories={blockCategories}
								initLoading={catLoading}
							/>
						</>
					)}

					{customizeMenu === 'blockly' && (
						<BlocklySidebar
							categories={blockCategories}
							initLoading={catLoading}
						/>
					)}

					{customizeMenu === 'electronics' && (
						<ElectronicsSidebar
							categories={blockCategories}
							initLoading={catLoading}
						/>
					)}

					{customizeMenu === 'packages' && <PackageSidebar />}
					{customizeMenu === 'product' && <ProductsSidebar />}
				</div>
			</SidebarDrawer>

			<SidebarBlockMenuList />
		</div>
	);
};

export default withRouter(PrivateSidebar);
