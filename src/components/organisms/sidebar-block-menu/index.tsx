import CoverBlockMenu from '@features/technician/cover/CoverBlockMenu';
import ElectronicsBlockMenu from '@features/technician/electronics/ElectronicsBlockMenu';
import PackagesMenu from '@features/technician/electronics/PackagesMenu';
import ProductsBlockMenu from '@features/technician/product/ProductsBlockMenu';
import { setBlock, setBlockData, setSelectedThreeDScript } from '@layouts/private/sidebar/reducer';
import { ICodeBlock } from '@models/code';
import BlocklyToolBox from '@organisms/blockly/toolBox';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const SidebarBlockMenu = () => {
	const dispatch = useAppDispatch();
	const userRole = useAppSelector((state) => state?.auth?.userData?.role);

	const openBlockMenu = useAppSelector((state) => state?.sidebar?.openBlockMenu);
	const customizeMenu = useAppSelector((state) => state?.sidebar?.customizeMenu);
	const selectedBlock = useAppSelector(({ sidebar }) => sidebar?.block);

	const selectedBlockItem = (item: ICodeBlock) => {
		dispatch(setBlock([...selectedBlock, item]));
	};

	const selectedPartItem = (item: ICodeBlock) => {
		const id = item?.id;
		const block_type = item?.block_type;
		dispatch(setBlockData({ id, block_type }));
		dispatch(setSelectedThreeDScript((item as any)?.three_d_script));
	};

	return (
		<>
			{customizeMenu === 'blockly' && openBlockMenu ? (
				<BlocklyToolBox
					selectCat={openBlockMenu}
					selectedBlock={selectedBlockItem}
					userRole={userRole}
				/>
			) : customizeMenu === 'electronics' && openBlockMenu ? (
				<ElectronicsBlockMenu
					selectCat={openBlockMenu}
					selectedBlock={selectedPartItem}
					userRole={userRole}
				/>
			) : customizeMenu === 'cover' && openBlockMenu ? (
				<CoverBlockMenu
					selectCat={openBlockMenu}
					selectedBlock={selectedPartItem}
					userRole={userRole}
				/>
			) : customizeMenu === 'packages' && openBlockMenu ? (
				<PackagesMenu selectedBlock={selectedPartItem} />
			) : customizeMenu === 'product' && openBlockMenu ? (
				<ProductsBlockMenu
					selectCat={openBlockMenu}
					selectedBlock={selectedPartItem}
				/>
			) : null}
		</>
	);
};

export default SidebarBlockMenu;
