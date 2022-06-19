import Button from '@atoms/button';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import React from 'react';
// import { Modal, Button, Label } from "atoms";

interface AboutUsJobPopupProps {
	open: boolean;
	toggleOpen: () => void;
	jobData?: any;
}

const AboutUsJobPopup: React.FC<AboutUsJobPopupProps> = (props) => {
	const { open, toggleOpen, jobData } = props;

	return (
		<div>
			<Modal
				width="xs"
				close={toggleOpen}
				header={
					<div className="pb-0 p-6">
						<Label
							value={jobData?.title}
							className="text-primary text-lg font-semibold font-sans tracking-tight"
						/>
					</div>
				}
				content={
					<div className="">
						<Label
							value={
								<>
									{' '}
									Available Position: <span className="text-primary">
										11
									</span>{' '}
								</>
							}
							className="text-gray-700 tracking-tight font-sans underline text-md pb-2"
						/>
						<Label
							value={
								<div dangerouslySetInnerHTML={{ __html: jobData?.description }} />
							}
							className="text-gray-700 tracking-tight font-sans leading-6 text-md"
						/>
					</div>
				}
				actions={
					<>
						<div className="w-full p-4">
							<Button
								onClick={toggleOpen}
								value="Cancel"
								classes={{
									root: `text-gray-700 border border-gray-600 border-solid bg-white py-2 px-7 leading-5 text-sm tracking-tight font-sans capitalize rounded`,
								}}
							/>
						</div>
					</>
				}
				open={open}
			/>
		</div>
	);
};
export default AboutUsJobPopup;
