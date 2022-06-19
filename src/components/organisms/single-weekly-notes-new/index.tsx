import React from 'react';
import Label from '@atoms/label';
import NotesDetailWeekly from '@organisms/notes-detail-weekly';

function SingleWeeklyNotesNew(props: any) {
	const { noteDate, notes } = props;
	// console.log(notes);

	return (
		<>
			<div className="px-[10px] pt-[24px] pb-[24px] weekbg shrink-0">
				<Label
					value={noteDate}
					classes={{
						root: `hover-text pl-[50px] pt-[20px] mb-[20px] text-base xl:text-[20px] font-semibold`,
					}}
				/>
				<div className="overflow-y-auto h-[250px] pl-[28px] flex justify-center items-start">
					<div className="grid sm:grid-cols-2 gap-[42px] ">
						{notes.map((item: any) => {
							return (
								<NotesDetailWeekly
									key={item.id}
									singleNote={item}
								/>
							);
						})}
					</div>
				</div>
			</div>
			<hr />
		</>
	);
}

export default SingleWeeklyNotesNew;
