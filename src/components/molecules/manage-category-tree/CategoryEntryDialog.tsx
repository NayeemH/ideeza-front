import React from 'react';
import { Dialog } from '@mui/material';
import Button from '@atoms/button';
import { makeStyles } from '@material-ui/core/styles';
import { useInput } from '../../../app/hooks';
import { apiService } from '../../../utils/request';

interface CategoryEntryDialogProps {
	open: boolean;

	onClose(): void;
}

const useStyles = makeStyles(() => ({
	entryInput: {
		padding: '10px 15px',
		border: '1px solid #dddddd',
		borderRadius: '10px',
		outline: 0,
		width: '100%',
	},
}));

const CategoryEntryDialog: React.FC<CategoryEntryDialogProps> = (props) => {
	const classes = useStyles();
	const { bind: bindCategoryName, value: category_name } = useInput('');

	const createCategory = () => {
		apiService(
			{
				method: 'get',
				url: `/`,
				token: true,
				data: {
					name: category_name,
				},
			},
			(res: any) => {
				if (res) {
					// const { data } = res;
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
				<div className={'p-[14px] font-bold'}>Add new category</div>
				<div className={'p-[14px] font-bold'}>
					<input
						className={classes.entryInput}
						placeholder={'Enter category name'}
						{...bindCategoryName}
					/>

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
							value={'Create'}
							className={'bg-primary text-white hover:bg-white hover:text-primary'}
							variant={'outlined'}
							onClick={createCategory}
						/>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export { CategoryEntryDialog };
