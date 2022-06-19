import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

const useStyles = makeStyles(() => ({
	categoryItem: {
		'& .item': {
			padding: '10px',
			borderRadius: '10px',
			transition: '0.2s',
			cursor: 'pointer',

			'& .action-button': {
				visibility: 'hidden',
			},

			'&:hover': {
				background: '#f2f2f2',

				'& .action-button': {
					visibility: 'visible',
				},
			},
		},

		'& .entry-input': {
			padding: '10px 15px',
			border: '1px solid #dddddd',
			borderRadius: '10px',
			outline: 0,
			width: '100%',
		},

		'& .children': {},
	},
}));

interface CategoryItemProps {
	children?: React.ReactNode;
	onDelete?(categoryId: number): void;
}

export const CategoryItem: React.FC<CategoryItemProps> = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState<boolean>(false);
	const [edit, setEdit] = useState<boolean>(false);
	const [newEntry, setNewEntry] = useState<boolean>(false);

	const handleClickEdit = (e: any) => {
		e.stopPropagation();
		setEdit(true);
	};

	const handleClickNewEntry = (e: any) => {
		e.stopPropagation();
		setOpen(true);
		setNewEntry(true);
	};

	const handleClickDelete = (e: any) => {
		e.stopPropagation();
		if (props.onDelete) {
			props.onDelete(1);
		}
	};

	const handleClickOpen = (e: any) => {
		e.stopPropagation();
		if (!edit) {
			setOpen(!open);
		}
	};

	return (
		<div className={classes.categoryItem}>
			<div
				className={'item flex justify-between items-center'}
				onClick={handleClickOpen}
			>
				{!edit ? (
					<>
						{props.children ? (
							<div>
								{open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
							</div>
						) : (
							<div className={'w-[6px]'} />
						)}
						<div className={'w-full ml-1'}>Test Category</div>
						<div className={'action-button'}>
							<IconButton
								size={'small'}
								onClick={handleClickEdit}
							>
								<EditIcon style={{ fontSize: 19 }} />
							</IconButton>
						</div>
						<div className={'action-button'}>
							<IconButton
								size={'small'}
								onClick={handleClickDelete}
							>
								<CloseIcon />
							</IconButton>
						</div>
						<div className={'action-button'}>
							<IconButton
								size={'small'}
								onClick={handleClickNewEntry}
							>
								<AddIcon />
							</IconButton>
						</div>
					</>
				) : (
					<>
						<input
							type={'text'}
							className={'entry-input'}
							placeholder={'Enter category name'}
						/>
						<IconButton
							size={'small'}
							onClick={() => setEdit(false)}
						>
							<CheckIcon />
						</IconButton>
						<IconButton
							size={'small'}
							onClick={() => setEdit(false)}
						>
							<CloseIcon />
						</IconButton>
					</>
				)}
			</div>
			{open && <div className={'children pl-[20px]'}>{props?.children}</div>}

			{newEntry && (
				<div className={'pl-[38px] flex justify-between items-center'}>
					<input
						type={'text'}
						className={'entry-input mr-2'}
						placeholder={'Enter category name'}
					/>
					<IconButton
						size={'small'}
						onClick={() => setNewEntry(false)}
					>
						<CheckIcon />
					</IconButton>
					<IconButton
						size={'small'}
						onClick={() => setNewEntry(false)}
					>
						<CloseIcon />
					</IconButton>
				</div>
			)}
		</div>
	);
};
