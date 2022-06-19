import React from 'react';
import Button from '@atoms/button';
import Label from '@atoms/label';
import SingleWeeklyNotesNew from '@organisms/single-weekly-notes-new';

function WeeklyNotes(props: any) {
	const { toggleOpen, notes } = props;

	// const [notes, setnotes] = useState<any>([]);
	// const [secondNotes, setSecondNotes] = useState<any>([]);
	// const [thirdNotes, setThirdNotes] = useState<any>([]);

	// useEffect(() => {
	// 	if (notes?.length > 0) {
	// 		setnotes(notes?.slice(0, 3));
	// 		setSecondNotes(notes?.slice(3, 6));
	// 		setThirdNotes(notes?.slice(6, 9));
	// 	}
	// }, []);
	// const initialNote = notes[0];
	const weeksOfMonth = [];
	let initialDate = 7;

	// console.log('all notes within 1 month', notes);

	// console.log('initial date', initialDate);
	let count = 0;

	for (let index = 0; index < 4; index++) {
		const initialNoteTime = new Date(notes[0]?.created_at);
		if (initialNoteTime.getDate() - initialDate < 0) {
			initialNoteTime.setMonth(initialNoteTime.getMonth() - 1);
			initialNoteTime.setDate(initialNoteTime.getDate() - initialDate + 30);
		} else initialNoteTime.setDate(initialNoteTime.getDate() - initialDate);

		const latestSevendays =
			notes?.length !== 0 &&
			notes?.slice(count)?.filter((note: any) => {
				return new Date(note?.created_at) > initialNoteTime;
			});

		count += latestSevendays.length;

		latestSevendays.length > 0 &&
			weeksOfMonth.push({
				startingDate: new Date(latestSevendays[0]?.created_at).toDateString(),
				latestSevendays,
			});
		// console.log('callin loopg', index, latestSevendays);

		initialDate += 7;
		if (initialDate > 30) {
			initialDate -= 30;
		}
		// console.log('initial date in loop', initialDate);
	}
	// console.log('weeks of months', weeksOfMonth);
	// console.log('all notes', notes);

	return (
		<>
			<div className="">
				<div className=" lg:mt-8 3xl:mt-[48px] 3xl:w-[1210px] rounded-lg mt-6 py-6 px-10 space-y-8 bg-white">
					<div className="w-full overflow-x-scroll">
						<div className=" flex flex-nowrap w-full   gap-[15px] ">
							{Array.isArray(notes) && notes?.length > 0 ? (
								<>
									{notes.length > 0 &&
										weeksOfMonth?.length > 0 &&
										weeksOfMonth.map((weekData: any) => (
											<div
												key={weekData?.startingDate}
												className="bg-white pb-[20px] w-[590px] shrink-0"
											>
												<SingleWeeklyNotesNew
													toggleOpen={toggleOpen}
													// noteDate={new Date(notes[0].created_at).toDateString()}
													noteDate={weekData?.startingDate}
													notes={weekData?.latestSevendays}
													isMovies={true}
													isKillAustronaut={false}
												/>
											</div>
										))}
								</>
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
			</div>
		</>
	);
}

export default WeeklyNotes;
