import Button from '@atoms/button';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import React from 'react';
function ProceedPopup(props: any) {
	const { toggleOpen, open } = props;
	return (
		<div>
			<Modal
				width="xs"
				close={toggleOpen}
				header={
					<div className="flex justify-end px-3 pt-3">
						<img
							src="/images/icon/cross.png"
							onClick={toggleOpen}
							className="w-3 cursor-pointer"
							alt="icon"
						/>
					</div>
				}
				content={
					<Label
						value='You have 6 more times to use "request quote." Do you want to proceed?'
						classes={{ root: `text-gray-600 text-md font-sans pr-14` }}
					/>
				}
				actions={
					<div className="flex space-x-3 p-4 mt-5">
						<Button
							value="Proceed"
							classes={{
								root: `text-white bg-primary py-1 leading-6 w-26 tracking-tight font-sans capitalize`,
							}}
						/>
						<Button
							onClick={toggleOpen}
							value="Cancel"
							classes={{
								root: `border border-solid border-gray-600 text-gray-600 p-2 tracking-tight text-sm capitalize w-26`,
							}}
						/>
					</div>
				}
				open={open}
			/>
		</div>
	);
}

export default ProceedPopup;
