import Button from '@atoms/button';
import Date from '@atoms/date';
import Label from '@atoms/label';
import React, { useState } from 'react';
import { ImAttachment } from 'react-icons/im';
import AssignMembers from './AssignMembers';

const TaskDescription = () => {
	const [showMembers, setShowMembers] = useState(false);
	return (
		<div className="grid grid-cols-3">
			<div className="col-span-2 overflow-scroll">
				<Label
					value="Task Description"
					className="text-2xl font-bold"
				/>
				<textarea
					name=""
					id=""
					cols={30}
					rows={10}
					placeholder="Write here..."
					className="text-gray-300 focus:outline-none border border-gray-300 p-4 rounded-md"
				></textarea>
			</div>
			<div className="text-[#101010] pl-3">
				<div className="flex">
					<Label
						value="Project Duration"
						className="text-xl mb-3"
					/>
					<Date noLabel={true} />
				</div>

				<div className="grid grid-cols-3 mb-2">
					<Label
						value="Mark Status"
						className="text-lg col-span-2"
					/>
					<select
						className="ml-2 text-zinc-300 focus:outline-none"
						name=""
						id=""
					>
						<option value="">waiting</option>
						<option value="">dating</option>
					</select>
				</div>
				<div className="grid grid-cols-3 mb-2">
					<Label
						value="Category"
						className="text-lg col-span-2"
					/>
					<select
						className="ml-2 text-zinc-300 focus:outline-none"
						name=""
						id=""
					>
						<option value="">electronics</option>
						<option value="">code</option>
						<option value="">cover</option>
					</select>
				</div>
				<div className="flex items-center mb-2">
					<Label
						value="Assigned members:"
						className="text-lg "
					/>

					<Button
						value="Add"
						className="text-white ml-3 font-bold px-2 py-0 bg-primary min-w-fit h-8  relative"
						color="primary"
						size="small"
						variant="outlined"
						onClick={() => setShowMembers((prev) => !prev)}
					/>
					{showMembers && (
						<AssignMembers wrapperClasses="absolute shadow-2xl bg-white p-4 right-20 h-48 w-56 mt-40 overflow-scroll" />
					)}
				</div>
				<Label
					value={<>Attachments</>}
					className="font-bold text-2xl"
				/>
				<Label
					value={
						<>
							<ImAttachment className="text-primary font-bold" />{' '}
							<Label
								value="Add Attachment +"
								className="text-primary cursor-pointer"
							/>
						</>
					}
					className="flex items-center mt-4"
				/>
			</div>
		</div>
	);
};

export default TaskDescription;
