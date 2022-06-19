import Button from '@atoms/button';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import React from 'react';

function DeleteAccountPopup(props: any) {
	const { open, toggleOpen } = props;

	return (
		<div>
			<Modal
				width="sm"
				close={toggleOpen}
				header={<></>}
				content={
					<>
						<Label
							value="Are sure you want to delete your account ?"
							classes={{
								root: `text-base 2xl:text-xl text-gray-300 font-semibold font-sans tracking-tight`,
							}}
						/>
						<Label
							value="It will be deleted permanently"
							classes={{
								root: `text-base 2xl:text-xl text-gray-780 font-sans pt-1 px-4`,
							}}
						/>
					</>
				}
				actions={
					<>
						<div className="flex w-full items-center justify-end space-x-3 p-1 mt-12">
							<Button
								value="Delete"
								className="text-white bg-red-200 border border-solid border-red-200 tracking-tight font-sans capitalize p-2 w-28"
							/>
							<Button
								onClick={toggleOpen}
								value="Cancel"
								className="border border-solid border-gray-600 text-gray-300 p-2 tracking-tight font-sans capitalize w-28"
							/>
						</div>
					</>
				}
				open={open}
			/>
		</div>
	);
}
export default DeleteAccountPopup;
