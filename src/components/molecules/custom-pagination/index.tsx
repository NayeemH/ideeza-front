import { Pagination, Stack } from '@mui/material';
import PaginationItem from '@mui/material/PaginationItem';
import { FC } from 'react';

const Prev: FC<any> = () => {
	return (
		<div>
			<img
				src="/images/icon/pagi-icon-left.svg"
				alt="prev"
			/>
		</div>
	);
};
const Next: FC<any> = () => {
	return (
		<div>
			<img
				src="/images/icon/pagi-icon-right.svg"
				alt="prev"
			/>
		</div>
	);
};

const CustomPagination: FC<any> = (props) => {
	const { pageCount, currentPage, handleChange, ...rest } = props;
	return (
		<div className="custom-pagi flex items-center justify-center mb-8 md:mb-0">
			<Stack spacing={2}>
				<Pagination
					count={pageCount}
					page={currentPage}
					onChange={handleChange}
					className="text-base"
					variant="outlined"
					shape="rounded"
					color="secondary"
					classes={{ root: 'rounded-[100px]' }}
					renderItem={(item) => (
						<PaginationItem
							// components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
							components={{ previous: Prev, next: Next }}
							{...item}
						/>
					)}
					{...rest}
				/>
			</Stack>
		</div>
	);
};

CustomPagination.defaultProps = {
	variant: 'outlined',
	shape: 'rounded',
	color: 'secondary',
};

export default CustomPagination;
