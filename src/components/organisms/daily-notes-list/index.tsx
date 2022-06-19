import React from 'react';
import Button from '@atoms/button';
import NotesDetailList from '../notes-detail-list';
import Label from '@atoms/label';
import { INote } from '@models/notes';
import Loader from '@atoms/loader';
import Pagination from '@molecules/pagination';

function DailyNotesList(props: any) {
	const { toggleOpen, notes, setPager, pager, loading } = props;

	const showPagination = (pager: any) => {
		if (pager.count > 1) {
			return (
				<Pagination
					handlePage={setPager}
					pager={pager}
					mainClass="py-6"
				/>
			);
		}
	};

	return (
		<>
			{loading ? (
				<div className="relative h-full w-full">
					<Loader type="relative" />
				</div>
			) : (
				<>
					{Array.isArray(notes) && notes?.length > 0 ? (
						notes.map((item: INote) => (
							<NotesDetailList
								key={item.id}
								note={item}
							/>
						))
					) : (
						<div className="flex flex-col w-full h-50vh overflow-auto justify-center items-center p-4">
							<Label
								value="Your notes are clear. Should you add new more?"
								classes={{
									root: 'text-lg md:text-xl text-gray-700 font-proxima-nova tracking-tight mb-5',
								}}
							/>
							<Button
								value="+ Add A new note"
								className="text-center text-white font-proxima-nova bg-primary font-normal"
								onClick={toggleOpen}
								color="primary"
							/>
						</div>
					)}
					{showPagination(pager)}

					<div className="mt-8">
						<Button
							value="watch movies"
							className="font-proxima-nova font-semibold text-base capitalize bg-white rounded-[5px] py-[15px] px-[30px] mr-5"
						/>
						{notes?.length !== 0 && (
							<Button
								value="+ Add New Note"
								onClick={toggleOpen}
								className="font-proxima-nova font-semibold text-base capitalize bg-primary text-white tracking-tight rounded-[5px] py-[15px] px-[30px]"
								color="primary"
							/>
						)}
					</div>
				</>
			)}
		</>
	);
}

export default DailyNotesList;
