import React from 'react';
import Label from '@atoms/label';

import { AiFillEdit, AiOutlineClose } from 'react-icons/ai';

const DoWork = () => {
	return (
		<>
			<div className="hover:cursor-pointer hover:bg-gray-100">
				<Label
					value="Do Work"
					className="font-semibold md:text-2xl "
				/>
				<div className=" flex justify-between">
					<Label
						value={new Date().toDateString()}
						className="text-gray-400 md:text-lg"
					/>
					<div className=" flex justify-between">
						<AiFillEdit className="text-lg text-semibold" />
						<AiOutlineClose />
					</div>
				</div>
			</div>
		</>
	);
};

export default DoWork;
