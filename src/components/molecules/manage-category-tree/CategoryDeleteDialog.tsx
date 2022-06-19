import React from 'react';
import { Dialog } from '@mui/material';
import Button from '@atoms/button';
import { apiService } from '../../../utils/request';
import { toast } from 'react-toastify';

interface CategoryEntryDialogProps {
	open: boolean;
	onClose(): void;
	categoryId: number;
}

const CategoryDeleteDialog: React.FC<CategoryEntryDialogProps> = (props) => {
	const deleteCategory = () => {
		apiService(
			{
				method: 'get',
				url: `/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					// const { data } = res;
					toast.success('Category deleted successfully!');
					if (props.onClose) {
						props.onClose();
					}
					return;
				}
			}
		);
	};

	return (
		<>
			<Dialog
				open={props.open}
				onClose={props.onClose}
				sx={{
					'& .MuiPaper-root': {
						width: 400,
					},
				}}
			>
				<div className={'p-[14px] font-bold'}>Delete category</div>
				<div className={'p-[14px]'}>
					<div>Are you sure to delete this category?</div>

					<div className={'mt-2 text-right'}>
						<Button
							value={'Cancel'}
							className={
								'bg-white text-primary hover:bg-primary hover:text-white mr-2'
							}
							variant={'outlined'}
							onClick={props.onClose}
						/>
						<Button
							value={'Delete'}
							className={'bg-primary text-white hover:bg-white hover:text-primary'}
							variant={'outlined'}
							onClick={deleteCategory}
						/>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export { CategoryDeleteDialog };
