import Label from '@atoms/label';
import Pagination from '@molecules/pagination';
import { TableContainer } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { useEffect, useState } from 'react';
import ReviewList from './reviewList';
import { getTrackingReviewsAsync } from './reducer';

export default function Review() {
	const dispatch = useAppDispatch();
	const [pager] = useState({ page: 1 });
	const handlePage = (e: any) => {
		console.warn(e);
	};
	useEffect(() => {
		dispatch(getTrackingReviewsAsync(pager));
	}, []);
	return (
		<div className="pt-4">
			<Label
				value="Project Tracking"
				classes={{
					root: 'text-primary font-sans font-bold pb-3 text-xl',
				}}
			/>
			<div className="w-full bg-white rounded-lg shadow">
				<TableContainer className="overflow-x-auto max-w-95vh h-96">
					<ReviewList />
				</TableContainer>
				<Pagination
					pager={pager}
					handlePage={handlePage}
					mainClass="py-6"
				/>
			</div>
		</div>
	);
}
