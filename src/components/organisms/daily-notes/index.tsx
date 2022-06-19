import React from 'react';
import Button from '@atoms/button';
import NotesDetail from '../notes-detail';
import { INote } from '@models/notes';
import Label from '@atoms/label';
import Loader from '@atoms/loader';
import Pagination from '@molecules/pagination';

function DailyNotes(props: any) {
	const {
		onDeleteClicked,
		toggleOpen,
		notes,
		onClickNoteOpen,
		open,
		onEditClicked,
		threeDotCloseEdit,
		setPager,
		pager,
		loading,
	} = props;
	const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
		setPager((prev: any) => {
			return { ...prev, page: value };
		});
	};

	const showPagination = (pager: any) => {
		if (pager.count > 1) {
			return (
				<Pagination
					// handlePage={setPager}
					handlePage={handlePagination}
					pager={pager}
					mainClass="py-6"
					articlePerPage={15}
				/>
			);
		}
	};
	// console.log(loading);

	return (
		<>
			{loading ? (
				<div className="relative h-full w-full bg-white">
					<Loader type="relative" />
				</div>
			) : (
				<div className="bg-white mt-[45px] pr-2 w-full 3xl:pl-[40px] lg:pl-[20px] 2xl:pl-[30px]  pt-3 lg:pt-[20px] rounded-[10px] border border-[#E9E9E9] min-h-full">
					<div className="overflow-y-auto space-y-8">
						<div className="">
							{Array.isArray(notes) && notes?.length > 0 ? (
								<div className="w-full 2xl:max-w-[1227px] flex justify-center ">
									<div className="w-full h-[590px] overflow-y-auto grid sm:grid-cols-2 xl:grid-cols-3 2.5xl:grid-cols-4 gap-2 2xl:gap-4 2xl:py-10 2xl:pl-0 mr-2 2.5xl:pr-6 3xl:pr-0 ">
										{notes?.map((item: INote) => {
											return (
												<NotesDetail
													key={item.id}
													singleNote={item}
													onDeleteClicked={() =>
														onDeleteClicked(item?.id)
													}
													onEditClicked={onEditClicked}
													onClickNoteOpen={onClickNoteOpen}
													open={open}
													threeDotCloseEdit={threeDotCloseEdit}
												/>
											);
										})}
									</div>
								</div>
							) : (
								<div className="flex flex-col w-full h-50vh overflow-auto justify-center items-center p-4">
									<Label
										value="Your notes are clear. Should you add new more?"
										classes={{
											root: 'text-lg md:text-xl text-gray-700 font-sans tracking-tight mb-5',
										}}
									/>
									<Button
										value="+ Add A new note"
										className="text-center text-white font-sans bg-primary font-normal"
										onClick={toggleOpen}
										color="primary"
									/>
								</div>
							)}
							{showPagination(pager)}
						</div>
					</div>
					<div className=" pt-4 pb-4 2xl:pt-6 2xl:pb-7 3xl:pt-[37px] 3xl:pb-10">
						{notes?.length !== 0 && (
							<Button
								value="+ Add New Note"
								onClick={toggleOpen}
								className="font-proxima-nova font-semibold text-base capitalize bg-primary text-white tracking-tight rounded-[5px] py-[15px] px-[30px]"
								color="primary"
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default DailyNotes;
