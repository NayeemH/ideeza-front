import React, { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoSettingsSharp } from 'react-icons/io5';
import { useOutsideClickHandler } from 'utils/utils';

const Settings = ({ options, iconClass }: any) => {
	const [handleSettings, setHandleSettings] = useState(false);
	const ref = useRef(null);
	useOutsideClickHandler(ref, () => setHandleSettings(!handleSettings));

	return (
		<>
			<IoSettingsSharp
				className={
					(handleSettings ? 'text-secondary' : '') +
					` ml-2 text-3xl  cursor-pointer ! relative ${iconClass}`
				}
				onClick={() => setHandleSettings((prev) => !prev)}
			/>
			{handleSettings && (
				<div
					className="md:absolute right-2 font-sans bg-white pr-5 py-2 z-20 rounded-lg text-base"
					ref={ref}
				>
					<AiOutlineClose
						className="text-ideeza-300 text-sm float-right cursor-pointer shadow"
						onClick={() => setHandleSettings(false)}
					/>
					<ul className="">
						{options.map((option: any) => (
							<li
								className="hover:text-ideeza-300 cursor-pointer"
								key={option}
							>
								{option.value}
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

export default Settings;
