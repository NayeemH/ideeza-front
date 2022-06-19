import { setOpenBlockMenu } from '@layouts/private/sidebar/reducer';
import CustomTreeView from '@organisms/custom-treeview';
import React from 'react';
import { useDispatch } from 'react-redux';

const BuiltInBlocks = () => {
	const dispatch = useDispatch();
	const builtInCategories = [
		'Logic',
		'Loops',
		'Math',
		'Text',
		'Lists',
		'Colour',
		'Functions',
		'Variables',
	];

	return (
		<div
			style={{
				border: '1px solid #eeeeee',
				borderRadius: '10px',
				marginBottom: 10,
				padding: '10px 23px',
			}}
		>
			<div className={'text-sm mb-1'}>
				<b>System Defined</b>
			</div>

			<CustomTreeView
				key={'built-in'}
				title={'Built-in'}
				onClick={() => {
					dispatch(setOpenBlockMenu('Built-in'));
				}}
			>
				{builtInCategories.map((category) => (
					<CustomTreeView
						key={category}
						title={category}
						onClick={() => {
							dispatch(setOpenBlockMenu(category));
						}}
					>
						{category}
					</CustomTreeView>
				))}
			</CustomTreeView>
		</div>
	);
};

export default BuiltInBlocks;
