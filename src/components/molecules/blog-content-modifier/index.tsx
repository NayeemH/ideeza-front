import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
// import { HiOutlineDotsVertical } from "react-icons/hi";

const BlogContentModifier = ({ icon, options }: any) => {
	const [showOptions, setShowOptions] = useState(false);
	return (
		<>
			<span onClick={() => setShowOptions(true)}>{icon}</span>

			{/* <HiOutlineDotsVertical
        className={
          (showOptions ? "text-ideeza-300 " : "text-gray-500 ") +
          `text-3xl  cursor-pointer relative`
        }
        onClick={() => setShowOptions(true)}
      /> */}
			{showOptions && (
				<div
					onClick={() => setShowOptions(false)}
					className="modify-options-removal"
				></div>
			)}

			{showOptions && (
				<>
					<div className="bg-white px-2 py-3 font-sans text-base absolute z-10 shadow-md rounded-lg">
						<AiOutlineClose
							className="text-ideeza-300 text-sm float-right cursor-pointer shadow"
							onClick={() => setShowOptions(false)}
						/>
						<ul className="">
							{options.map((option: any) => (
								<li key={option}>{option}</li>
							))}
						</ul>
					</div>
				</>
			)}
		</>
	);
};

export default BlogContentModifier;
