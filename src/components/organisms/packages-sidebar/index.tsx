import { TreeItem, TreeView } from '@mui/lab';
import React from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import {
	setOpenBlockMenu,
	setSidebarSelectedPackageMode,
	setSidebarSelectedPackageType,
} from '@layouts/private/sidebar/reducer';
import { useAppDispatch } from '../../../app/hooks';
// import InfiniteScroll from "react-infinite-scroller";

export default function PackageSidebar() {
	const dispatch = useAppDispatch();
	const openPackageBlockMenu = (data: { type: 'body' | 'leg'; mode: 'public' | 'private' }) => {
		dispatch(setOpenBlockMenu('packages'));
		dispatch(setSidebarSelectedPackageType(data.type));
		dispatch(setSidebarSelectedPackageMode(data.mode));
	};

	return (
		<div>
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
					<TreeItem
						nodeId="Body type"
						label="Body type"
						className="font-sans py-1.5"
					>
						<TreeItem
							nodeId="Body type public"
							label="public"
							className="py-1.5"
							onClick={() =>
								openPackageBlockMenu({
									type: 'body',
									mode: 'public',
								})
							}
						/>

						<TreeItem
							nodeId="Body type private"
							label="private"
							className="py-1.5"
							onClick={() =>
								openPackageBlockMenu({
									type: 'body',
									mode: 'private',
								})
							}
						/>
					</TreeItem>

					<TreeItem
						nodeId="Leg type"
						label="Leg type"
						className="font-sans py-1.5"
					>
						<TreeItem
							nodeId="Leg type public"
							label="public"
							className="py-1.5"
							onClick={() =>
								openPackageBlockMenu({
									type: 'leg',
									mode: 'public',
								})
							}
						/>

						<TreeItem
							nodeId="Leg type private"
							label="private"
							className="py-1.5"
							onClick={() =>
								openPackageBlockMenu({
									type: 'leg',
									mode: 'private',
								})
							}
						/>
					</TreeItem>

					{/*<TreeItem nodeId="5" label="Sensors">
            <TreeItem nodeId="6" label="MUI">
              <TreeItem nodeId="7" label="src">
                <TreeItem nodeId="8" label="index.js" />
                <TreeItem nodeId="9" label="tree-view.js" />
              </TreeItem>
            </TreeItem>
          </TreeItem>
          <TreeItem nodeId="10" label="Network">
            <TreeItem nodeId="11" label="MUI">
              <TreeItem nodeId="12" label="src">
                <TreeItem nodeId="13" label="index.js" />
                <TreeItem nodeId="16" label="tree-view.js" />
              </TreeItem>
            </TreeItem>
          </TreeItem>*/}
				</TreeView>
			</div>
		</div>
	);
}
