import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { CategoryItem } from './CategoryItem';
import { CategoryEntryDialog } from './CategoryEntryDialog';
import { CategoryDeleteDialog } from './CategoryDeleteDialog';

const useStyles = makeStyles(() => ({
	root: {
		background: '#ffffff',
		border: '1px solid #dddddd',
		borderRadius: '10px',
		width: 500,
	},

	searchBar: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '13px 25px',
		borderBottom: '1px solid #dddddd',

		'& input': {
			border: 0,
			outline: 0,
			width: '100%',
			height: '40px',
			marginLeft: 5,
		},
	},

	categories: {
		padding: '15px',
		height: '300px',
	},
}));

const ManageCategoryTree = () => {
	const classes = useStyles();
	const [newCategoryDialogOpen, setNewCategoryDialogOpen] = useState<boolean>(false);
	const [deleteCategoryDialogOpen, setDeleteCategoryDialogOpen] = useState<boolean>(false);
	const [selectedDeleteCategoryId, setSelectedDeleteCategoryId] = useState<number>(0);

	const selectCategoryForDelete = (categoryId: number) => {
		setSelectedDeleteCategoryId(categoryId);
		setDeleteCategoryDialogOpen(true);
	};

	return (
		<>
			<div className={classes.root}>
				<div className={classes.searchBar}>
					<SearchIcon />
					<input
						type={'search'}
						placeholder={'Search through categories'}
					/>
				</div>

				<div className={classes.categories}>
					<CategoryItem onDelete={selectCategoryForDelete}>
						<CategoryItem onDelete={selectCategoryForDelete} />
					</CategoryItem>
				</div>

				<div
					className={
						'flex justify-center items-center p-[15px] text-primary cursor-pointer hover:opacity-[0.5]'
					}
					style={{ borderTop: '1px solid #dddddd' }}
					onClick={() => setNewCategoryDialogOpen(true)}
				>
					<AddIcon />
					<span>Add new category</span>
				</div>
			</div>

			{/* Add new category*/}
			<CategoryEntryDialog
				open={newCategoryDialogOpen}
				onClose={() => setNewCategoryDialogOpen(false)}
			/>

			{/* Delete category*/}
			<CategoryDeleteDialog
				open={deleteCategoryDialogOpen}
				onClose={() => setDeleteCategoryDialogOpen(false)}
				categoryId={selectedDeleteCategoryId}
			/>
		</>
	);
};

export default ManageCategoryTree;
