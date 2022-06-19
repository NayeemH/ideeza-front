import React from 'react';
import Button from '@atoms/button';
import Label from '@atoms/label';
import SingleSmallWeeklyNotes from '@organisms/single-small-weekly-notes';
function SingleWeeklyNotes(props: any) {
	const { toggleOpen, noteDate, notes, isMovies, isKillAustronaut } = props;
	// console.log(notes);

	return (
		<>
			<div className="px-[20px] pt-[24px] pb-[24px]">
				<Label
					value={noteDate}
					classes={{
						root: `hover-text font-sans text-base xl:text-[20px] font-semibold`,
					}}
				/>
			</div>
			<hr />
			{notes?.map((note: any) => (
				<SingleSmallWeeklyNotes
					key={note?.id}
					startTime={note?.created_at}
					endTime={note?.deadline}
					noteName={note?.title}
					checkBoxSmallNote={false}
				/>
			))}

			{/* {/* <SingleSmallWeeklyNotes noteName={noteName} checkBoxSmallNote={false} /> */}
			{/* <SingleSmallWeeklyNotes noteName={"No name"} checkBoxSmallNote={true} /> */}
			{isKillAustronaut ? (
				<>
					<div className="flex justify-center items-center mt-[20px] gap-[15px] px-[20px]">
						<Button
							value="Kill Austronaut"
							className="text-center font-sans font-normal shadow-none bg-[#F1F1F1] rounded-[5px] py-[15px] px-[10px]"
							// onClick={toggleOpen}
						/>
						<Button
							value="Eat 3 time a day"
							className="text-center font-sans font-normal shadow-none bg-[#F1F1F1] rounded-[5px] py-[15px] px-[10px]"
							// onClick={toggleOpen}
						/>
					</div>
					<div className="flex justify-center mt-[15px]">
						<Button
							value="+ Add A new note"
							className="text-center text-white font-sans bg-primary font-normal shadow-none rounded-[5px] py-[15px] px-[10px]"
							onClick={toggleOpen}
						/>
					</div>
				</>
			) : (
				<div className="flex justify-center items-center mt-[20px] gap-[15px] px-[20px] h-[120px]">
					{isMovies && (
						<Button
							value="Watch movies"
							className="text-center font-sans font-normal shadow-none bg-[#F1F1F1] rounded-[5px] py-[15px] px-[10px]"
							// onClick={toggleOpen}
						/>
					)}

					<Button
						value="+ Add A new note"
						className="text-center text-white font-sans bg-primary font-normal shadow-none rounded-[5px] py-[15px] px-[10px]"
						onClick={toggleOpen}
					/>
				</div>
			)}
		</>
	);
}

export default SingleWeeklyNotes;
