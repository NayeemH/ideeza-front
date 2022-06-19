import React from 'react';
import { IconButton as Icon } from '@mui/material';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
type IProps = {
	handlePage: (page?: number) => void;
	page: number;
	loading?: boolean | undefined;
	count?: number;
	children?: React.ReactNode;
	pager?: any;
};
function IconButton({ handlePage, page, loading, count, pager }: IProps) {
	return (
		<div className={` flex items-center `}>
			<Icon
				disabled={loading || page === 1}
				onClick={() => handlePage({ ...pager, page: page - 1 })}
				classes={{
					root: `rounded-none px-2 py-2 rounded-l ${
						loading || page === 1 ? ' bg-gray-200' : ' bg-primary hover:bg-primary'
					}`,
				}}
				color="primary"
			>
				<FaChevronLeft
					color="white"
					fontSize="16"
				/>
			</Icon>
			<Icon
				disabled={loading || count === page}
				onClick={() => handlePage({ ...pager, page: page + 1 })}
				classes={{
					root: `rounded-none px-2 py-2 rounded-r ${
						loading || count === page ? ' bg-gray-200' : ' bg-primary hover:bg-primary'
					}`,
				}}
				color="primary"
			>
				<FaChevronRight
					color="white"
					fontSize="16"
				/>
			</Icon>
		</div>
	);
}

export default IconButton;
