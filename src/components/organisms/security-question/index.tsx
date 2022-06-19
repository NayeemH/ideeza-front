import Button from '@atoms/button';
import Modal from '@atoms/modal';
import IconLabel from '@molecules/icon-label';
import SecurityQuestion from '@organisms/security';
import React from 'react';
import { IoClose } from 'react-icons/io5';
function SecurityQuestionPopup(props: any) {
	const { open, toggleOpen } = props;

	return (
		<div>
			<Modal
				width="sm"
				close={toggleOpen}
				header={
					<>
						<IconLabel
							mainClass="flex w-full items-center justify-between flex-row-reverse px-6 pt-3 pb-7"
							lableClass={{
								root: `texl-lg 2xl:text-2xl text-primary font-semibold tracking-tight font-sans`,
							}}
							labelValue="Security Question"
							iconContanerClass=""
							iconComponent={
								<IoClose
									className="text-red-300 text-3xl cursor-pointer"
									onClick={toggleOpen}
								/>
							}
							tooltipProps={{ open: false }}
						/>
					</>
				}
				content={
					<>
						<SecurityQuestion />
					</>
				}
				actions={
					<>
						{' '}
						<div className="flex space-x-3 p-5 mt-5">
							<Button
								onClick={toggleOpen}
								value="Cancel"
								classes={{
									root: `text-primary text-base 2xl:text-xl shadow-none border border-solid border-current bg-white font-sans capitalize py-2 leading-6 w-24`,
								}}
								color="inherit"
							/>
							<Button
								value="Save"
								classes={{
									root: `text-white bg-primary py-2 leading-6 w-24 text-base 2xl:text-xl shadow-none font-sans capitalize`,
								}}
								color="primary"
							/>
						</div>
					</>
				}
				open={open}
			/>
		</div>
	);
}

export default SecurityQuestionPopup;
