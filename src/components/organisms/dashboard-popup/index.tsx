import React from 'react';
import Modal from '@atoms/modal';
import Label from '@atoms/label';
import Button from '@atoms/button';
import { IDashboardPopup } from '@models/user-dashboard';
import CreateNewIdeezaProject from '@organisms/create-new-idezza-project';
function DashboardPopup(props: IDashboardPopup) {
	const { open, toggleOpen, handler, loader, toggleMySelftProject, toggleIdeezaProject, ideeza } =
		props;

	return (
		<>
			{ideeza ? (
				<CreateNewIdeezaProject
					handler={handler}
					open={ideeza}
					loader={loader}
					close={toggleIdeezaProject}
				/>
			) : null}
			<Modal
				width="xs"
				close={toggleOpen}
				header={
					<>
						<Label
							value="Please choose one the option below:"
							classes={{
								root: 'md:text-lg text-base md:p-5 pb-5 tracking-tight font-sans text-center',
							}}
						/>
					</>
				}
				content={
					<div className="md:px-5 md:pb-4">
						<div className="border rounded-md border-current grid grid-cols-2 gap-x-1 p-1">
							<Button
								value="By Myself"
								onClick={toggleMySelftProject}
								className="bg-current text-white py-2 tracking-tight transform-none md:text-sm text-xs"
							/>
							<Button
								onClick={toggleIdeezaProject}
								value="By IDEEZA Algoritham"
								className="bg-current text-white py-2 tracking-tight transform-none md:text-sm text-xs"
							/>
						</div>
					</div>
				}
				actions={<></>}
				open={open}
			/>
		</>
	);
}

export default React.memo(DashboardPopup);
