import Label from '@atoms/label';
import React from 'react';

const FinishedTask = () => {
	return (
		<div className="">
			<div className="flex flex-col items">
				<Label
					value="Congratulations, you have finished the Task!"
					className="font-semibold text-2xl mt-4"
				/>
				<Label
					value="Tell us about your opinion about this task"
					className="text-lg text-primary"
				/>
				<textarea
					name=""
					id=""
					cols={20}
					rows={10}
					placeholder="Write here..."
					className="focus:outline-none border border-gray-400 p-4 rounded-md text-gray-300 mt-2"
				></textarea>
			</div>
		</div>
	);
};

export default FinishedTask;
