import React, { useState } from 'react';
import Button from '@atoms/button';
import Label from '@atoms/label';
import SearchInput from '@molecules/search-input';
import { IoSettingsSharp } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';

function BlogTableHeader(props: any) {
	const {
		containerClass,
		mainClass,
		value,
		labelClass,
		// iconClass,
		btnValue,
		iconEnd,
		prop,
		onClick,
		// handleClick,
		handleSearch,
		visible,
	} = props;
	const [handleSettings, setHandleSettings] = useState(false);

	return (
		<div className={containerClass}>
			<Label
				value={value}
				classes={{ root: `${labelClass} ` }}
			/>
			{prop}
			<div className={`${mainClass}`}>
				<SearchInput
					className="rounded-md border"
					inputClass="md:py-3 md:text-md 2xl:text-xl py-2 md:py-3 pl-2 border"
					change={handleSearch}
				/>

				{visible && (
					<div className="md:flex justify-center items-center space-x-1">
						<Button
							value={btnValue}
							iconEnd={iconEnd}
							onClick={onClick}
							className="lg:px-4 px-2 whitespace-nowrap w-full md:w-auto md:py-2 py-2 rounded-md tracking-tight bg-primary  shadow-none text-white text-base 2xl:text-xl transform-none font-sans"
							color="primary"
							// variant="outlined"
							//   classes={{
							//     root: "",
							//   }}
						/>

						{/* <BlogContentModifier
              icon={
                <IoSettingsSharp
                  className={` text-3xl text-gray-600 cursor-pointer relative ${iconClass}`}
                />
              }
            /> */}
						{/* <Settings
              options={[
                {
                  name: "Settings 1",
                  value: "Settings 1",
                },
                {
                  name: "Settings 2",
                  value: "Settings 2",
                },
              ]}
            /> */}
						<div className="">
							<IoSettingsSharp
								className={
									(handleSettings ? 'text-ideeza-300' : '') +
									` text-3xl  cursor-pointer relative m-auto mt-[10px] md:mt-0 md:m-0 text-center`
								}
								onClick={() => setHandleSettings((prev) => !prev)}
							/>
							{handleSettings && (
								<div className="absolute right-5 font-sans bg-white px-3 py-2 rounded-lg text-base">
									<AiOutlineClose
										className="text-ideeza-300 text-sm float-right cursor-pointer shadow"
										onClick={() => setHandleSettings(false)}
									/>
									<ul className="">
										<li>settings 1</li>
										<li>settings 2</li>
									</ul>
								</div>
							)}
						</div>

						{/* <Dropdown
              icons={
                <IoSettingsSharp className={`text-3xl -mr-4 ${iconClass}`} />
              }
              itemsClasses={{
                root: "font-sans text-sm px-4 w-32 py-3 hover:text-current text-gray-900",
              }}
              // onClick={toggleOpen}
              options={[
                {
                  name: "View",
                  value: "View",
                },
              ]}
            /> */}
					</div>
				)}
			</div>
		</div>
	);
}
BlogTableHeader.defaultProps = {
	containerClass: 'md:flex items-center justify-between md:pl-4 p-3 md:pt-0',
	mainClass:
		'md:flex justify-end items-center md:space-x-4 space-y-2 md:space-y-0 pr-0 md:pr-2 md:p-4',
	value: 'Manage Users, Technicians & Service Providers',
	labelClass:
		'text-gray-300 text-base 2xl:text-xl font-sans tracking-tight font-semibold pb-1 md:pb-0',
	visible: true,
};
export default BlogTableHeader;
