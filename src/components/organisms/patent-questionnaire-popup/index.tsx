import Button from '@atoms/button';
import Label from '@atoms/label';
import DoWork from '@molecules/do-work';
// import DoWork from "@molecules/do-work";
import React from 'react';
import { RiAttachment2 } from 'react-icons/ri';

const PatentQuestionnaire = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
			<div className="md:col-span-2">
				<div className="">
					<Label
						value="Here is Task Description"
						className="font-bold text-lg md:text-2xl mt-5"
					/>
					<Label
						value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui maiores nesciunt praesentium quam, obcaecati soluta eligendi! Magni natus cupiditate corporis vitae, mollitia eveniet enim eius veniam, voluptatum blanditiis exercitationem aut quis culpa atque deleniti saepe aliquam repellendus nisi distinctio quasi dicta eaque odit ratione? Molestias aliquid ipsam expedita minus illum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui maiores nesciunt praesentium quam, obcaecati soluta eligendi! Magni natus cupiditate corporis vitae, mollitia eveniet enim eius veniam, voluptatum blanditiis exercitationem aut quis culpa atque deleniti saepe aliquam repellendus nisi distinctio quasi dicta eaque odit ratione? Molestias aliquid ipsam expedita minus illum!Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui maiores nesciunt praesentium quam, obcaecati soluta eligendi! Magni natus cupiditate corporis vitae, mollitia eveniet enim eius veniam, voluptatum blanditiis exercitationem aut quis culpa atque deleniti saepe aliquam repellendus nisi distinctio quasi dicta eaque odit ratione? Molestias aliquid ipsam expedita minus illum!"
						className="text-md md:text-xl text-gray-400"
					/>
					<Button
						value="Open 3D"
						className="font-semibold md:text-lg bg-primary text-white mt-4"
					/>
				</div>
				<div className="flex justify-between pb-2 md:pb-5">
					<div className="mt-4">
						<Label
							value="Attachments"
							className="font-bold text-lg md:text-2xl"
						/>
						<Label
							value="3 Pics attached"
							className=" md:text-xl"
						/>
						<div className="flex">
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6Anq1E4_wElNp8YHogGrjUOjcyGy3kizbA&usqp=CAU"
								alt="img1"
								width="140"
								className="mr-2"
							/>
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6Anq1E4_wElNp8YHogGrjUOjcyGy3kizbA&usqp=CAU"
								alt="img2"
								width="140"
								className="mr-2"
							/>
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy6Anq1E4_wElNp8YHogGrjUOjcyGy3kizbA&usqp=CAU"
								alt="img3"
								width="140"
							/>
						</div>
						<Label
							value={
								<>
									Link attached:{' '}
									<span className="text-zinc-500">https://www.youtube.com</span>
								</>
							}
							className="mt-2"
						/>
						<Label
							value={
								<div>
									<RiAttachment2 className="text-primary inline" /> Add Attachment
								</div>
							}
							className="text-xl text-primary mt-5"
						/>
					</div>
				</div>
			</div>

			<div className="mt-12 ">
				<div className="flex justify-start items-start">
					<Label
						value="Notification center:"
						className="font-semibold text-lg md:text-2xl mr-5 mb-2"
					/>
					<Button
						value="Compose"
						className="text-white bg-primary py-1 px-3 leading-5 text-base 2xl:text-xl tracking-tight font-sans capitalize rounded"
						// onClick={toggleOpen}
						color="primary"
					/>
				</div>
				<div className="mt-4">
					<DoWork />
					<DoWork />
					<DoWork />
					<DoWork />
					<DoWork />
				</div>

				<div className="mt-5">
					<Button
						value="Make a call"
						className="bg-[#441184] text-white md:text-lg"
					/>
					<Label
						value="Category:"
						className="mt-5 text-lg"
					/>
					<Label
						value="Electronics"
						className="text-primary mt-3 text-xl font-semibold underline underline-offset-1"
					/>
				</div>
			</div>
		</div>
	);
};

export default PatentQuestionnaire;
